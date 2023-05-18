const fs = require('fs');
const readline = require('readline');
require('dotenv').config();
const path = require('path');

//@TODO: Add documentation
//@TODO: Add error handling
//@TODO: Add tests
//@TODO: transform to serveless function

function formatProjectTitle(title) {
	// Convert dashes and underscores to spaces
	const spaceSeparated = title.replace(/[-_]/g, ' ');

	// Convert to title case
	const titleCase = spaceSeparated.replace(/\w\S*/g, (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	return titleCase;
}

async function fetchCommits(url, headers) {
	//get the commits
	const response = await fetch(url, { headers });
	const commits = await response.json();

	//get the next page of commits
	if (response.headers.get('Link')) {
		const nextPageUrl = getNextPageUrl(response.headers.get('Link'));
		if (nextPageUrl) {
			const nextPageCommits = await fetchCommits(nextPageUrl, headers);
			return [...commits, ...nextPageCommits];
		}
	}

	return commits;
}

function getNextPageUrl(linkHeader) {
	// get links
	const links = linkHeader.split(', ');
	const nextLink = links.find((link) => link.includes('rel="next"'));

	// get url
	if (nextLink) {
		return nextLink.split('; ')[0].slice(1, -1);
	}

	return null;
}

async function fetchProjects(githubToken) {
	//Add the token to the headers
	const headers = {
		Authorization: `Bearer ${githubToken}`,
	};

	//get the projects
	try {
		const response = await fetch('https://api.github.com/users/tverderesi/repos?direction=desc&per_page=100&offset=0', {
			headers,
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data from GitHub API');
		}

		const projects = await response.json();

		//get the commits
		await Promise.all(
			projects.map(async (project) => {
				const commitsUrl = `https://api.github.com/repos/tverderesi/${project.name}/commits?per_page=100`;
				const commits = await fetchCommits(commitsUrl, headers);
				project.commits = commits.length;
				project.name = formatProjectTitle(project.name);
				return project;
			})
		);

		return projects;
	} catch (error) {
		console.error('An error occurred while fetching data:', error);
	}
}

function sortProjects(projects, sortOption = 'commits') {
	// Sort projects
	projects.sort((a, b) => {
		if (sortOption === 'name') {
			return a.name.localeCompare(b.name);
		} else if (sortOption === 'stars') {
			return b.stars - a.stars;
		} else if (sortOption === 'commits') {
			return b.commits - a.commits;
		}

		// Default: No sorting
		return 0;
	});
}

async function saveFallbackData(projects) {
	// Save projects to file
	const filePath = path.join(__dirname, '../assets/projects/fallbackProjects.json');
	fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
}

async function getProjects(githubToken = '', sortOption = '') {
	// If no GitHub token is provided, ask the user for one
	if (!githubToken) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question('Enter your GitHub token: ', async (githubToken) => {
			rl.close();
			return githubToken;
		});
	}

	// If no sort option is provided, ask the user for one
	if (!sortOption) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question('Enter the sort option (name/stars/commits): ', (option) => {
			sortOption = option.trim().toLowerCase();
			rl.close();
			return sortOption;
		});
	}
	const projects = await fetchProjects(githubToken.trim());

	sortProjects(projects, sortOption);
	saveFallbackData(projects);
}

getProjects(process.env.GH_API_KEY, 'commits');
