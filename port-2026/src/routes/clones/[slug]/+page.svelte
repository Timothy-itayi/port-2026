<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import type { PageData } from './$types.js';

	export let data: PageData;
	const { clone } = data;

	onMount(() => {
		const tl = gsap.timeline();
		tl.from('.top-nav, .project-header, .sidebar-item, .content-body', {
			opacity: 0,
			y: 20,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power2.out'
		});
	});
</script>

<svelte:head>
	<title>{clone.title} | Timothy Itayi</title>
</svelte:head>

<div class="archive-wrapper">
	<div class="archive-container">
		<!-- Top Bar -->
		<nav class="top-nav">
			<div class="nav-links">
				<a href="/clones" class="back-link">← BACK TO ARCHIVE</a>
				<span class="breadcrumb-separator">/</span>
				<span class="current-page">{clone.title.toUpperCase()}</span>
			</div>
			<div class="status-tag">CLONE_PROJECT</div>
		</nav>

		<!-- Main Layout -->
		<main class="project-detail-layout">
			<!-- Header Section -->
			<header class="project-header">
				<div class="title-block">
					<h1 class="project-title">{clone.title}</h1>
					<p class="project-subtitle">BY {clone.author.toUpperCase()}</p>
				</div>
			</header>

			<div class="grid-container">
				<!-- Sidebar: E-commerce style metadata -->
				<aside class="metadata-sidebar">
					<div class="sidebar-item">
						<span class="label">CLIENT</span>
						<span class="value">{clone.client || 'N/A'}</span>
					</div>
					<div class="sidebar-item">
						<span class="label">YEAR</span>
						<span class="value">{clone.year}</span>
					</div>
					<div class="sidebar-item">
						<span class="label">TECH STACK</span>
						<div class="tag-list">
							{#each clone.techStack as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
					<div class="sidebar-item buy-action">
						<!-- E-commerce flavor: action buttons -->
						{#if clone.githubUrl || clone.youtubeUrl || clone.liveSiteUrl}
							<div class="action-buttons">
								{#if clone.liveSiteUrl}
									<a href={clone.liveSiteUrl} target="_blank" rel="noopener noreferrer" class="action-button">
										VIEW LIVE SITE
									</a>
								{/if}
								{#if clone.githubUrl}
									<a href={clone.githubUrl} target="_blank" rel="noopener noreferrer" class="action-button action-button-secondary">
										VIEW ON GITHUB
									</a>
								{/if}
								{#if clone.youtubeUrl}
									<a href={clone.youtubeUrl} target="_blank" rel="noopener noreferrer" class="action-button action-button-secondary">
										WATCH DEMO
									</a>
								{/if}
							</div>
							<p class="availability">
								{#if clone.liveSiteUrl && clone.githubUrl && clone.youtubeUrl}
									LIVE SITE, SOURCE CODE &amp; DEMO AVAILABLE
								{:else if clone.liveSiteUrl && clone.githubUrl}
									LIVE SITE &amp; SOURCE CODE AVAILABLE
								{:else if clone.liveSiteUrl && clone.youtubeUrl}
									LIVE SITE &amp; DEMO AVAILABLE
								{:else if clone.githubUrl && clone.youtubeUrl}
									SOURCE CODE &amp; DEMO AVAILABLE
								{:else if clone.liveSiteUrl}
									LIVE SITE AVAILABLE
								{:else if clone.githubUrl}
									SOURCE CODE AVAILABLE
								{:else}
									DEMO AVAILABLE
								{/if}
							</p>
						{:else}
							<button class="action-button">VIEW LIVE SITE</button>
							<p class="availability">AVAILABLE FOR AUDIT</p>
						{/if}
					</div>
				</aside>

				<!-- Content Area: Blog style -->
				<section class="content-area">
					<div class="featured-image">
						<img src={clone.image} alt={clone.title} />
					</div>
					
					<div class="content-body">
						<div class="lead-text">
							{clone.description}
						</div>
						<div class="rich-text">
							{@html clone.content}
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
					CLONE ID: {clone.slug.toUpperCase()}-001
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

	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
		text-decoration: none;
		display: block;
		text-align: center;
	}

	.action-button-secondary {
		background: #fff;
		color: #000;
		border: 2px solid #000;
	}

	.action-button-secondary:hover {
		background: #000;
		color: #fff;
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
