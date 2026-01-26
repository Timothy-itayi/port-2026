<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';

	let logLines: HTMLElement[] = [];

	const modules = [
		{ id: 'AS1', label: 'VIEW PROJECTS', path: '/mobile/projects', desc: 'Browse portfolio works', feed: 'LD09' },
		{ id: 'AS2', label: 'READ DOSSIER', path: '/mobile/about', desc: 'Personnel file', feed: 'LD09' },
		{ id: 'AS7', label: 'GET RESUME', path: '/mobile/resume', desc: 'Download CV', feed: 'LD09' }
	];

	const typeLine = (element: HTMLElement | null, text: string, duration = 0.6) => {
		if (!element) return;
		element.textContent = '';
		const state = { count: 0 };
		gsap.to(state, {
			count: text.length,
			duration,
			ease: 'none',
			onUpdate: () => {
				element.textContent = text.slice(0, Math.floor(state.count));
			}
		});
	};

	onMount(() => {
		// Welcome sequence
		if (logLines[0]) typeLine(logLines[0], '> Welcome to my portfolio', 0.5);
		gsap.delayedCall(0.6, () => {
			if (logLines[1]) typeLine(logLines[1], '> Building creative solutions', 0.5);
		});
		gsap.delayedCall(1.2, () => {
			if (logLines[2]) typeLine(logLines[2], '> Explore below', 0.4);
		});

		// Animate modules
		gsap.from('.module-link', {
			opacity: 0,
			y: 15,
			duration: 0.4,
			stagger: 0.1,
			delay: 1.6,
			ease: 'power2.out'
		});
	});
</script>

<div class="mobile-home">
	<!-- Frame Header -->
	<div class="frame-header">
		<span class="frame-label">Portfolio</span>
		<span class="frame-line"></span>
	</div>

	<!-- Hero Block -->
	<div class="log-block">
		<div class="log-header">
			<div>
				<h1 class="log-title">Timothy Itayi</h1>
				<div class="log-subtitle">Software Engineer</div>
			</div>
			<div class="data-state">
				<div class="data-label">AVAILABLE</div>
			</div>
		</div>
		<div class="log-content">
			<div class="log-line" bind:this={logLines[0]}></div>
			<div class="log-line" bind:this={logLines[1]}></div>
			<div class="log-line highlight" bind:this={logLines[2]}></div>
		</div>
	</div>

	<!-- Section Divider -->
	<div class="section-divider">
		<span class="section-label">Quick Links</span>
	</div>

	<!-- Module Links -->
	<div class="module-links">
		{#each modules as module}
			<button class="module-link" onclick={() => goto(module.path)}>
				<div class="module-left">
					<div class="module-id-box">{module.id}</div>
				</div>
				<div class="module-right">
					<div class="module-label">{module.label}</div>
					<div class="module-desc">{module.desc}</div>
					<span class="module-arrow">▸</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Status Grid -->
	<div class="status-section">
		<div class="section-label">SYSTEM STATUS</div>
		<div class="status-grid">
			<div class="status-card">
				<span class="status-key">VERSION</span>
				<span class="status-val">2.026</span>
			</div>
			<div class="status-card">
				<span class="status-key">MODE</span>
				<span class="status-val active">MOBILE</span>
			</div>
			<div class="status-card">
				<span class="status-key">STATUS</span>
				<span class="status-val active">ONLINE</span>
			</div>
			<div class="status-card">
				<span class="status-key">UPTIME</span>
				<span class="status-val">∞</span>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="home-footer">
		<span>TIMOTHY ITAYI © 2026</span>
		<div class="footer-dots">
			<span class="fdot"></span>
			<span class="fdot"></span>
			<span class="fdot muted"></span>
		</div>
	</div>
</div>

<style>
	.mobile-home {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-height: 100%;
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

	/* Log Block (Hero) */
	.log-block {
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}

	.log-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20px;
	}

	.log-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #fafafa;
		letter-spacing: -0.02em;
		margin: 0;
		line-height: 1.2;
	}

	.log-subtitle {
		font-size: 0.85rem;
		color: #71717a;
		margin-top: 6px;
		font-weight: 500;
	}

	.data-state {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
	}

	.data-label {
		font-size: 0.7rem;
		font-weight: 600;
		color: #fff;
		background: #8b5cf6;
		padding: 6px 12px;
		border-radius: 20px;
		letter-spacing: 0.04em;
	}

	.log-content {
		padding: 16px;
		background: #141416;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.log-line {
		font-size: 0.95rem;
		color: #06b6d4;
		min-height: 1.4em;
		font-weight: 500;
		line-height: 1.6;
	}

	.log-line.highlight {
		color: #f59e0b;
		font-weight: 600;
	}

	/* Section Divider */
	.section-divider {
		padding: 8px 0;
	}

	.section-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #a1a1aa;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	/* Module Links */
	.module-links {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.module-link {
		display: flex;
		align-items: stretch;
		gap: 0;
		padding: 0;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.module-link:hover {
		transform: translateY(-4px);
		border-color: #8b5cf6;
		box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
	}

	.module-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px;
		background: #141416;
		border-right: 1px solid rgba(255, 255, 255, 0.08);
	}

	.module-id-box {
		width: 40px;
		height: 40px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 10px;
		font-size: 0.75rem;
		font-weight: 700;
		color: #8b5cf6;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.module-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 16px 20px;
		background: transparent;
		border: none;
	}

	.module-label {
		font-size: 1rem;
		font-weight: 600;
		color: #fafafa;
		letter-spacing: 0.02em;
	}

	.module-desc {
		font-size: 0.85rem;
		color: #71717a;
		margin-top: 4px;
		font-weight: 500;
	}

	.module-arrow {
		color: #8b5cf6;
		font-size: 1rem;
		margin-top: 8px;
		transition: transform 0.2s ease;
	}

	.module-link:hover .module-arrow {
		transform: translateX(6px);
	}

	/* Status Section */
	.status-section {
		margin-top: auto;
	}

	.status-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		margin-top: 12px;
	}

	.status-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 16px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
	}

	.status-key {
		font-size: 0.75rem;
		color: #71717a;
		font-weight: 500;
	}

	.status-val {
		font-size: 0.85rem;
		font-weight: 600;
		color: #a1a1aa;
	}

	.status-val.active {
		color: #22c55e;
	}

	/* Footer */
	.home-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.8rem;
		color: #71717a;
		font-weight: 500;
	}

	.footer-dots {
		display: flex;
		gap: 6px;
	}

	.fdot {
		width: 8px;
		height: 8px;
		background: #8b5cf6;
		border-radius: 50%;
	}

	.fdot.muted {
		background: #232326;
	}
</style>
