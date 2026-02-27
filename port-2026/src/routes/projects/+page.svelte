<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { projects, categoryLabels } from '$lib/data/projects.js';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	let resizeHandler: (() => void) | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile/projects', { replaceState: true });
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
		tl.from('.corp-nav, .corp-hero', {
			opacity: 0,
			y: -8,
			duration: 0.5,
			stagger: 0.08,
			ease: 'power2.out'
		});
		tl.from(
			'.project-row',
			{
				opacity: 0,
				y: 12,
				duration: 0.4,
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
	<title>Projects | Timothy Itayi</title>
</svelte:head>

<div class="corp-wrapper">
	<nav class="corp-nav">
		<div class="nav-left">
			<a href="/" class="nav-logo">Timothy Itayi</a>
		</div>
		<div class="nav-right">
			<a href="/" class="nav-item">Home</a>
			<a href="/clones" class="nav-item">Clones</a>
			<a href="/contact" class="nav-item nav-item-cta">Contact</a>
		</div>
	</nav>

	<header class="corp-hero">
		<h1 class="hero-title">Projects</h1>
		<p class="hero-desc">
			A complete overview of engineering work — applications, prototypes, and technical
			explorations.
		</p>
	</header>

	<div class="table-header">
		<span class="th-name">Project</span>
		<span class="th-category">Category</span>
		<span class="th-stack">Stack</span>
		<span class="th-year">Year</span>
		<span class="th-arrow"></span>
	</div>

	<main class="project-list">
		{#each projects as project}
			<a href="/projects/{project.slug}" class="project-row">
				<div class="row-name">
					<div class="row-icon">
						<img src={project.image} alt={project.title} />
					</div>
					<div class="row-info">
						<span class="row-title">{project.title}</span>
						<span class="row-desc">{project.description}</span>
					</div>
				</div>
				<span class="row-category">{categoryLabels[project.category]}</span>
				<div class="row-stack">
					{#each project.techStack.slice(0, 3) as tech}
						<span class="stack-tag">{tech}</span>
					{/each}
				</div>
				<span class="row-year">{project.year}</span>
				<span class="row-arrow">→</span>
			</a>
		{/each}
	</main>

	<footer class="corp-footer">
		<span class="footer-copy">© 2026 Timothy Itayi</span>
		<span class="footer-meta">Last updated Jan 2026</span>
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

	/* ===== HERO ===== */
	.corp-hero {
		max-width: 1120px;
		margin: 0 auto;
		padding: 64px 48px 40px;
	}

	.hero-title {
		font-size: 2.6rem;
		font-weight: 700;
		margin: 0 0 12px;
		color: #0a2540;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}

	.hero-desc {
		font-size: 1.1rem;
		color: #546678;
		margin: 0;
		line-height: 1.55;
		max-width: 540px;
		font-weight: 400;
	}

	/* ===== TABLE ===== */
	.table-header {
		display: grid;
		grid-template-columns: 1fr 120px 200px 60px 32px;
		gap: 16px;
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 48px 10px;
		border-bottom: 1px solid #e6e9ed;
		align-items: center;
	}

	.table-header span {
		font-size: 0.72rem;
		font-weight: 600;
		color: #8898a8;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	/* ===== PROJECT ROWS ===== */
	.project-list {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 48px;
	}

	.project-row {
		display: grid;
		grid-template-columns: 1fr 120px 200px 60px 32px;
		gap: 16px;
		padding: 20px 0;
		border-bottom: 1px solid #f0f2f5;
		text-decoration: none;
		color: inherit;
		align-items: center;
		transition: background 0.15s;
	}

	.project-row:hover {
		background: #f7f9fc;
		margin: 0 -16px;
		padding: 20px 16px;
		border-radius: 8px;
		border-color: transparent;
	}

	.row-name {
		display: flex;
		align-items: center;
		gap: 16px;
		min-width: 0;
	}

	.row-icon {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		background: #f4f6f8;
		border: 1px solid #e6e9ed;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.row-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 4px;
	}

	.row-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.row-title {
		font-size: 0.92rem;
		font-weight: 600;
		color: #0a2540;
	}

	.row-desc {
		font-size: 0.78rem;
		color: #8898a8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
	}

	.row-category {
		font-size: 0.8rem;
		color: #546678;
		font-weight: 500;
	}

	.row-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.stack-tag {
		font-size: 0.7rem;
		font-weight: 500;
		padding: 2px 8px;
		border-radius: 4px;
		background: #f0f2f5;
		color: #546678;
	}

	.row-year {
		font-size: 0.82rem;
		color: #8898a8;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}

	.row-arrow {
		font-size: 0.88rem;
		color: #c0c8d0;
		transition: color 0.15s;
	}

	.project-row:hover .row-arrow {
		color: #0a2540;
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
		margin-top: 48px;
	}

	.footer-copy,
	.footer-meta {
		font-size: 0.78rem;
		color: #8898a8;
		font-weight: 400;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 900px) {
		.corp-nav {
			padding: 14px 24px;
		}

		.corp-hero {
			padding: 40px 24px 28px;
		}

		.hero-title {
			font-size: 2rem;
		}

		.table-header {
			display: none;
		}

		.project-list {
			padding: 0 24px;
		}

		.project-row {
			grid-template-columns: 1fr;
			gap: 8px;
			padding: 16px 0;
		}

		.project-row:hover {
			margin: 0 -12px;
			padding: 16px 12px;
		}

		.row-category,
		.row-stack,
		.row-year,
		.row-arrow {
			display: none;
		}

		.corp-footer {
			padding: 24px 24px 32px;
			flex-direction: column;
			gap: 4px;
			align-items: flex-start;
		}
	}
</style>
