<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';

	let terminalLines: HTMLElement[] = [];

	const quickLinks = [
		{ label: 'VIEW PROJECTS', path: '/mobile/projects', desc: 'Browse portfolio works' },
		{ label: 'READ DOSSIER', path: '/mobile/about', desc: 'Personnel file' },
		{ label: 'SEND MESSAGE', path: '/mobile/contact', desc: 'Establish contact' }
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
		// Boot sequence
		if (terminalLines[0]) typeLine(terminalLines[0], '> SYSTEM INITIALIZED', 0.5);
		gsap.delayedCall(0.6, () => {
			if (terminalLines[1]) typeLine(terminalLines[1], '> HANDHELD MODE ACTIVE', 0.5);
		});
		gsap.delayedCall(1.2, () => {
			if (terminalLines[2]) typeLine(terminalLines[2], '> WELCOME, OPERATOR', 0.4);
		});

		// Animate quick links
		gsap.from('.quick-link', {
			opacity: 0,
			y: 20,
			duration: 0.4,
			stagger: 0.1,
			delay: 1.6,
			ease: 'power2.out'
		});
	});
</script>

<div class="mobile-home">
	<!-- Terminal Header -->
	<div class="terminal-block">
		<div class="terminal-header">
			<span class="terminal-title">◉ TERMINAL</span>
			<span class="terminal-status">READY</span>
		</div>
		<div class="terminal-content">
			<div class="terminal-line" bind:this={terminalLines[0]}></div>
			<div class="terminal-line" bind:this={terminalLines[1]}></div>
			<div class="terminal-line highlight" bind:this={terminalLines[2]}></div>
		</div>
	</div>

	<!-- Quick Links -->
	<div class="quick-links">
		<div class="section-label">QUICK ACCESS</div>
		{#each quickLinks as link}
			<button class="quick-link" onclick={() => goto(link.path)}>
				<div class="link-main">
					<span class="link-arrow">▸</span>
					<span class="link-label">{link.label}</span>
				</div>
				<span class="link-desc">{link.desc}</span>
			</button>
		{/each}
	</div>

	<!-- Status Panel -->
	<div class="status-panel">
		<div class="section-label">SYSTEM STATUS</div>
		<div class="status-grid">
			<div class="status-item">
				<span class="status-key">VERSION</span>
				<span class="status-val">2.026</span>
			</div>
			<div class="status-item">
				<span class="status-key">MODE</span>
				<span class="status-val active">MOBILE</span>
			</div>
			<div class="status-item">
				<span class="status-key">STATUS</span>
				<span class="status-val active">ONLINE</span>
			</div>
			<div class="status-item">
				<span class="status-key">UPTIME</span>
				<span class="status-val">∞</span>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="home-footer">
		<span>TIMOTHY ITAYI © 2026</span>
	</div>
</div>

<style>
	.mobile-home {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-height: 100%;
		color: #e4e8eb;
		font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
	}

	/* Terminal Block */
	.terminal-block {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		overflow: hidden;
	}

	.terminal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 14px;
		background: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		font-size: 0.7rem;
	}

	.terminal-title {
		font-weight: 600;
		letter-spacing: 0.06em;
		color: #7dd3c0;
		font-family: 'SF Mono', monospace;
	}

	.terminal-status {
		color: #7dd3c0;
		font-weight: 600;
		padding: 2px 8px;
		background: rgba(125, 211, 192, 0.1);
		border-radius: 4px;
		font-size: 0.6rem;
	}

	.terminal-content {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.terminal-line {
		font-size: 0.9rem;
		font-family: 'SF Mono', monospace;
		min-height: 1.3em;
		color: #7dd3c0;
		font-weight: 500;
	}

	.terminal-line.highlight {
		color: #f0b866;
	}

	/* Quick Links */
	.quick-links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.section-label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: rgba(228, 232, 235, 0.4);
		margin-bottom: 4px;
	}

	.quick-link {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		padding: 16px 18px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
		width: 100%;
	}

	.quick-link:hover,
	.quick-link:active {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.link-main {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.link-arrow {
		color: #7dd3c0;
		font-size: 0.9rem;
	}

	.link-label {
		font-size: 0.95rem;
		font-weight: 600;
		color: #e4e8eb;
		letter-spacing: 0.04em;
	}

	.link-desc {
		font-size: 0.75rem;
		color: rgba(228, 232, 235, 0.5);
		margin-left: 24px;
	}

	/* Status Panel */
	.status-panel {
		margin-top: auto;
	}

	.status-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	.status-item {
		display: flex;
		justify-content: space-between;
		padding: 12px 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
	}

	.status-key {
		font-size: 0.65rem;
		color: rgba(228, 232, 235, 0.4);
		font-weight: 600;
	}

	.status-val {
		font-size: 0.75rem;
		font-weight: 600;
		color: #e4e8eb;
	}

	.status-val.active {
		color: #7dd3c0;
	}

	/* Footer */
	.home-footer {
		text-align: center;
		font-size: 0.6rem;
		color: rgba(228, 232, 235, 0.35);
		padding-top: 12px;
		font-weight: 500;
	}
</style>
