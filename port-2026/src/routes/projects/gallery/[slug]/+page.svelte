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
		checkViewportAndRedirect();

		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		window.addEventListener('resize', resizeHandler);

		const tl = gsap.timeline();
		tl.from('.detail-nav', {
			opacity: 0,
			y: -10,
			duration: 0.4,
			ease: 'power2.out'
		});
		tl.from(
			'.hero-image',
			{
				opacity: 0,
				scale: 0.97,
				duration: 0.6,
				ease: 'power2.out'
			},
			'-=0.2'
		);
		tl.from(
			'.detail-title, .detail-subtitle',
			{
				opacity: 0,
				y: 15,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power2.out'
			},
			'-=0.3'
		);
		tl.from(
			'.meta-chip, .detail-body, .detail-links',
			{
				opacity: 0,
				y: 15,
				duration: 0.5,
				stagger: 0.06,
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
	<title>{project.title} | Gallery</title>
</svelte:head>

<div class="detail-wrapper">
	<nav class="detail-nav">
		<div class="nav-left">
			<a href="/" class="nav-brand">TIMOTHY<sup>©</sup></a>
			<a href="/projects/gallery" class="nav-link">Gallery</a>
		</div>
		<div class="nav-right">
			<a href="/projects/gallery" class="nav-back">← Back</a>
		</div>
	</nav>

	<main class="detail-content">
		<div class="hero-image">
			<img src={project.image} alt={project.title} />
		</div>

		<div class="detail-header">
			<h1 class="detail-title">{project.title}</h1>
			<p class="detail-subtitle">{project.description}</p>
		</div>

		<div class="meta-row">
			{#if project.client}
				<span class="meta-chip">
					<span class="chip-label">Client</span>
					<span class="chip-value">{project.client}</span>
				</span>
			{/if}
			<span class="meta-chip">
				<span class="chip-label">Year</span>
				<span class="chip-value">{project.year}</span>
			</span>
			<span class="meta-chip">
				<span class="chip-label">Category</span>
				<span class="chip-value">{project.category}</span>
			</span>
		</div>

		<div class="tech-row">
			{#each project.techStack as tech}
				<span class="tech-chip">{tech}</span>
			{/each}
		</div>

		{#if project.githubUrl || project.liveSiteUrl || project.youtubeUrl}
			<div class="detail-links">
				{#if project.liveSiteUrl}
					<a href={project.liveSiteUrl} target="_blank" rel="noopener" class="link-btn primary"
						>View Live Site</a
					>
				{/if}
				{#if project.githubUrl}
					<a href={project.githubUrl} target="_blank" rel="noopener" class="link-btn">GitHub</a>
				{/if}
				{#if project.youtubeUrl}
					<a href={project.youtubeUrl} target="_blank" rel="noopener" class="link-btn">YouTube</a>
				{/if}
			</div>
		{/if}

		<div class="detail-body">
			{@html project.content}
		</div>
	</main>

	<footer class="detail-footer">
		<span class="footer-brand">Timothy Itayi</span>
		<span class="footer-id">{project.slug.toUpperCase()}</span>
	</footer>
</div>

<style>
	:global(body) {
		background: #111;
		margin: 0;
		padding: 0;
	}

	.detail-wrapper {
		min-height: 100vh;
		background: #111;
		color: #e8e8e8;
		font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
	}

	/* ===== NAV ===== */
	.detail-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 28px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(17, 17, 17, 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: 28px;
	}

	.nav-brand {
		font-size: 1.05rem;
		font-weight: 700;
		color: #e8e8e8;
		text-decoration: none;
		letter-spacing: 0.06em;
	}

	.nav-brand sup {
		font-size: 0.5em;
		vertical-align: super;
		opacity: 0.4;
	}

	.nav-link {
		color: #777;
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 500;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: #e8e8e8;
	}

	.nav-right {
		display: flex;
		align-items: center;
	}

	.nav-back {
		color: #777;
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 500;
		padding: 7px 18px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.06);
		transition:
			color 0.2s,
			background 0.2s;
	}

	.nav-back:hover {
		color: #e8e8e8;
		background: rgba(255, 255, 255, 0.12);
	}

	/* ===== CONTENT ===== */
	.detail-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 28px 60px;
	}

	/* ===== HERO IMAGE ===== */
	.hero-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		border-radius: 16px;
		overflow: hidden;
		background: #1e1e1e;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 32px;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 14%;
	}

	/* ===== HEADER ===== */
	.detail-title {
		font-size: 2.8rem;
		font-weight: 700;
		margin: 0 0 12px;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #fff;
	}

	.detail-subtitle {
		font-size: 1.05rem;
		line-height: 1.55;
		color: #999;
		margin: 0 0 24px;
		font-weight: 400;
	}

	/* ===== META ===== */
	.meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 16px;
	}

	.meta-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 14px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.06);
		font-size: 0.82rem;
	}

	.chip-label {
		color: #666;
		font-weight: 500;
	}

	.chip-value {
		color: #ccc;
		font-weight: 600;
	}

	.tech-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 28px;
	}

	.tech-chip {
		padding: 4px 12px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.08);
		color: #aaa;
		font-size: 0.78rem;
		font-weight: 500;
	}

	/* ===== LINKS ===== */
	.detail-links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 36px;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		padding: 10px 22px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.08);
		color: #e8e8e8;
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 500;
		transition:
			background 0.2s,
			transform 0.15s;
	}

	.link-btn:hover {
		background: rgba(255, 255, 255, 0.14);
		transform: translateY(-1px);
	}

	.link-btn.primary {
		background: rgba(255, 255, 255, 0.14);
		font-weight: 600;
	}

	.link-btn.primary:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	/* ===== BODY ===== */
	.detail-body {
		font-size: 1rem;
		line-height: 1.7;
		color: #bbb;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding-top: 32px;
	}

	.detail-body :global(p) {
		margin: 0 0 20px;
	}

	.detail-body :global(h3) {
		font-size: 1.2rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 32px 0 12px;
		letter-spacing: -0.01em;
	}

	/* ===== FOOTER ===== */
	.detail-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 28px 32px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}

	.footer-brand {
		font-size: 0.85rem;
		font-weight: 600;
		color: #e8e8e8;
	}

	.footer-id {
		font-size: 0.75rem;
		color: #555;
		font-family: 'SF Mono', 'Fira Code', monospace;
		letter-spacing: 0.04em;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 600px) {
		.detail-content {
			padding: 24px 16px 40px;
		}

		.detail-nav {
			padding: 12px 16px;
		}

		.detail-title {
			font-size: 2rem;
		}

		.hero-image {
			border-radius: 12px;
			margin-bottom: 24px;
		}

		.detail-footer {
			padding: 20px 16px 24px;
		}
	}
</style>
