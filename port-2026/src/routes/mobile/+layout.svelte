<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';
	import './mobile-layout.css';

	const { children } = $props();
	let menuOpen = $state(false);

	const navItems = [
		{ label: 'HOME', path: '/mobile', icon: '⌂', id: 'MH-01', exact: true },
		{ label: 'PROJECTS', path: '/mobile/projects', icon: '◫', id: 'MH-02', exact: false },
		{ label: 'ABOUT', path: '/mobile/about', icon: '◉', id: 'MH-03', exact: true },
		{ label: 'RESUME', path: '/mobile/resume', icon: '◈', id: 'MH-04', exact: true }
	];

	let currentPath = $derived($page.url.pathname);

	// Map mobile routes to their desktop equivalents
	const getDesktopRoute = (mobilePath: string): string => {
		if (mobilePath === '/mobile') return '/';
		return mobilePath.replace(/^\/mobile/, '');
	};

	// Check viewport and redirect to desktop if needed
	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth >= BREAKPOINTS.tablet) {
			const path = $page.url.pathname;
			const desktopRoute = getDesktopRoute(path);
			goto(desktopRoute, { replaceState: true });
		}
	};

	let resizeHandler: () => void;

	onMount(() => {
		checkViewportAndRedirect();
		
		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		
		window.addEventListener('resize', resizeHandler);
		window.addEventListener('orientationchange', () => {
			setTimeout(checkViewportAndRedirect, 150);
		});
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});

	const isActive = (itemPath: string, exact: boolean): boolean => {
		if (exact) {
			return currentPath === itemPath;
		}
		return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
	};

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};

	const handleNavClick = (path: string) => {
		menuOpen = false;
		goto(path);
	};

	// Get current page title
	const getCurrentPageTitle = (path: string): string => {
		if (path === '/mobile') return 'HOME';
		if (path.startsWith('/mobile/projects')) return 'PROJECTS';
		if (path === '/mobile/about') return 'ABOUT';
		if (path === '/mobile/resume') return 'RESUME';
		return 'PORTFOLIO';
	};
</script>

<div class="mobile-shell" class:menu-open={menuOpen}>
	<!-- Header with Hamburger -->
	<header class="mobile-header">
		<button class="hamburger-btn" onclick={toggleMenu} aria-label="Toggle menu">
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>
		<div class="header-center">
			<span class="header-title">{getCurrentPageTitle(currentPath)}</span>
		</div>
		<div class="header-right">
			<div class="status-indicator">
				<span class="status-dot"></span>
				<span class="status-text">ONLINE</span>
			</div>
		</div>
	</header>

	<!-- Slide-out Navigation Menu -->
	<nav class="slide-menu" class:open={menuOpen}>
		<div class="menu-header">
			<div class="menu-brand">
				<span class="brand-icon">◉</span>
				<div class="brand-text">
					<span class="brand-name">TIMOTHY ITAYI</span>
					<span class="brand-sub">PORTFOLIO v2.026</span>
				</div>
			</div>
			<button class="close-btn" onclick={toggleMenu} aria-label="Close menu">✕</button>
		</div>
		
		<div class="menu-items">
			{#each navItems as item}
				<button
					class="menu-item"
					class:active={isActive(item.path, item.exact)}
					onclick={() => handleNavClick(item.path)}
				>
					<span class="menu-icon">{item.icon}</span>
					<div class="menu-text">
						<span class="menu-label">{item.label}</span>
						<span class="menu-id">{item.id}</span>
					</div>
					<span class="menu-arrow">▸</span>
				</button>
			{/each}
		</div>

		<div class="menu-footer">
			<div class="menu-status">
				<div class="status-row">
					<span class="status-key">MODE</span>
					<span class="status-value">MOBILE</span>
				</div>
				<div class="status-row">
					<span class="status-key">STATUS</span>
					<span class="status-value online">ACTIVE</span>
				</div>
			</div>
			<div class="menu-copyright">© 2026 TIMOTHY ITAYI</div>
		</div>
	</nav>

	<!-- Menu Overlay -->
	{#if menuOpen}
		<button class="menu-overlay" onclick={toggleMenu} aria-label="Close menu"></button>
	{/if}

	<!-- Main Content Area -->
	<main class="mobile-screen">
		<div class="screen-inner">
			{@render children()}
		</div>
	</main>

	<!-- Minimal Bottom Bar -->
	<footer class="mobile-bottom-bar">
		<div class="bottom-left">
			<span class="bottom-brand">TI-2026</span>
		</div>
		<div class="bottom-center">
			<div class="progress-dots">
				{#each navItems as item}
					<button 
						class="dot" 
						class:active={isActive(item.path, item.exact)}
						onclick={() => handleNavClick(item.path)}
						aria-label={item.label}
					></button>
				{/each}
			</div>
		</div>
		<div class="bottom-right">
			<span class="battery-icon">▮▮▯</span>
		</div>
	</footer>
</div>
