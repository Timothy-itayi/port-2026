<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import './mobile-panel.css';

	let logLineOne: HTMLElement;
	let logLineTwo: HTMLElement;
	let logLineThree: HTMLElement;
	let activeRoute: string | null = null;

	const modules = [
		{ id: 'MH-01', label: 'HOME', path: '/mobile', spec: 'V27-A5', feed: 'LD09' },
		{ id: 'MH-02', label: 'PROJECTS', path: '/mobile/projects', spec: 'Q7-F3', feed: 'LD09' },
		{ id: 'MH-03', label: 'ABOUT', path: '/mobile/about', spec: 'Q2-F7', feed: 'LD09' },
		{ id: 'MH-04', label: 'RESUME', path: '/mobile/resume', spec: 'V27-A5', feed: 'LD09' }
	];

	const typeLine = (element: HTMLElement | null, text: string, duration = 0.8) => {
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

	const handleModuleClick = async (module: typeof modules[0]) => {
		activeRoute = module.label;
		
		typeLine(logLineThree, `> LOADING ${module.id}...`, 0.3);
		
		await new Promise(resolve => setTimeout(resolve, 350));
		
		goto(module.path);
	};

	onMount(() => {
		typeLine(logLineOne, '> Welcome to my portfolio', 0.5);
		gsap.delayedCall(0.6, () => typeLine(logLineTwo, '> Building creative solutions', 0.5));
		gsap.delayedCall(1.2, () => typeLine(logLineThree, '> Explore below', 0.4));
	});
</script>

<div class="mobile-panel">
	<!-- Frame Header -->
	<div class="frame-header">
		<span class="frame-title">PORTFOLIO</span>
		<span class="frame-version">v2.026</span>
	</div>

	<!-- Hero Section -->
	<div class="system-log">
		<div class="log-header">
			<div>
				<h1 class="log-title">Timothy Itayi</h1>
				<div class="log-subtitle">Software Engineer</div>
			</div>
			<div class="data-state">
				<div class="data-state-row">
					<span>AVAILABLE</span>
				</div>
			</div>
		</div>
		<div class="log-content">
			<div class="log-line" bind:this={logLineOne}></div>
			<div class="log-line" bind:this={logLineTwo}></div>
			<div class="log-line highlight" bind:this={logLineThree}></div>
		</div>
	</div>

	<!-- Section Divider -->
	<div class="section-divider">
		<span class="section-label">OUTPUT MODULES</span>
		<span class="section-line"></span>
	</div>

	<!-- Module Grid -->
	<div class="module-grid">
		{#each modules as module}
			<button
				class="module-card"
				class:active={activeRoute === module.label}
				onclick={() => handleModuleClick(module)}
			>
				<div class="module-header">
					<div>
						<div class="module-title">{module.label}</div>
					</div>
					<div class="module-specs">
						<div class="spec-row">
							<span class="spec-dot"></span>
						</div>
					</div>
				</div>
				<div class="module-icon-area">
					<div class="module-icon">
						<div class="module-icon-inner"></div>
					</div>
				</div>
				<div class="module-footer">
					<div class="module-load-btn">
						<span class="load-arrow">▸</span>
						<span>View</span>
					</div>
				</div>
			</button>
		{/each}
	</div>

	<!-- Status Panel -->
	<div class="status-panel">
		<div class="status-title">SYSTEM STATUS</div>
		<div class="status-grid">
			<div class="status-item">
				<span class="status-dot-indicator"></span>
				<span class="status-item-label">STATUS</span>
				<span class="status-item-value online">ONLINE</span>
			</div>
			<div class="status-item">
				<span class="status-item-label">MODE</span>
				<span class="status-item-value">MOBILE</span>
			</div>
			<div class="status-item">
				<span class="status-item-label">UPTIME</span>
				<span class="status-item-value">∞</span>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="panel-footer">
		<span class="footer-text">TIMOTHY ITAYI © 2026</span>
		<div class="footer-indicators">
			<span class="footer-dot"></span>
			<span class="footer-dot"></span>
			<span class="footer-dot muted"></span>
		</div>
	</div>
</div>
