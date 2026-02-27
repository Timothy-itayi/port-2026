<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';
	import './mobile-layout.css';

	const { children } = $props();

	const navItems = [
		{ label: 'Home', path: '/mobile', icon: '⌂', exact: true },
		{ label: 'Projects', path: '/mobile/projects', icon: '◫', exact: false },
		{ label: 'About', path: '/mobile/about', icon: '◉', exact: true },
		{ label: 'Resume', path: '/mobile/resume', icon: '◈', exact: true }
	];

	let currentPath = $derived($page.url.pathname);

	const getDesktopRoute = (mobilePath: string): string => {
		if (mobilePath === '/mobile') return '/';
		return mobilePath.replace(/^\/mobile/, '');
	};

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
		if (exact) return currentPath === itemPath;
		return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
	};

	const handleNavClick = (path: string) => {
		goto(path);
	};
</script>

<div class="mobile-shell">
	<main class="mobile-screen">
		<div class="screen-inner">
			{@render children()}
		</div>
	</main>

	<nav class="tab-bar">
		{#each navItems as item}
			<button
				class="tab-item"
				class:active={isActive(item.path, item.exact)}
				onclick={() => handleNavClick(item.path)}
				aria-label={item.label}
			>
				<span class="tab-icon">{item.icon}</span>
				<span class="tab-label">{item.label}</span>
			</button>
		{/each}
	</nav>
</div>
