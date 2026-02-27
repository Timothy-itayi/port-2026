<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { projects, categoryLabels, getProjectsByCategory } from '$lib/data/projects.js';
	import type { ProjectCategory } from '$lib/data/projects.js';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	let selectedCategory: ProjectCategory | 'all' = 'all';
	let resizeHandler: (() => void) | null = null;

	const cardVariants: Record<string, 'tall' | 'wide' | 'square'> = {
		amber: 'tall',
		restock: 'wide',
		bellroy: 'square',
		'genius-sports': 'wide',
		kogan: 'tall',
		't2-tea': 'square',
		'show-down': 'tall',
		'coffee-snob': 'wide',
		'formula1-heritage': 'tall',
		waitless: 'square',
		soundscape: 'tall',
		spincycle: 'wide',
		'hashtable-visualiser': 'square',
		'grandprix-history': 'tall',
		stacks: 'wide'
	};

	const getAspectRatio = (slug: string): string => {
		const v = cardVariants[slug] || 'square';
		if (v === 'tall') return '3/4';
		if (v === 'wide') return '4/3';
		return '1/1';
	};

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile/projects', { replaceState: true });
		}
	};

	$: filteredProjects =
		selectedCategory === 'all'
			? projects
			: getProjectsByCategory(selectedCategory as ProjectCategory);

	function selectCategory(cat: ProjectCategory | 'all') {
		selectedCategory = cat;
	}

	onMount(() => {
		checkViewportAndRedirect();

		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		window.addEventListener('resize', resizeHandler);

		const tl = gsap.timeline();
		tl.from('.gallery-nav', {
			opacity: 0,
			y: -10,
			duration: 0.4,
			ease: 'power2.out'
		});
		tl.from(
			'.gallery-tabs',
			{
				opacity: 0,
				y: -10,
				duration: 0.4,
				ease: 'power2.out'
			},
			'-=0.2'
		);
		tl.from(
			'.gallery-card',
			{
				opacity: 0,
				y: 30,
				scale: 0.96,
				duration: 0.5,
				stagger: 0.05,
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
	<title>Gallery | Timothy Itayi</title>
</svelte:head>

<div class="gallery-wrapper">
	<nav class="gallery-nav">
		<div class="nav-left">
			<a href="/" class="nav-brand">TIMOTHY<sup>©</sup></a>
			<a href="/" class="nav-link">Control Panel</a>
			<a href="/projects" class="nav-link">Archive</a>
		</div>
		<div class="nav-right">
			<a href="/contact" class="nav-cta">Contact</a>
		</div>
	</nav>

	<div class="gallery-tabs">
		<button
			class="tab"
			class:active={selectedCategory === 'all'}
			onclick={() => selectCategory('all')}
			type="button">All</button
		>
		{#each Object.entries(categoryLabels) as [key, label]}
			<button
				class="tab"
				class:active={selectedCategory === key}
				onclick={() => selectCategory(key as ProjectCategory)}
				type="button">{label}</button
			>
		{/each}
	</div>

	<div class="gallery-grid">
		{#each filteredProjects as project (project.slug)}
			<a href="/projects/gallery/{project.slug}" class="gallery-card">
				<div class="card-visual" style="aspect-ratio: {getAspectRatio(project.slug)}">
					<img src={project.image} alt={project.title} loading="lazy" />
					<div class="card-hover-overlay">
						<p class="hover-desc">{project.description}</p>
						<div class="hover-tags">
							{#each project.techStack.slice(0, 3) as tech}
								<span class="hover-tag">{tech}</span>
							{/each}
						</div>
					</div>
				</div>
				<div class="card-meta">
					<span class="card-title">{project.title}</span>
					<span class="card-subtitle"
						>{project.client || project.author} · {project.year}</span
					>
				</div>
			</a>
		{/each}
	</div>

	<footer class="gallery-footer">
		<span class="footer-brand">Timothy Itayi</span>
		<span class="footer-tagline">curated works</span>
	</footer>
</div>

<style>
	:global(body) {
		background: #111;
		margin: 0;
		padding: 0;
	}

	.gallery-wrapper {
		min-height: 100vh;
		background: #111;
		color: #e8e8e8;
		font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
	}

	/* ===== NAV ===== */
	.gallery-nav {
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

	.nav-cta {
		display: inline-flex;
		align-items: center;
		padding: 7px 18px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.08);
		color: #e8e8e8;
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 500;
		transition: background 0.2s;
	}

	.nav-cta:hover {
		background: rgba(255, 255, 255, 0.14);
	}

	/* ===== TABS ===== */
	.gallery-tabs {
		display: flex;
		justify-content: center;
		gap: 6px;
		padding: 18px 28px;
	}

	.tab {
		background: none;
		border: none;
		color: #555;
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 500;
		padding: 8px 22px;
		border-radius: 24px;
		cursor: pointer;
		transition:
			color 0.2s,
			background 0.2s;
	}

	.tab:hover {
		color: #ccc;
		background: rgba(255, 255, 255, 0.04);
	}

	.tab.active {
		color: #e8e8e8;
		background: rgba(255, 255, 255, 0.1);
	}

	/* ===== MASONRY GRID ===== */
	.gallery-grid {
		columns: 4;
		column-gap: 14px;
		padding: 0 28px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.gallery-card {
		break-inside: avoid;
		margin-bottom: 14px;
		display: inline-block;
		width: 100%;
		text-decoration: none;
		color: inherit;
	}

	.card-visual {
		position: relative;
		width: 100%;
		border-radius: 14px;
		overflow: hidden;
		background: #1e1e1e;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-visual img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 18%;
		transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
	}

	.gallery-card:hover .card-visual img {
		transform: scale(1.08);
	}

	.card-hover-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 30%, rgba(0, 0, 0, 0.78) 100%);
		opacity: 0;
		transition: opacity 0.35s ease;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 16px;
		border-radius: 14px;
		gap: 8px;
	}

	.gallery-card:hover .card-hover-overlay {
		opacity: 1;
	}

	.hover-desc {
		margin: 0;
		font-size: 0.78rem;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.85);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.hover-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.hover-tag {
		font-size: 0.65rem;
		font-weight: 500;
		padding: 2px 8px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.7);
	}

	.card-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 10px 4px 0;
	}

	.card-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: #e8e8e8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-subtitle {
		font-size: 0.72rem;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ===== FOOTER ===== */
	.gallery-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 28px 32px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.footer-brand {
		font-size: 0.85rem;
		font-weight: 600;
		color: #e8e8e8;
	}

	.footer-tagline {
		font-size: 0.8rem;
		color: #555;
		font-style: italic;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 1200px) {
		.gallery-grid {
			columns: 3;
		}
	}

	@media (max-width: 900px) {
		.gallery-grid {
			columns: 2;
		}
	}

	@media (max-width: 600px) {
		.gallery-grid {
			columns: 1;
			padding: 0 16px 40px;
		}

		.gallery-nav {
			padding: 12px 16px;
		}

		.nav-link {
			display: none;
		}

		.gallery-tabs {
			padding: 14px 16px;
			gap: 4px;
		}

		.tab {
			font-size: 0.82rem;
			padding: 6px 16px;
		}
	}
</style>
