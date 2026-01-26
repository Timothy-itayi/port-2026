<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { projects } from '$lib/data/projects.js';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	let resizeHandler: (() => void) | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile/projects', { replaceState: true });
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

		// Simple entrance animation
		const tl = gsap.timeline();
		tl.from('.top-nav, .main-header, .section-divider', {
			opacity: 0,
			y: -10,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power2.out'
		});
		tl.from('.project-card', {
			opacity: 0,
			y: 20,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power2.out'
		}, '-=0.3');
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

<svelte:head>
	<title>Projects | Timothy Itayi</title>
</svelte:head>

<div class="archive-wrapper">
	<div class="archive-container">
		<!-- Top Bar -->
		<nav class="top-nav">
			<div class="nav-links">
				<a href="/">Control Panel</a>
				<a href="/clones">Clones</a>
			</div>
			<div class="beta-tag">BETA</div>
		</nav>

		<!-- Main Header -->
		<header class="main-header">
			<div class="brand">
				<h1 class="archival-title">
					PROJECTS
				</h1>
				
			</div>
			
		</header>

		<!-- Section Title -->
		<div class="section-divider">
			<h2>LATEST WORKS ADDED</h2>
		</div>

		<!-- Project Grid -->
		<main class="project-grid">
			{#each projects as project}
				<a href="/projects/{project.slug}" class="project-card-link">
					<div class="project-card">
						<div class="card-header">
							<div class="header-row">
								<div class="label">Title</div>
								<div class="value">{project.title}</div>
							</div>
							<div class="header-row author">
								<div class="label">Author</div>
								<div class="value">{project.author}</div>
							</div>
						</div>
						<div class="card-image">
							<div class="image-inner">
								<img src={project.image} alt={project.title} />
							</div>
						</div>
						<div class="card-footer-desc">
							<div class="desc-label">Notes:</div>
							<div class="desc-text">{project.description}</div>
						</div>
					</div>
				</a>
			{/each}
		</main>

		<!-- Footer -->
		<footer class="archive-footer">
			<div class="footer-content">
				<div class="footer-left">
					© 2026 TIMOTHY ITAYI / SYSTEM ENGINEER
				</div>
				<div class="footer-right">
					LAST UPDATED: JAN 24 2026 [EST]
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
		padding: 0.5rem 0;
		border-bottom: 1px solid #000;
		font-size: 0.85rem;
		font-weight: bold;
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	.nav-links a {
		color: #000;
		text-decoration: none;
		border-bottom: 2px solid transparent;
	}

	.nav-links a:hover, .nav-links a.active {
		border-bottom: 2px solid #000;
	}

	.nav-dropdown {
		cursor: pointer;
	}

	.arrow {
		font-size: 0.6rem;
		margin-left: 2px;
	}

	.beta-tag {
		color: #ff0000;
		font-weight: 900;
		font-size: 0.9rem;
	}

	/* Main Header */
	.main-header {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		padding: 2.5rem 0;
		align-items: start;
	}

	.archival-title {
		font-size: 4rem;
		line-height: 0.85;
		margin: 0;
		font-weight: 900;
		letter-spacing: -3px;
	}

	.subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 1.2rem;
		font-weight: bold;
		opacity: 0.8;
	}

	.description {
		font-size: 1.1rem;
		line-height: 1.2;
		font-weight: bold;
		padding-top: 0.5rem;
		text-align: right;
	}

	/* Section Divider */
	.section-divider {
		border-top: 1px solid #000;
		padding: 0.5rem 0;
		margin-bottom: 1.5rem;
	}

	.section-divider h2 {
		font-size: 0.8rem;
		margin: 0;
		letter-spacing: 0.1em;
		font-weight: 900;
	}

	/* Project Grid */
	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2.5rem;
		margin-bottom: 4rem;
	}

	.project-card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.project-card {
		border: 1px solid #000;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 6px 6px 0 #000;
		transition: transform 0.2s;
	}

	.project-card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 8px 8px 0 #000;
	}

	.card-header {
		display: flex;
		flex-direction: column;
	}

	.header-row {
		display: grid;
		grid-template-columns: 80px 1fr;
		border-bottom: 1px solid #000;
	}

	.label {
		padding: 0.8rem;
		font-weight: 900;
		border-right: 1px solid #000;
		font-size: 0.85rem;
	}

	.value {
		padding: 0.8rem;
		font-size: 0.85rem;
		font-weight: bold;
	}

	.card-image {
		padding: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-bottom: 1px solid #000;
	}

	.image-inner {
		width: 100%;
		aspect-ratio: 16/9;
		border: 1px solid #000;
		overflow: hidden;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-inner img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 10px;
	}

	.card-footer-desc {
		padding: 1rem;
		background: #f9f9f9;
		flex-grow: 1;
	}

	.desc-label {
		font-size: 0.7rem;
		font-weight: 900;
		margin-bottom: 0.3rem;
		text-decoration: underline;
	}

	.desc-text {
		font-size: 0.85rem;
		line-height: 1.4;
		font-weight: bold;
	}

	/* Footer */
	.archive-footer {
		margin-top: auto;
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
		.main-header {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.description {
			text-align: left;
		}
		.project-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.archival-title {
			font-size: 2.5rem;
		}
		.footer-content {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
