<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import type { PageData } from './$types.js';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	export let data: PageData;
	const { project } = data;

	let resizeHandler: (() => void) | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto(`/mobile/projects/${project.slug}`, { replaceState: true });
		}
	};

	onMount(() => {
		// Check viewport on mount and redirect if needed
		checkViewportAndRedirect();

		// Debounced resize handler
		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		
		window.addEventListener('resize', resizeHandler);

		const tl = gsap.timeline();
		tl.from('.top-nav, .project-header, .sidebar-item, .content-body', {
			opacity: 0,
			y: 20,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power2.out'
		});
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

<svelte:head>
	<title>{project.title} | Timothy Itayi</title>
</svelte:head>

<div class="archive-wrapper">
	<div class="archive-container">
		<!-- Top Bar -->
		<nav class="top-nav">
			<div class="nav-links">
				<a href="/projects" class="back-link">← BACK TO ARCHIVE</a>
				<span class="breadcrumb-separator">/</span>
				<span class="current-page">{project.title.toUpperCase()}</span>
			</div>
			<div class="status-tag">ACTIVE_PROJECT</div>
		</nav>

		<!-- Main Layout -->
		<main class="project-detail-layout">
			<!-- Header Section -->
			<header class="project-header">
				<div class="title-block">
					<h1 class="project-title">{project.title}</h1>
					<p class="project-subtitle">BY {project.author.toUpperCase()}</p>
				</div>
			</header>

			<div class="grid-container">
				<!-- Sidebar: E-commerce style metadata -->
				<aside class="metadata-sidebar">
					<div class="sidebar-item">
						<span class="label">CLIENT</span>
						<span class="value">{project.client || 'N/A'}</span>
					</div>
					<div class="sidebar-item">
						<span class="label">YEAR</span>
						<span class="value">{project.year}</span>
					</div>
					<div class="sidebar-item">
						<span class="label">TECH STACK</span>
						<div class="tag-list">
							{#each project.techStack as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
					<div class="sidebar-item buy-action">
						<!-- E-commerce flavor: An action button -->
						<button class="action-button">VIEW LIVE SITE</button>
						<p class="availability">AVAILABLE FOR AUDIT</p>
					</div>
				</aside>

				<!-- Content Area: Blog style -->
				<section class="content-area">
					<div class="featured-image">
						<img src={project.image} alt={project.title} />
					</div>
					
					<div class="content-body">
						<div class="lead-text">
							{project.description}
						</div>
						<div class="rich-text">
							{@html project.content}
						</div>
					</div>
				</section>
			</div>
		</main>

		<!-- Footer -->
		<footer class="archive-footer">
			<div class="footer-content">
				<div class="footer-left">
					© 2026 TIMOTHY ITAYI / SYSTEM ENGINEER
				</div>
				<div class="footer-right">
					PROJECT ID: {project.slug.toUpperCase()}-001
				</div>
			</div>
		</footer>
	</div>
</div>

<style>
	:global(body) {
		background: #f0f0f0;
		margin: 0;
		padding: 0;
	}

	.archive-wrapper {
		min-height: 100vh;
		background: #fff;
		color: #000;
		font-family: 'Courier New', Courier, monospace;
		padding: 0 1rem 4rem 1rem;
		display: flex;
		flex-direction: column;
	}

	.archive-container {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	/* Top Nav */
	.top-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		border-bottom: 2px solid #000;
		font-size: 0.85rem;
		font-weight: bold;
	}

	.nav-links {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.back-link {
		color: #000;
		text-decoration: none;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.breadcrumb-separator {
		opacity: 0.5;
	}

	.status-tag {
		background: #000;
		color: #fff;
		padding: 2px 8px;
		font-size: 0.7rem;
		font-weight: 900;
	}

	/* Layout */
	.project-detail-layout {
		margin-top: 2rem;
	}

	.project-header {
		padding-bottom: 2rem;
		border-bottom: 1px solid #000;
		margin-bottom: 2rem;
	}

	.project-title {
		font-size: 5rem;
		line-height: 0.8;
		margin: 0;
		font-weight: 950;
		letter-spacing: -4px;
	}

	.project-subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 1rem;
		font-weight: 900;
		opacity: 0.7;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 4rem;
	}

	/* Sidebar */
	.metadata-sidebar {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.sidebar-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 1rem;
	}

	.label {
		font-size: 0.75rem;
		font-weight: 900;
		color: #666;
	}

	.value {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		border: 1px solid #000;
		padding: 2px 6px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.action-button {
		background: #000;
		color: #fff;
		border: none;
		padding: 1rem;
		font-family: inherit;
		font-weight: 900;
		cursor: pointer;
		width: 100%;
		transition: transform 0.1s;
	}

	.action-button:hover {
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 #000;
	}

	.availability {
		font-size: 0.65rem;
		margin-top: 0.5rem;
		font-weight: bold;
		text-align: center;
	}

	/* Content Area */
	.content-area {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.featured-image {
		width: 100%;
		border: 1px solid #000;
		background: #f9f9f9;
		aspect-ratio: 16/9;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.featured-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 40px;
	}

	.content-body {
		max-width: 800px;
	}

	.lead-text {
		font-size: 1.5rem;
		line-height: 1.3;
		font-weight: bold;
		margin-bottom: 2rem;
		border-left: 4px solid #000;
		padding-left: 1.5rem;
	}

	.rich-text {
		font-size: 1.1rem;
		line-height: 1.6;
		font-weight: 500;
	}

	.rich-text :global(h3) {
		margin-top: 2rem;
		font-size: 1.4rem;
		font-weight: 900;
		text-decoration: underline;
	}

	/* Footer */
	.archive-footer {
		margin-top: 4rem;
		border-top: 1px solid #000;
		padding: 1.5rem 0;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		font-weight: 900;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.grid-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.metadata-sidebar {
			order: 2;
		}

		.content-area {
			order: 1;
		}

		.project-title {
			font-size: 3rem;
		}
	}
</style>
