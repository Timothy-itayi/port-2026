<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { categoryLabels, getProjectsByCategory, getFeaturedProject } from '$lib/data/projects.js';
	import type { ProjectCategory } from '$lib/data/projects.js';

	const featured = getFeaturedProject();
	const categories: ProjectCategory[] = ['web-app', 'mobile-app'];

	function saveScrollState() {
		const screenInner = document.querySelector('.screen-inner');
		if (screenInner) {
			sessionStorage.setItem('mobileProjectsScrollTop', String(screenInner.scrollTop));
		}
		const rows = document.querySelectorAll('.row-scroll');
		const rowScrolls: number[] = [];
		rows.forEach((row) => rowScrolls.push((row as HTMLElement).scrollLeft));
		sessionStorage.setItem('mobileProjectsRowScrolls', JSON.stringify(rowScrolls));
	}

	function navigateToProject(slug: string) {
		saveScrollState();
		goto(`/mobile/projects/${slug}`);
	}

	afterNavigate(async () => {
		const savedTop = sessionStorage.getItem('mobileProjectsScrollTop');
		const savedRows = sessionStorage.getItem('mobileProjectsRowScrolls');

		if (savedTop !== null || savedRows !== null) {
			await tick();
			const screenInner = document.querySelector('.screen-inner') as HTMLElement | null;

			if (screenInner && savedTop !== null) {
				screenInner.style.scrollBehavior = 'auto';
				screenInner.scrollTop = parseInt(savedTop);
				screenInner.style.scrollBehavior = '';
			}

			if (savedRows !== null) {
				const rows = document.querySelectorAll('.row-scroll');
				const rowScrolls = JSON.parse(savedRows) as number[];
				rows.forEach((row, i) => {
					if (rowScrolls[i] !== undefined) {
						(row as HTMLElement).scrollLeft = rowScrolls[i];
					}
				});
			}

			sessionStorage.removeItem('mobileProjectsScrollTop');
			sessionStorage.removeItem('mobileProjectsRowScrolls');
		}
	});

	const downloadResume = () => {
		const link = document.createElement('a');
		link.href = '/Resume_Timothy_Itayi.pdf';
		link.download = 'Resume_Timothy_Itayi.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
</script>

<div class="gtv-projects">
	<!-- Featured Hero -->
	<button class="hero" onclick={() => navigateToProject(featured.slug)}>
		<div class="hero-image">
			<img src={featured.image} alt={featured.title} />
		</div>
		<div class="hero-gradient"></div>
		<div class="hero-content">
			<h1 class="hero-title">{featured.title}</h1>
			<div class="hero-meta">
				<span class="hero-year">{featured.year}</span>
				<span class="hero-dot">·</span>
				<span class="hero-category">{categoryLabels[featured.category]}</span>
				{#if featured.client}
					<span class="hero-dot">·</span>
					<span class="hero-client">{featured.client}</span>
				{/if}
			</div>
			<p class="hero-desc">{featured.description}</p>
			<span class="hero-status">Currently under development</span>
		</div>
	</button>

	<!-- Category Rows -->
	{#each categories as cat}
		{@const catProjects = getProjectsByCategory(cat)}
		{#if catProjects.length > 0}
			<section class="row-section">
				<div class="row-header">
					<h2 class="row-title">{categoryLabels[cat]}</h2>
				</div>
				<div class="row-scroll">
					{#each catProjects as project}
						<button class="row-card" onclick={() => navigateToProject(project.slug)}>
							<div class="row-card-image">
								<img src={project.image} alt={project.title} />
							</div>
							<div class="row-card-info">
								<span class="row-card-title">{project.title}</span>
								<span class="row-card-subtitle">{project.subtitle}</span>
								<span class="row-card-meta">{project.year}</span>
							</div>
						</button>
					{/each}
				</div>
			</section>
		{/if}
	{/each}

	<!-- Resume Section -->
	<section class="row-section">
		<div class="row-header">
			<h2 class="row-title">Resume</h2>
		</div>
		<div class="resume-row">
			<button class="resume-card" onclick={downloadResume}>
				<div class="resume-card-icon">
					<span>↓</span>
				</div>
				<div class="resume-card-info">
					<span class="resume-card-title">Download Resume</span>
					<span class="resume-card-meta">PDF · Timothy Itayi</span>
				</div>
			</button>
		</div>
	</section>
</div>

<style>
	.gtv-projects {
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding-bottom: 24px;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	/* ===== HERO ===== */
	.hero {
		position: relative;
		width: 100%;
		aspect-ratio: 16/10;
		overflow: hidden;
		border: none;
		padding: 0;
		cursor: pointer;
		background: #1a1a1a;
		display: block;
		text-align: left;
		font-family: inherit;
	}

	.hero-image {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #1a1a1a;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			#0a0a0a 0%,
			rgba(10, 10, 10, 0.85) 30%,
			rgba(10, 10, 10, 0.3) 60%,
			transparent 100%
		);
	}

	.hero-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
	}

	.hero-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 8px;
		color: #fff;
		line-height: 1.1;
	}

	.hero-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		color: #999;
		margin-bottom: 8px;
	}

	.hero-dot {
		color: #555;
	}

	.hero-desc {
		font-size: 0.85rem;
		color: #bbb;
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.hero-status {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		font-style: italic;
		color: #ccc;
		margin-top: 6px;
		letter-spacing: 0.02em;
	}

	/* ===== ROW SECTIONS ===== */
	.row-section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.row-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}

	.row-title {
		font-size: 1.15rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 0;
	}

	.row-scroll {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding: 0 20px;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}

	.row-scroll::-webkit-scrollbar {
		display: none;
	}

	.row-card {
		flex-shrink: 0;
		width: 130px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		scroll-snap-align: start;
		text-align: left;
		font-family: inherit;
	}

	.row-card-image {
		width: 130px;
		height: 130px;
		border-radius: 12px;
		overflow: hidden;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.row-card-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 10px;
		transition: transform 0.3s ease;
	}

	.row-card:active .row-card-image img {
		transform: scale(1.05);
	}

	.row-card-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0 2px;
	}

	.row-card-title {
		font-size: 0.8rem;
		font-weight: 500;
		color: #e8e8e8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row-card-subtitle {
		font-size: 0.65rem;
		color: #888;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row-card-meta {
		font-size: 0.7rem;
		color: #666;
	}

	/* ===== RESUME SECTION ===== */
	.resume-row {
		padding: 0 20px 24px;
	}

	.resume-card {
		display: flex;
		align-items: center;
		gap: 14px;
		width: 100%;
		padding: 14px 16px;
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.2s;
	}

	.resume-card:active {
		background: #222;
	}

	.resume-card-icon {
		width: 44px;
		height: 44px;
		border-radius: 10px;
		background: #fff;
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}

	.resume-card-icon span {
		font-size: 1.2rem;
		color: #0a0a0a;
	}

	.resume-card-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.resume-card-title {
		font-size: 0.9rem;
		font-weight: 500;
		color: #e8e8e8;
	}

	.resume-card-meta {
		font-size: 0.75rem;
		color: #666;
	}
</style>
