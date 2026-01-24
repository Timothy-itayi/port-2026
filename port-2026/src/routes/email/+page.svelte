<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		gsap.from('.email-content', {
			opacity: 0,
			y: 20,
			duration: 1,
			ease: 'power3.out'
		});
	});
</script>

<svelte:head>
	<title>Email | Timothy Itayi</title>
</svelte:head>

<main class="email-page">
	<div class="email-content">
		<h1>EMAIL</h1>
		<p>Contact information coming soon...</p>
		<button onclick={() => window.history.back()}>GO BACK</button>
	</div>
</main>

<style>
	.email-page {
		min-height: 100vh;
		background: #ffffff;
		color: #1a1a1a;
		padding: 4rem 2rem;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.email-content {
		max-width: 800px;
		margin: 0 auto;
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
	}
</style>
