<script lang="ts">
	import { goto } from '$app/navigation';
	import { categoryLabels } from '$lib/data/projects.js';
	import type { PageData } from './$types.js';

	export let data: PageData;
	const { project } = data;
</script>

<div class="gtv-detail">
	<!-- Full-bleed Hero -->
	<div class="detail-hero">
		<div class="hero-image">
			<img src={project.image} alt={project.title} />
		</div>
		<div class="hero-gradient"></div>

		<!-- Back button overlaid on image -->
		<button class="back-fab" onclick={() => goto('/mobile/projects')} aria-label="Back">
			<span class="back-icon">‹</span>
		</button>

		<!-- Title overlaid at bottom -->
		<div class="hero-info">
			<h1 class="detail-title">{project.title}</h1>
			<div class="detail-meta">
				<span class="meta-year">{project.year}</span>
				<span class="meta-sep">·</span>
				<span class="meta-category">{categoryLabels[project.category]}</span>
				{#if project.client}
					<span class="meta-sep">·</span>
					<span class="meta-client">{project.client}</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Description -->
	<div class="detail-body">
		<p class="detail-desc">{project.description}</p>

		<!-- Primary CTA -->
		{#if project.liveSiteUrl}
			<a href={project.liveSiteUrl} target="_blank" rel="noopener" class="cta-primary">
				<span class="cta-play">▶</span>
				<div class="cta-text">
					<span class="cta-label">Visit site</span>
					<span class="cta-sub">Live project</span>
				</div>
			</a>
		{/if}

		<!-- Secondary Actions Row -->
		<div class="action-row">
			{#if project.githubUrl}
				<a href={project.githubUrl} target="_blank" rel="noopener" class="action-item">
					<span class="action-icon">◇</span>
					<span class="action-label">Source</span>
				</a>
			{/if}
			{#if project.youtubeUrl}
				<a href={project.youtubeUrl} target="_blank" rel="noopener" class="action-item">
					<span class="action-icon">▶</span>
					<span class="action-label">Demo</span>
				</a>
			{/if}
		</div>

		<!-- Tech Stack -->
		<div class="tech-section">
			<h3 class="section-title">Tech Stack</h3>
			<div class="tech-pills">
				{#each project.techStack as tech}
					<span class="tech-pill">{tech}</span>
				{/each}
			</div>
		</div>

		<!-- Content -->
		<div class="detail-content">
			{@html project.content}
		</div>
	</div>
</div>

<style>
	.gtv-detail {
		display: flex;
		flex-direction: column;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	/* ===== HERO ===== */
	.detail-hero {
		position: relative;
		width: 100%;
		aspect-ratio: 16/10;
		overflow: hidden;
	}

	.hero-image {
		position: absolute;
		inset: 0;
		background: #1a1a1a;
		display: flex;
		align-items: center;
		justify-content: center;
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
			rgba(10, 10, 10, 0.8) 35%,
			rgba(10, 10, 10, 0.2) 65%,
			transparent 100%
		);
	}

	.back-fab {
		position: absolute;
		top: 16px;
		left: 16px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
		transition: background 0.2s;
	}

	.back-fab:active {
		background: rgba(0, 0, 0, 0.7);
	}

	.back-icon {
		font-size: 1.6rem;
		color: #fff;
		line-height: 1;
	}

	.hero-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 20px 20px;
		z-index: 2;
	}

	.detail-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 8px;
		color: #fff;
		line-height: 1.1;
	}

	.detail-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		color: #999;
	}

	.meta-sep {
		color: #555;
	}

	/* ===== BODY ===== */
	.detail-body {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.detail-desc {
		font-size: 0.95rem;
		color: #bbb;
		line-height: 1.6;
		margin: 0;
	}

	/* ===== PRIMARY CTA ===== */
	.cta-primary {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 20px;
		background: #fff;
		border-radius: 28px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-primary:active {
		transform: scale(0.98);
		background: #eee;
	}

	.cta-play {
		font-size: 1.2rem;
		color: #0a0a0a;
		width: 40px;
		height: 40px;
		background: #0a0a0a;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
	}

	.cta-text {
		display: flex;
		flex-direction: column;
	}

	.cta-label {
		font-size: 1rem;
		font-weight: 600;
		color: #0a0a0a;
	}

	.cta-sub {
		font-size: 0.75rem;
		color: #666;
	}

	/* ===== ACTION ROW ===== */
	.action-row {
		display: flex;
		gap: 32px;
		padding: 4px 0;
	}

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		text-decoration: none;
		cursor: pointer;
	}

	.action-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		color: #e8e8e8;
		transition: background 0.2s;
	}

	.action-item:active .action-icon {
		background: rgba(255, 255, 255, 0.15);
	}

	.action-label {
		font-size: 0.7rem;
		color: #999;
		font-weight: 500;
	}

	/* ===== TECH ===== */
	.tech-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.section-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: #999;
		margin: 0;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tech-pill {
		padding: 6px 14px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.08);
		font-size: 0.78rem;
		font-weight: 500;
		color: #bbb;
	}

	/* ===== CONTENT ===== */
	.detail-content {
		font-size: 0.9rem;
		line-height: 1.7;
		color: #999;
	}

	.detail-content :global(p) {
		margin: 0 0 14px;
	}

	.detail-content :global(h3) {
		font-size: 0.9rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 20px 0 8px;
	}

	.detail-content :global(strong) {
		color: #bbb;
	}
</style>
