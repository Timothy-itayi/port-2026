<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import './mobile-panel.css';

	let screenLineOne: HTMLElement;
	let screenLineTwo: HTMLElement;
	let screenLineThree: HTMLElement;
	let activeRoute: string | null = null;

	const routes = [
		{ label: 'HOME', path: '/mobile', icon: '⌂', desc: 'Main dashboard' },
		{ label: 'PROJECTS', path: '/mobile/projects', icon: '◫', desc: 'View portfolio' },
		{ label: 'ABOUT', path: '/mobile/about', icon: '◉', desc: 'Learn more' },
		{ label: 'CONTACT', path: '/mobile/contact', icon: '◈', desc: 'Get in touch' }
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

	const handleNavClick = async (route: typeof routes[0]) => {
		activeRoute = route.label;
		
		typeLine(screenLineThree, `> NAVIGATING...`, 0.3);
		
		await new Promise(resolve => setTimeout(resolve, 350));
		
		goto(route.path);
	};

	onMount(() => {
		typeLine(screenLineOne, '> SYSTEM INITIALIZED', 0.5);
		gsap.delayedCall(0.6, () => typeLine(screenLineTwo, '> HANDHELD MODE ACTIVE', 0.5));
		gsap.delayedCall(1.2, () => typeLine(screenLineThree, '> WELCOME, OPERATOR', 0.4));
	});
</script>

<div class="mobile-panel">
	<!-- Terminal Screen -->
	<div class="terminal-container">
		<div class="terminal-header">
			<div class="terminal-dots">
				<span class="dot green"></span>
				<span class="dot amber"></span>
				<span class="dot red"></span>
			</div>
			<span class="terminal-title">TERMINAL</span>
			<span class="terminal-status">READY</span>
		</div>
		<div class="terminal-screen">
			<div class="screen-line" bind:this={screenLineOne}></div>
			<div class="screen-line" bind:this={screenLineTwo}></div>
			<div class="screen-line prompt" bind:this={screenLineThree}>
				<span class="cursor"></span>
			</div>
		</div>
	</div>

	<!-- Quick Access Label -->
	<div class="section-label">
		<span class="label-text">QUICK ACCESS</span>
		<span class="label-line"></span>
	</div>

	<!-- Navigation Grid -->
	<div class="nav-grid">
		{#each routes as route}
			<button
				class="nav-card"
				class:active={activeRoute === route.label}
				onclick={() => handleNavClick(route)}
			>
				<div class="card-icon">{route.icon}</div>
				<div class="card-content">
					<span class="card-label">{route.label}</span>
					<span class="card-desc">{route.desc}</span>
				</div>
				<span class="card-arrow">▸</span>
			</button>
		{/each}
	</div>

	<!-- System Status -->
	<div class="status-bar">
		<div class="status-item">
			<span class="status-dot online"></span>
			<span class="status-label">STATUS</span>
			<span class="status-value">ONLINE</span>
		</div>
		<div class="status-item">
			<span class="status-label">MODE</span>
			<span class="status-value">MOBILE</span>
		</div>
		<div class="status-item">
			<span class="status-label">UPTIME</span>
			<span class="status-value">∞</span>
		</div>
	</div>

	<!-- Footer -->
	<div class="panel-footer">
		<span class="footer-text">TIMOTHY ITAYI © 2026</span>
	</div>
</div>
