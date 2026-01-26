<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import type { PageData } from './$types.js';

	export let data: PageData;
	const { project } = data;

	onMount(() => {
		const tl = gsap.timeline();
		tl.from('.project-header, .project-image, .project-meta, .project-content', {
			opacity: 0,
			y: 15,
			duration: 0.3,
			stagger: 0.08,
			ease: 'power2.out'
		});
	});

	const handleBack = () => {
		goto('/mobile/projects');
	};
</script>

<div class="mobile-project-detail">
	<!-- Navigation Bar -->
	<nav class="detail-nav">
		<button class="back-btn" onclick={handleBack}>
			<span class="back-arrow">◂</span>
			<span class="back-text">ARCHIVE</span>
		</button>
		<div class="nav-status">
			<span class="status-dot"></span>
			<span class="status-text">VIEWING</span>
		</div>
	</nav>

	<!-- Project Header -->
	<header class="project-header">
		<div class="header-top">
			<span class="project-id">PRJ/{project.slug.toUpperCase()}</span>
			<span class="project-year">{project.year}</span>
		</div>
		<h1 class="project-title">{project.title}</h1>
		<div class="project-author">BY {project.author.toUpperCase()}</div>
	</header>

	<!-- Project Image -->
	<div class="project-image">
		<div class="image-frame">
			<img src={project.image} alt={project.title} />
		</div>
		<div class="image-label">
			<span class="label-icon">◫</span>
			<span class="label-text">PROJECT PREVIEW</span>
		</div>
	</div>

	<!-- Project Metadata -->
	<section class="project-meta">
		<div class="meta-header">
			<span class="section-icon">▤</span>
			<span class="section-title">SPECIFICATIONS</span>
		</div>
		
		<div class="meta-grid">
			<div class="meta-item">
				<span class="meta-label">CLIENT</span>
				<span class="meta-value">{project.client || 'N/A'}</span>
			</div>
			<div class="meta-item">
				<span class="meta-label">YEAR</span>
				<span class="meta-value">{project.year}</span>
			</div>
		</div>

		<div class="tech-section">
			<span class="tech-label">TECH STACK</span>
			<div class="tech-tags">
				{#each project.techStack as tech}
					<span class="tech-tag">{tech}</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- Project Description -->
	<section class="project-content">
		<div class="content-header">
			<span class="section-icon">▧</span>
			<span class="section-title">OVERVIEW</span>
		</div>
		
		<div class="lead-text">
			{project.description}
		</div>

		<div class="content-body">
			{@html project.content}
		</div>
	</section>

	<!-- Action Buttons -->
	<section class="project-actions">
		{#if project.liveSiteUrl}
			<a href={project.liveSiteUrl} target="_blank" rel="noopener" class="action-btn primary">
				<span class="btn-icon">▸</span>
				<span class="btn-text">VIEW LIVE SITE</span>
			</a>
		{/if}
		{#if project.githubUrl}
			<a href={project.githubUrl} target="_blank" rel="noopener" class="action-btn secondary">
				<span class="btn-icon">◈</span>
				<span class="btn-text">SOURCE CODE</span>
			</a>
		{/if}
		{#if project.youtubeUrl}
			<a href={project.youtubeUrl} target="_blank" rel="noopener" class="action-btn secondary">
				<span class="btn-icon">▶</span>
				<span class="btn-text">WATCH DEMO</span>
			</a>
		{/if}
	</section>

	<!-- Footer -->
	<div class="detail-footer">
		<span class="footer-line"></span>
		<span class="footer-text">PROJECT ID: {project.slug.toUpperCase()}-001</span>
		<span class="footer-line"></span>
	</div>
</div>

<style>
	.mobile-project-detail {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		color: #fafafa;
		min-height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		background: #0a0a0b;
	}

	/* Navigation */
	.detail-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 12px;
		padding: 12px 16px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.back-btn:hover,
	.back-btn:active {
		background: #232326;
		border-color: rgba(139, 92, 246, 0.4);
		transform: translateX(-4px);
	}

	.back-arrow {
		color: #8b5cf6;
		font-size: 1rem;
	}

	.back-text {
		color: #fafafa;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.nav-status {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 14px;
		background: #22c55e;
		border-radius: 20px;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #fff;
		animation: softPulse 2s infinite;
	}

	@keyframes softPulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.6; transform: scale(1.15); }
	}

	.status-text {
		font-size: 0.7rem;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0.04em;
	}

	/* Header */
	.project-header {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-id {
		font-size: 0.8rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.04em;
	}

	.project-year {
		font-size: 0.8rem;
		font-weight: 600;
		color: #fff;
		background: #8b5cf6;
		padding: 6px 14px;
		border-radius: 20px;
	}

	.project-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: #fafafa;
	}

	.project-author {
		font-size: 0.85rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.02em;
	}

	/* Image */
	.project-image {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.image-frame {
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		background: #1c1c1f;
		padding: 20px;
		aspect-ratio: 16/10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-frame img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 10px;
	}

	.image-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.04em;
	}

	.label-icon {
		color: #8b5cf6;
	}

	/* Metadata Section */
	.project-meta {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.meta-header,
	.content-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.section-icon {
		color: #8b5cf6;
		font-size: 1rem;
	}

	.section-title {
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #a1a1aa;
		text-transform: uppercase;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meta-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.04em;
	}

	.meta-value {
		font-size: 1rem;
		font-weight: 600;
		color: #fafafa;
	}

	.tech-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.tech-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.04em;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tech-tag {
		font-size: 0.8rem;
		font-weight: 600;
		padding: 8px 14px;
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 20px;
		color: #8b5cf6;
		background: rgba(139, 92, 246, 0.15);
	}

	/* Content Section */
	.project-content {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.lead-text {
		font-size: 1.05rem;
		line-height: 1.65;
		font-weight: 500;
		color: #fafafa;
		padding: 18px;
		border-left: 3px solid #8b5cf6;
		background: #1c1c1f;
		border-radius: 0 12px 12px 0;
	}

	.content-body {
		font-size: 0.95rem;
		line-height: 1.75;
		color: #a1a1aa;
	}

	.content-body :global(p) {
		margin: 0 0 16px 0;
	}

	.content-body :global(h3) {
		margin: 24px 0 12px 0;
		font-size: 1rem;
		font-weight: 600;
		color: #fafafa;
		letter-spacing: 0.02em;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		padding-bottom: 8px;
	}

	/* Actions */
	.project-actions {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 8px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 18px 24px;
		border-radius: 14px;
		font-family: inherit;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.action-btn.primary {
		background: #8b5cf6;
		border: none;
		color: #fff;
	}

	.action-btn.primary:hover,
	.action-btn.primary:active {
		background: #7c3aed;
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
	}

	.action-btn.secondary {
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: #fafafa;
	}

	.action-btn.secondary:hover,
	.action-btn.secondary:active {
		background: #232326;
		border-color: rgba(139, 92, 246, 0.4);
		transform: translateY(-2px);
	}

	.btn-icon {
		font-size: 1rem;
	}

	.btn-text {
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	/* Footer */
	.detail-footer {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-top: 24px;
		margin-top: auto;
		color: #71717a;
	}

	.footer-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.08);
	}

	.footer-text {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.04em;
	}
</style>
