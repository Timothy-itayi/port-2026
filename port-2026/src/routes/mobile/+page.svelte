<script lang="ts">
	import { goto } from '$app/navigation';
	import { projects, categoryLabels, getProjectsByCategory, getFeaturedProject } from '$lib/data/projects.js';
	import type { ProjectCategory } from '$lib/data/projects.js';

	const featured = getFeaturedProject();
	const categories: ProjectCategory[] = ['personal', 'web-app', 'mobile-app'];
</script>

<div class="gtv-home">
	<!-- Featured Hero -->
	<button class="hero" onclick={() => goto(`/mobile/projects/${featured.slug}`)}>
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
		</div>
	</button>

	<!-- Category Rows -->
	{#each categories as cat}
		{@const catProjects = getProjectsByCategory(cat)}
		{#if catProjects.length > 0}
			<section class="row-section">
				<div class="row-header">
					<h2 class="row-title">{categoryLabels[cat]}</h2>
					<button class="row-see-all" onclick={() => goto('/mobile/projects')}>See all</button>
				</div>
				<div class="row-scroll">
					{#each catProjects as project}
						<button class="row-card" onclick={() => goto(`/mobile/projects/${project.slug}`)}>
							<div class="row-card-image">
								<img src={project.image} alt={project.title} />
							</div>
							<div class="row-card-info">
								<span class="row-card-title">{project.title}</span>
								<span class="row-card-meta">{project.year}</span>
							</div>
						</button>
					{/each}
				</div>
			</section>
		{/if}
	{/each}

	<!-- Footer -->
	<footer class="gtv-footer">
		<span>Timothy Itayi © 2026</span>
	</footer>
</div>

<style>
	.gtv-home {
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding-bottom: 24px;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

	.row-see-all {
		font-size: 0.8rem;
		font-weight: 500;
		color: #8ab4f8;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 0;
		font-family: inherit;
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

	.row-card-meta {
		font-size: 0.7rem;
		color: #666;
	}

	/* ===== FOOTER ===== */
	.gtv-footer {
		padding: 24px 20px;
		text-align: center;
		font-size: 0.75rem;
		color: #555;
	}
</style>
