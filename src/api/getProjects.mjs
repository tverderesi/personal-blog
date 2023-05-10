import fs from 'fs';

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

async function getData(githubToken) {
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

let sortOption = 'commits'; // Default sorting option

// Expose the function as an API endpoint
export default async function (res) {
	const githubToken = import.meta.env.GH_API_KEY;

	if (!githubToken) {
		return res.status(400).json({ error: 'GitHub token is required' });
	}

	const projects = await getData(githubToken.trim());
	fs.writeFileSync('src/utils/fallbackProjects.json', JSON.stringify(projects, null, 2));
	return projects;
}
