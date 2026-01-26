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
		color: #e4e8eb;
		min-height: 100%;
		font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
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
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 10px 14px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.back-btn:hover,
	.back-btn:active {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.back-arrow {
		color: #7dd3c0;
		font-size: 1rem;
	}

	.back-text {
		color: #e4e8eb;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	.nav-status {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: linear-gradient(135deg, #6ee7b7 0%, #34d399 100%);
		animation: softPulse 3s infinite;
	}

	@keyframes softPulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	.status-text {
		font-size: 0.65rem;
		font-weight: 600;
		color: rgba(228, 232, 235, 0.45);
		letter-spacing: 0.08em;
	}

	/* Header */
	.project-header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-id {
		font-size: 0.7rem;
		font-weight: 500;
		color: rgba(228, 232, 235, 0.4);
		letter-spacing: 0.08em;
		font-family: 'SF Mono', monospace;
	}

	.project-year {
		font-size: 0.75rem;
		font-weight: 600;
		color: #7dd3c0;
		background: rgba(125, 211, 192, 0.12);
		padding: 4px 10px;
		border-radius: 6px;
	}

	.project-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #e4e8eb;
	}

	.project-author {
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(228, 232, 235, 0.5);
		letter-spacing: 0.06em;
	}

	/* Image */
	.project-image {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.image-frame {
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.02);
		padding: 16px;
		aspect-ratio: 16/10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-frame img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
	}

	.image-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.65rem;
		font-weight: 500;
		color: rgba(228, 232, 235, 0.35);
		letter-spacing: 0.08em;
	}

	.label-icon {
		color: #7dd3c0;
	}

	/* Metadata Section */
	.project-meta {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
	}

	.meta-header,
	.content-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.section-icon {
		color: #7dd3c0;
		font-size: 0.9rem;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: rgba(228, 232, 235, 0.7);
	}

	.meta-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meta-label {
		font-size: 0.65rem;
		font-weight: 500;
		color: rgba(228, 232, 235, 0.4);
		letter-spacing: 0.08em;
	}

	.meta-value {
		font-size: 0.95rem;
		font-weight: 600;
		color: #e4e8eb;
	}

	.tech-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.tech-label {
		font-size: 0.65rem;
		font-weight: 500;
		color: rgba(228, 232, 235, 0.4);
		letter-spacing: 0.08em;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tech-tag {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 6px 10px;
		border: 1px solid rgba(125, 211, 192, 0.25);
		border-radius: 8px;
		color: #7dd3c0;
		background: rgba(125, 211, 192, 0.08);
	}

	/* Content Section */
	.project-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.lead-text {
		font-size: 1rem;
		line-height: 1.6;
		font-weight: 500;
		color: #e4e8eb;
		padding: 16px;
		border-left: 3px solid #7dd3c0;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 0 10px 10px 0;
	}

	.content-body {
		font-size: 0.9rem;
		line-height: 1.7;
		color: rgba(228, 232, 235, 0.75);
	}

	.content-body :global(p) {
		margin: 0 0 14px 0;
	}

	.content-body :global(h3) {
		margin: 20px 0 10px 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #e4e8eb;
		letter-spacing: 0.04em;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		padding-bottom: 6px;
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
		padding: 16px 20px;
		border-radius: 12px;
		font-family: inherit;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, #7dd3c0 0%, #5ebc9a 100%);
		border: none;
		color: #12161c;
	}

	.action-btn.primary:hover,
	.action-btn.primary:active {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(125, 211, 192, 0.3);
	}

	.action-btn.secondary {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #e4e8eb;
	}

	.action-btn.secondary:hover,
	.action-btn.secondary:active {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.btn-icon {
		font-size: 1rem;
	}

	.btn-text {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.08em;
	}

	/* Footer */
	.detail-footer {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-top: 20px;
		margin-top: auto;
		color: rgba(228, 232, 235, 0.3);
	}

	.footer-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
	}

	.footer-text {
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.08em;
	}
</style>
