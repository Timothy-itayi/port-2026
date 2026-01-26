import type { Project } from './projects.js';

export const clones: Project[] = [
	{
		slug: 'bellroy',
		title: 'Bellroy',
		author: 'Timothy Itayi',
		image: '/projects/Bellroy_logo.svg',
		description: 'Product Card Component (Elm + Astro) - This is a small, self-contained product card component built using Elm and integrated into an Astro project.',
		client: 'Internal Project',
		year: '2025',
		techStack: ['Elm', 'Astro', 'TypeScript'],
		content: `
			<p>This was a way to learn a new language and stack never used before—a front-end challenge to push beyond familiar tools.</p>
			<h3>The Challenge</h3>
			<p>Building a product card component using Elm, a functional programming language I'd never touched, and integrating it into an Astro project. This forced me to think differently about state management, immutability, and component architecture.</p>
			<h3>Learning Curve</h3>
			<p>Elm's strong type system and functional paradigm required a complete mental shift from JavaScript/TypeScript. The compiler's strictness caught errors at compile time, which was both frustrating and enlightening. Integrating Elm components into Astro's build process added another layer of complexity.</p>
			<h3>Outcome</h3>
			<p>A small, self-contained component that demonstrates cross-language integration and functional programming principles applied to UI development.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/bellroy'
	},
	{
		slug: 'genius-sports',
		title: 'Genius Sports',
		author: 'Timothy Itayi',
		image: '/projects/genuis-sports.png',
		description: 'Sports Genius front-end clone built with Next.js. Showcases key interactive elements like animated buttons and a custom infinite scroll component. Built as a demonstration of front-end development skills for a potential job application.',
		client: 'Genius Sports Group',
		year: '2021',
		techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
		content: `
			<p>I was genuinely interested in the hover effect and infinite scroll on the Genius Sports site and wanted to see if I could solve them myself. This project is a front-end clone created with Next.js, built as a demonstration of front-end development skills for a potential job application.</p>
			<h3>The Motivation</h3>
			<p>Genius Sports' homepage has distinctive micro-interactions—buttons that animate with color-changing transitions and directional line effects, plus a seamless infinite-scroll logo strip. Rather than copying blindly, I wanted to reverse-engineer the behavior and implement it from scratch.</p>
			<h3>Key Features</h3>
			<p><strong>Animated Buttons:</strong> Interactive buttons with engaging, color-changing transitions on hover. Each button animates with distinct three-line directional transitions for an enhanced user experience.</p>
			<p><strong>Custom Infinite Scroll Component:</strong> A custom-built infinite scroll that animates images in a continuous loop, keeping content flowing seamlessly. Crafted with Tailwind CSS for smooth, visually appealing animations.</p>
			<h3>The Build</h3>
			<p>Next.js for the framework, Tailwind for styling and animations. The infinite scroll required thinking about CSS keyframes, overflow, and clone placement to avoid visible seams. The button effects pushed me to get comfortable with Tailwind's transition and pseudo-class utilities.</p>
		`,
		liveSiteUrl: 'https://genius-sports.vercel.app/'
	},
	{
		slug: 'kogan',
		title: 'Kogan',
		author: 'Timothy Itayi',
		image: '/projects/Kogan_logo.png',
		description: 'A concept clone of the Kogan product details page, focusing on replicating their unique visual style, layout hierarchy, and e-commerce UI patterns. This static webpage is built to look exactly like Kogan in style and aesthetic using Next.js and Tailwind.',
		client: 'Kogan.com',
		year: '2022',
		techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
		content: `
			<p>I was fascinated by how Kogan structured their product detail pages—the image galleries, pricing tiers, membership benefits, and the overall information architecture. This is a static webpage built to look exactly like Kogan in style and aesthetic.</p>
			<h3>The Motivation</h3>
			<p>Kogan's product pages have a distinct visual language—their typography, spacing, color choices, and layout hierarchy create a polished e-commerce experience. I wanted to see if I could replicate that aesthetic precisely, focusing purely on the visual presentation rather than functional complexity.</p>
			<h3>The Build</h3>
			<p>Using Next.js for the framework and Tailwind for styling, I focused on visual replication: matching the image gallery layout, typography scales, button styles, spacing systems, and color palette. The goal was pixel-accurate visual matching—capturing Kogan's style and aesthetic exactly.</p>
			<h3>Key Features</h3>
			<p>Product image gallery with thumbnail navigation, static pricing display (member vs non-member), shipping information layout, membership benefits styling, and rewards credit presentation. As a static page, the focus was entirely on visual fidelity—matching fonts, colors, spacing, and component styling to create an identical visual experience.</p>
		`,
		liveSiteUrl: 'https://kogan-test.vercel.app/'
	},
	{
		slug: 't2-tea',
		title: 'T2',
		author: 'Timothy Itayi',
		image: '/projects/t2-logo.png',
		description: 'A concept clone of the T2 Tea website, focusing on replicating their unique product cards, catalog layout, and detailed product views. This project aims to showcase responsive design principles and modern e-commerce UI patterns.',
		client: 'T2 Tea',
		year: '2020',
		techStack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
		content: `
			<p>A front-end clone of the T2 Tea website, built to closely resemble the responsiveness and design of the original. The focus is on product cards, catalog layout, and detailed product views.</p>
			<h3>Home Page</h3>
			<p><strong>NavBar:</strong> A navigation bar that allows users to browse through different images of the product in the product detail page.</p>
			<p><strong>Cards:</strong> A card designed to mimic T2 tea's card design and scope.</p>
			<p><strong>Carousel:</strong> A carousel component highlighting the product.</p>
			<h3>Products Page</h3>
			<p><strong>Product Card:</strong> A card which includes an image, product name, and price.</p>
			<h3>Product Detail Page</h3>
			<p><strong>Title:</strong> The name of the product.</p>
			<p><strong>Description:</strong> A detailed description of the product.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/T2-Clone',
		youtubeUrl: 'https://www.youtube.com/watch?v=RwTk8pEVnSI'
	}
];
