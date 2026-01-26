export interface Project {
	slug: string;
	title: string;
	author: string;
	image: string;
	description: string;
	client?: string;
	year: string;
	techStack: string[];
	content: string; // Markdown or HTML content for the blog style
	githubUrl?: string; // Optional GitHub repository URL
	youtubeUrl?: string; // Optional YouTube demo URL
	liveSiteUrl?: string; // Optional live site URL
}

export const projects: Project[] = [
	{
		slug: 'amber',
		title: 'Amber',
		author: 'Timothy Itayi',
		image: '/projects/amber-app-icon.png',
		description: 'A specialized application for managing high-frequency data streams and real-time analytics.',
		client: 'Amber Ltd',
		year: '2024',
		techStack: ['SvelteKit', 'TypeScript', 'GSAP', 'D3.js'],
		content: `
			<p>Amber is a sophisticated real-time analytics platform designed for the modern data stack. It leverages high-frequency data streams to provide instant insights into system performance and user behavior.</p>
			<h3>The Challenge</h3>
			<p>Managing millions of data points per second without compromising on latency or user experience. Traditional dashboards often lag under this load.</p>
			<h3>The Solution</h3>
			<p>We implemented a custom D3.js visualization engine optimized for WebGL rendering, coupled with a SvelteKit frontend for reactive state management.</p>
		`
	},
	{
		slug: 'restock',
		title: 'Restock',
		author: 'Timothy Itayi',
		image: '/projects/restock-icon-app.png',
		description: 'Inventory management system optimized for low-latency updates and automated replenishment.',
		client: 'Global Logistics',
		year: '2023',
		techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
		content: `
			<p>Restock simplifies complex inventory management for large-scale warehouses. It uses predictive algorithms to automate replenishment and minimize stockouts.</p>
			<h3>Efficiency at Scale</h3>
			<p>By integrating directly with ERP systems, Restock provides a real-time view of inventory across multiple locations.</p>
		`
	}
];
