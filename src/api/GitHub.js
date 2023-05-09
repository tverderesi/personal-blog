// import { fs } from 'fs';
const headers = {
	Authorization: `Bearer ${import.meta.env.GH_API_KEY}`,
};

export async function data() {
	// Fetch your recent GitHub projects sorted by last recent commit
	const totalCommits = [];
	const response = await fetch(
		'https://api.github.com/users/tverderesi/repos?sort=pushed&direction=desc&per_page=10&offset=0',
		{ headers }
	);
	const projects = await response.json();
	await Promise.all(
		projects.map(async (project) => {
			let allCommits = 0;
			let page = 1;
			let totalPages = 1;
			while (page <= totalPages) {
				const commitsResponse = await fetch(
					`https://api.github.com/repos/tverderesi/${project.name}/commits?page=${page}&per_page=100`,
					{
						headers,
					}
				);

				const commits = await commitsResponse.json();
				const totalCount = commits.length;
				totalPages = parseInt(response.headers.get('link').match(/&page=(\d+)>; rel="last"/)[1], 10);
				allCommits += totalCount;

				page++;
			}

			totalCommits.push(allCommits);
		})
	);

	return { projects, totalCommits };
}

// export default async (req, res) => {
// 	const { projects, totalCommits } = await data();

// 	// Store the data in a file or a database
// 	// Example: Store it in a JSON file
// 	const dataToStore = { projects, totalCommits };
// 	fs.writeFileSync('./data.json', JSON.stringify(dataToStore));

// 	res.status(200).json({ message: 'Data fetched and stored.' });
// };
