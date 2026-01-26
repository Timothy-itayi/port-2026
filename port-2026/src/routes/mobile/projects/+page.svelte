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
	<!-- Header -->
	<div class="page-header">
		<div class="header-line">
			<span class="header-icon">◫</span>
			<h1 class="header-title">PROJECTS</h1>
		</div>
		<div class="header-sub">PORTFOLIO ARCHIVE • {projects.length} ENTRIES</div>
	</div>

	<!-- Project List -->
	<div class="projects-list">
		{#each projects as project, i}
			<button 
				class="project-card" 
				onclick={() => handleProjectClick(project.slug)}
			>
				<div class="card-index">#{String(i + 1).padStart(2, '0')}</div>
				<div class="card-content">
					<div class="card-header">
						<span class="card-title">{project.title}</span>
						<span class="card-arrow">▸</span>
					</div>
					<div class="card-meta">
						<span class="meta-author">{project.author}</span>
						<span class="meta-divider">•</span>
						<span class="meta-type">PROJECT</span>
					</div>
					<div class="card-desc">{project.description}</div>
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
		gap: 20px;
		color: #e4e8eb;
		font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
	}

	/* Header */
	.page-header {
		padding-bottom: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.header-line {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.header-icon {
		font-size: 1.3rem;
		color: #7dd3c0;
	}

	.header-title {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin: 0;
		color: #e4e8eb;
	}

	.header-sub {
		font-size: 0.7rem;
		color: rgba(228, 232, 235, 0.45);
		margin-top: 6px;
		letter-spacing: 0.08em;
		font-weight: 500;
	}

	/* Projects List */
	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.project-card {
		display: flex;
		gap: 14px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
		width: 100%;
	}

	.project-card:hover,
	.project-card:active {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.card-index {
		font-size: 0.75rem;
		font-weight: 700;
		color: rgba(125, 211, 192, 0.5);
		min-width: 28px;
		padding-top: 2px;
		font-family: 'SF Mono', monospace;
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: #e4e8eb;
		letter-spacing: 0.02em;
	}

	.card-arrow {
		font-size: 0.9rem;
		color: rgba(228, 232, 235, 0.3);
		transition: all 0.2s ease;
	}

	.project-card:hover .card-arrow,
	.project-card:active .card-arrow {
		transform: translateX(4px);
		color: #7dd3c0;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.7rem;
		color: rgba(228, 232, 235, 0.45);
		font-weight: 500;
	}

	.meta-divider {
		opacity: 0.4;
	}

	.card-desc {
		font-size: 0.8rem;
		color: rgba(228, 232, 235, 0.6);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Footer */
	.page-footer {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-top: 20px;
		color: rgba(228, 232, 235, 0.3);
	}

	.footer-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
	}

	.footer-text {
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		font-weight: 500;
	}
</style>
