const fs = require('fs');
const readline = require('readline');
//@TODO: Add documentation
//@TODO: Add error handling
//@TODO: Add tests
//@TODO: transform to serveless function
function formatTitle(title) {
	// Convert dashes and underscores to spaces
	const spaceSeparated = title.replace(/[-_]/g, ' ');

	// Convert to title case
	const titleCase = spaceSeparated.replace(/\w\S*/g, (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	return titleCase;
}

async function fetchCommits(url, headers) {
	const response = await fetch(url, { headers });
	const commits = await response.json();

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
	const links = linkHeader.split(', ');
	const nextLink = links.find((link) => link.includes('rel="next"'));

	if (nextLink) {
		return nextLink.split('; ')[0].slice(1, -1);
	}

	return null;
}

async function data(githubToken) {
	const headers = {
		Authorization: `Bearer ${githubToken}`,
	};

	try {
		const response = await fetch('https://api.github.com/users/tverderesi/repos?direction=desc&per_page=100&offset=0', {
			headers,
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data from GitHub API');
		}

		const projects = await response.json();

		await Promise.all(
			projects.map(async (project) => {
				const commitsUrl = `https://api.github.com/repos/tverderesi/${project.name}/commits?per_page=100`;
				const commits = await fetchCommits(commitsUrl, headers);
				project.commits = commits.length;
				project.name = formatTitle(project.name);
				return project;
			})
		);

		sortProjects(projects);
		return projects;
	} catch (error) {
		console.error('An error occurred while fetching data:', error);
	}
}

let sortOption = 'commits'; // Default sorting option

function sortProjects(projects) {
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

// Function to handle user-selected sort option
async function handleSortOption(projects) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Enter the sort option (name/stars/commits): ', (option) => {
		sortOption = option.trim().toLowerCase();
		rl.close();

		saveFallbackData(projects);
	});
}

async function saveFallbackData(projects) {
	fs.writeFileSync('./fallbackProjects.json', JSON.stringify(projects, null, 2));
}

async function handleGithubToken() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Enter your GitHub token: ', async (githubToken) => {
		rl.close();

		const projects = await data(githubToken.trim());
		handleSortOption(projects);
	});
}

handleGithubToken();
