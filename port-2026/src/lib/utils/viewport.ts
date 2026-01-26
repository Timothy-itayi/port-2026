import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Breakpoints
export const BREAKPOINTS = {
	mobile: 640,
	tablet: 1024,
	desktop: 1280
} as const;

// Raw width store
const createViewportStore = () => {
	const width = writable(browser ? window.innerWidth : 1280);
	const height = writable(browser ? window.innerHeight : 800);

	if (browser) {
		let resizeTimer: ReturnType<typeof setTimeout>;
		
		const handleResize = () => {
			// Debounce resize events
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				width.set(window.innerWidth);
				height.set(window.innerHeight);
			}, 100);
		};

		window.addEventListener('resize', handleResize);
		
		// Also listen for orientation changes on mobile
		window.addEventListener('orientationchange', () => {
			// Small delay to let the browser settle
			setTimeout(() => {
				width.set(window.innerWidth);
				height.set(window.innerHeight);
			}, 150);
		});
	}

	return { width, height };
};

export const viewport = createViewportStore();

// Derived stores for easy breakpoint checks
export const isMobile = derived(viewport.width, ($width) => $width < BREAKPOINTS.mobile);
export const isTablet = derived(viewport.width, ($width) => $width >= BREAKPOINTS.mobile && $width < BREAKPOINTS.tablet);
export const isDesktop = derived(viewport.width, ($width) => $width >= BREAKPOINTS.tablet);

// Combined device type
export const deviceType = derived(viewport.width, ($width) => {
	if ($width < BREAKPOINTS.mobile) return 'mobile';
	if ($width < BREAKPOINTS.tablet) return 'tablet';
	return 'desktop';
});

// Orientation
export const isLandscape = derived(
	[viewport.width, viewport.height],
	([$width, $height]) => $width > $height
);

// Helper to check if we should show mobile UI
// This is more generous - includes small tablets in portrait
export const showMobileUI = derived(viewport.width, ($width) => $width < BREAKPOINTS.tablet);

// Helper to get the mobile route equivalent for a desktop route
export const getMobileRoute = (desktopPath: string): string => {
	if (desktopPath === '/') return '/mobile';
	return '/mobile' + desktopPath;
};

// Helper to get the desktop route equivalent for a mobile route
export const getDesktopRoute = (mobilePath: string): string => {
	if (mobilePath === '/mobile') return '/';
	return mobilePath.replace(/^\/mobile/, '');
};
