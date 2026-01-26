<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import { projects } from '$lib/data/projects.js';

	onMount(() => {
		gsap.from('.project-card', {
			opacity: 0,
			y: 20,
			duration: 0.3,
			stagger: 0.08,
			ease: 'power2.out'
		});
	});

	const handleProjectClick = (slug: string) => {
		goto(`/mobile/projects/${slug}`);
	};
</script>

<div class="mobile-projects">
	<!-- Frame Header -->
	<div class="frame-header">
		<span class="frame-label">Portfolio</span>
		<span class="frame-line"></span>
	</div>

	<!-- Header -->
	<div class="page-header">
		<div class="header-main">
			<div class="header-icon-box">
				<span class="header-icon">◫</span>
			</div>
			<div class="header-text">
				<h1 class="header-title">Projects</h1>
				<div class="header-sub">{projects.length} projects in portfolio</div>
			</div>
		</div>
		<div class="header-status">
			<div class="data-label">Status</div>
			<div class="data-value">Active</div>
		</div>
	</div>

	<!-- Section Divider -->
	<div class="section-divider">
		<span class="section-label">All Projects</span>
		<span class="section-line"></span>
	</div>

	<!-- Project List -->
	<div class="projects-list">
		{#each projects as project, i}
			<button 
				class="project-card" 
				onclick={() => handleProjectClick(project.slug)}
			>
				<div class="card-left">
					<div class="card-index">#{String(i + 1).padStart(2, '0')}</div>
					<div class="card-icon-box">
						<div class="card-icon-inner"></div>
					</div>
				</div>
				<div class="card-content">
					<div class="card-header">
						<span class="card-title">{project.title}</span>
						<div class="card-specs">
							<span class="spec-dot"></span>
							<span class="spec-text">V27-A5</span>
						</div>
					</div>
					<div class="card-meta">
						<span class="meta-author">{project.author}</span>
						<span class="meta-divider">•</span>
						<span class="meta-type">PROJECT</span>
					</div>
					<div class="card-desc">{project.description}</div>
				</div>
				<div class="card-right">
					<div class="load-btn">
						<span class="load-arrow">▸</span>
						<span class="load-text">LOAD></span>
					</div>
				</div>
			</button>
		{/each}
	</div>

	<!-- Footer -->
	<div class="page-footer">
		<span class="footer-line"></span>
		<span class="footer-text">END OF ARCHIVE</span>
		<span class="footer-line"></span>
	</div>
</div>

<style>
	.mobile-projects {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: #fafafa;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		background: #0a0a0b;
	}

	/* Frame Header */
	.frame-header {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.frame-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.frame-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%);
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 20px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.header-main {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.header-icon-box {
		width: 44px;
		height: 44px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 12px;
		display: grid;
		place-items: center;
	}

	.header-icon {
		font-size: 1.4rem;
		color: #8b5cf6;
	}

	.header-text {
		flex: 1;
	}

	.header-title {
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 0;
		color: #fafafa;
	}

	.header-sub {
		font-size: 0.85rem;
		color: #71717a;
		margin-top: 4px;
		font-weight: 500;
	}

	.header-status {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
	}

	.data-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #71717a;
	}

	.data-value {
		font-size: 0.85rem;
		font-weight: 600;
		color: #8b5cf6;
	}

	/* Section Divider */
	.section-divider {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.section-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #a1a1aa;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%);
	}

	/* Projects List */
	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.project-card {
		display: flex;
		gap: 0;
		padding: 0;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
		width: 100%;
		overflow: hidden;
	}

	.project-card:hover {
		border-color: #8b5cf6;
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
	}

	.card-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px;
		background: #141416;
		border-right: 1px solid rgba(255, 255, 255, 0.08);
		gap: 8px;
	}

	.card-index {
		font-size: 0.8rem;
		font-weight: 700;
		color: #8b5cf6;
	}

	.card-icon-box {
		width: 36px;
		height: 36px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 10px;
		display: grid;
		place-items: center;
	}

	.card-icon-inner {
		width: 18px;
		height: 18px;
		background: #8b5cf6;
		border-radius: 50%;
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: #fafafa;
		letter-spacing: 0.01em;
	}

	.card-specs {
		display: none;
	}

	.spec-dot {
		display: none;
	}

	.spec-text {
		display: none;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: #71717a;
		font-weight: 500;
	}

	.meta-divider {
		opacity: 0.4;
	}

	.meta-type {
		color: #8b5cf6;
	}

	.card-desc {
		font-size: 0.9rem;
		color: #a1a1aa;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-right {
		display: flex;
		align-items: center;
		padding: 16px;
		border-left: 1px solid rgba(255, 255, 255, 0.08);
	}

	.load-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.load-arrow {
		font-size: 1.1rem;
		color: #8b5cf6;
		transition: transform 0.2s ease;
	}

	.load-text {
		font-size: 0.65rem;
		font-weight: 600;
		color: #71717a;
		letter-spacing: 0.02em;
	}

	.project-card:hover .load-arrow {
		transform: translateX(4px);
	}

	/* Footer */
	.page-footer {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-top: 18px;
		color: #71717a;
	}

	.footer-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.08);
	}

	.footer-text {
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		font-weight: 600;
	}
</style>
