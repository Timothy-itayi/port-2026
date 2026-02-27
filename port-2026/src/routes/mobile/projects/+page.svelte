<script lang="ts">
	import { goto } from '$app/navigation';
	import { projects, categoryLabels, getProjectsByCategory } from '$lib/data/projects.js';
	import type { ProjectCategory } from '$lib/data/projects.js';

	const categories: ProjectCategory[] = ['personal', 'web-app', 'mobile-app'];
</script>

<div class="gtv-projects">
	<!-- Header -->
	<header class="projects-header">
		<button class="back-btn" onclick={() => goto('/mobile')} aria-label="Back">
			<span class="back-icon">‹</span>
		</button>
		<h1 class="header-title">Projects</h1>
	</header>

	<!-- Grouped Grids -->
	{#each categories as cat}
		{@const catProjects = getProjectsByCategory(cat)}
		{#if catProjects.length > 0}
			<section class="category-section">
				<h2 class="category-title">{categoryLabels[cat]}</h2>
				<div class="project-grid">
					{#each catProjects as project}
						<button class="grid-card" onclick={() => goto(`/mobile/projects/${project.slug}`)}>
							<div class="grid-card-image">
								<img src={project.image} alt={project.title} />
							</div>
							<div class="grid-card-info">
								<span class="grid-card-title">{project.title}</span>
								<span class="grid-card-meta">{project.client || project.author} · {project.year}</span>
							</div>
						</button>
					{/each}
				</div>
			</section>
		{/if}
	{/each}
</div>

<style>
	.gtv-projects {
		display: flex;
		flex-direction: column;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	/* ===== HEADER ===== */
	.projects-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		position: sticky;
		top: 0;
		z-index: 10;
		background: #0a0a0a;
	}

	.back-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 50%;
		transition: background 0.2s;
		padding: 0;
	}

	.back-btn:active {
		background: rgba(255, 255, 255, 0.08);
	}

	.back-icon {
		font-size: 1.6rem;
		color: #e8e8e8;
		line-height: 1;
	}

	.header-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: #e8e8e8;
	}

	/* ===== CATEGORY SECTIONS ===== */
	.category-section {
		padding: 0 16px 24px;
	}

	.category-title {
		font-size: 1rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 0 0 14px 4px;
	}

	/* ===== 3-COLUMN GRID ===== */
	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	.grid-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
	}

	.grid-card-image {
		width: 100%;
		aspect-ratio: 1/1;
		border-radius: 10px;
		overflow: hidden;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.grid-card-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 12px;
		transition: transform 0.3s ease;
	}

	.grid-card:active .grid-card-image img {
		transform: scale(1.05);
	}

	.grid-card-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0 2px;
	}

	.grid-card-title {
		font-size: 0.8rem;
		font-weight: 500;
		color: #e8e8e8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.grid-card-meta {
		font-size: 0.68rem;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
