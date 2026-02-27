<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import type { PageData } from './$types.js';
	import { categoryLabels } from '$lib/data/projects.js';
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
		checkViewportAndRedirect();

		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		window.addEventListener('resize', resizeHandler);

		const tl = gsap.timeline();
		tl.from('.corp-nav, .breadcrumb', {
			opacity: 0,
			y: -8,
			duration: 0.4,
			stagger: 0.06,
			ease: 'power2.out'
		});
		tl.from(
			'.detail-hero, .detail-grid',
			{
				opacity: 0,
				y: 14,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power2.out'
			},
			'-=0.2'
		);
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

<div class="corp-wrapper">
	<nav class="corp-nav">
		<div class="nav-left">
			<a href="/" class="nav-logo">Timothy Itayi</a>
		</div>
		<div class="nav-right">
			<a href="/" class="nav-item">Home</a>
			<a href="/projects" class="nav-item">Projects</a>
			<a href="/contact" class="nav-item nav-item-cta">Contact</a>
		</div>
	</nav>

	<div class="breadcrumb">
		<a href="/projects" class="bc-link">Projects</a>
		<span class="bc-sep">/</span>
		<span class="bc-current">{project.title}</span>
	</div>

	<header class="detail-hero">
		<div class="hero-left">
			<div class="hero-icon">
				<img src={project.image} alt={project.title} />
			</div>
			<div class="hero-text">
				<h1 class="hero-title">{project.title}</h1>
				<p class="hero-desc">{project.description}</p>
			</div>
		</div>
	</header>

	<div class="detail-grid">
		<aside class="detail-sidebar">
			<div class="sidebar-group">
				<h3 class="group-label">Details</h3>
				<div class="detail-row">
					<span class="detail-key">Author</span>
					<span class="detail-val">{project.author}</span>
				</div>
				{#if project.client}
					<div class="detail-row">
						<span class="detail-key">Client</span>
						<span class="detail-val">{project.client}</span>
					</div>
				{/if}
				<div class="detail-row">
					<span class="detail-key">Year</span>
					<span class="detail-val">{project.year}</span>
				</div>
				<div class="detail-row">
					<span class="detail-key">Category</span>
					<span class="detail-val">{categoryLabels[project.category]}</span>
				</div>
			</div>

			<div class="sidebar-group">
				<h3 class="group-label">Tech stack</h3>
				<div class="tag-list">
					{#each project.techStack as tech}
						<span class="tech-tag">{tech}</span>
					{/each}
				</div>
			</div>

			{#if project.liveSiteUrl || project.githubUrl || project.youtubeUrl}
				<div class="sidebar-group">
					<h3 class="group-label">Links</h3>
					<div class="link-list">
						{#if project.liveSiteUrl}
							<a href={project.liveSiteUrl} target="_blank" rel="noopener" class="sidebar-link"
								>Live site ↗</a
							>
						{/if}
						{#if project.githubUrl}
							<a href={project.githubUrl} target="_blank" rel="noopener" class="sidebar-link"
								>GitHub ↗</a
							>
						{/if}
						{#if project.youtubeUrl}
							<a href={project.youtubeUrl} target="_blank" rel="noopener" class="sidebar-link"
								>YouTube ↗</a
							>
						{/if}
					</div>
				</div>
			{/if}
		</aside>

		<section class="detail-content">
			<div class="content-body">
				{@html project.content}
			</div>
		</section>
	</div>

	<footer class="corp-footer">
		<span class="footer-copy">© 2026 Timothy Itayi</span>
		<span class="footer-id">ID: {project.slug.toUpperCase()}</span>
	</footer>
</div>

<style>
	:global(body) {
		background: #fff;
		margin: 0;
		padding: 0;
	}

	.corp-wrapper {
		min-height: 100vh;
		background: #fff;
		color: #0a2540;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
			sans-serif;
	}

	/* ===== NAV ===== */
	.corp-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 48px;
		border-bottom: 1px solid #e6e9ed;
	}

	.nav-logo {
		font-size: 0.95rem;
		font-weight: 600;
		color: #0a2540;
		text-decoration: none;
		letter-spacing: -0.01em;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.nav-item {
		font-size: 0.88rem;
		color: #546678;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.15s;
	}

	.nav-item:hover {
		color: #0a2540;
	}

	.nav-item-cta {
		background: #0a2540;
		color: #fff;
		padding: 8px 18px;
		border-radius: 6px;
		font-weight: 600;
		font-size: 0.84rem;
	}

	.nav-item-cta:hover {
		background: #1a3a5c;
		color: #fff;
	}

	/* ===== BREADCRUMB ===== */
	.breadcrumb {
		max-width: 1120px;
		margin: 0 auto;
		padding: 20px 48px 0;
		font-size: 0.82rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.bc-link {
		color: #546678;
		text-decoration: none;
		font-weight: 500;
	}

	.bc-link:hover {
		color: #0a2540;
	}

	.bc-sep {
		color: #c0c8d0;
	}

	.bc-current {
		color: #0a2540;
		font-weight: 600;
	}

	/* ===== HERO ===== */
	.detail-hero {
		max-width: 1120px;
		margin: 0 auto;
		padding: 32px 48px 40px;
		border-bottom: 1px solid #e6e9ed;
	}

	.hero-left {
		display: flex;
		align-items: flex-start;
		gap: 24px;
	}

	.hero-icon {
		width: 64px;
		height: 64px;
		border-radius: 12px;
		background: #f4f6f8;
		border: 1px solid #e6e9ed;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.hero-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 8px;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hero-title {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0;
		color: #0a2540;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.hero-desc {
		font-size: 0.95rem;
		color: #546678;
		margin: 0;
		line-height: 1.55;
		font-weight: 400;
		max-width: 600px;
	}

	/* ===== GRID ===== */
	.detail-grid {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 56px;
		max-width: 1120px;
		margin: 0 auto;
		padding: 40px 48px 0;
	}

	/* ===== SIDEBAR ===== */
	.detail-sidebar {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.sidebar-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.group-label {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #8898a8;
		margin: 0;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 6px 0;
		border-bottom: 1px solid #f0f2f5;
	}

	.detail-key {
		font-size: 0.84rem;
		color: #546678;
		font-weight: 400;
	}

	.detail-val {
		font-size: 0.84rem;
		color: #0a2540;
		font-weight: 500;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tech-tag {
		font-size: 0.72rem;
		font-weight: 500;
		padding: 3px 10px;
		border-radius: 4px;
		background: #f0f2f5;
		color: #546678;
	}

	.link-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sidebar-link {
		font-size: 0.84rem;
		color: #3366cc;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.15s;
	}

	.sidebar-link:hover {
		color: #0a2540;
	}

	/* ===== CONTENT ===== */
	.detail-content {
		min-width: 0;
	}

	.content-body {
		font-size: 0.98rem;
		line-height: 1.72;
		color: #334155;
	}

	.content-body :global(p) {
		margin: 0 0 20px;
	}

	.content-body :global(h3) {
		font-size: 1.1rem;
		font-weight: 600;
		color: #0a2540;
		margin: 28px 0 10px;
		letter-spacing: -0.01em;
	}

	/* ===== FOOTER ===== */
	.corp-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1120px;
		margin: 0 auto;
		padding: 32px 48px 40px;
		border-top: 1px solid #e6e9ed;
		margin-top: 56px;
	}

	.footer-copy {
		font-size: 0.78rem;
		color: #8898a8;
	}

	.footer-id {
		font-size: 0.72rem;
		color: #c0c8d0;
		font-family: 'SF Mono', 'Fira Code', monospace;
		letter-spacing: 0.03em;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 900px) {
		.corp-nav {
			padding: 14px 24px;
		}

		.breadcrumb {
			padding: 16px 24px 0;
		}

		.detail-hero {
			padding: 24px 24px 32px;
		}

		.hero-left {
			flex-direction: column;
			gap: 16px;
		}

		.hero-title {
			font-size: 1.5rem;
		}

		.detail-grid {
			grid-template-columns: 1fr;
			gap: 32px;
			padding: 28px 24px 0;
		}

		.detail-sidebar {
			order: 2;
		}

		.detail-content {
			order: 1;
		}

		.corp-footer {
			padding: 24px 24px 32px;
			flex-direction: column;
			gap: 4px;
			align-items: flex-start;
		}
	}
</style>
