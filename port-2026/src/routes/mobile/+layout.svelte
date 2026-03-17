<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';
	import './mobile-layout.css';

	const { children } = $props();

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
</script>

<div class="mobile-shell">
	<main class="mobile-screen">
		<div class="screen-inner">
			{@render children()}
		</div>
	</main>
</div>
