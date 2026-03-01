<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	let resizeHandler: (() => void) | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile/resume', { replaceState: true });
		}
	};

	onMount(() => {
		// Check viewport on mount and redirect if needed
		checkViewportAndRedirect();

		// Debounced resize handler
		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		
		window.addEventListener('resize', resizeHandler);

		gsap.from('.resume-content', {
			opacity: 0,
			y: 20,
			duration: 1,
			ease: 'power3.out'
		});
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

<svelte:head>
	<title>Resume | Timothy Itayi</title>
</svelte:head>

<main class="resume-page">
	<div class="resume-content">
		<h1>RESUME</h1>
		<p>Download my resume for hiring managers.</p>
		<button onclick={() => {
			const link = document.createElement('a');
			link.href = '/Resume_Timothy_Itayi.pdf';
			link.download = 'Resume_Timothy_Itayi.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}}>DOWNLOAD RESUME</button>
		<button onclick={() => window.history.back()}>GO BACK</button>
	</div>
</main>

<style>
	.resume-page {
		min-height: 100vh;
		background: #ffffff;
		color: #1a1a1a;
		padding: 4rem 2rem;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.resume-content {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		font-family: 'Courier New', monospace;
		font-size: 3rem;
		letter-spacing: 0.2em;
		border-bottom: 2px solid #1a1a1a;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
	}

	button {
		padding: 0.8rem 1.5rem;
		background: #1a1a1a;
		color: #ffffff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-family: monospace;
		margin-right: 1rem;
	}
</style>
