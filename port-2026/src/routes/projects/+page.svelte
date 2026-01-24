<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let visible = false;

	onMount(() => {
		visible = true;
		gsap.from('.projects-content', {
			opacity: 0,
			y: 20,
			duration: 1,
			ease: 'power3.out'
		});
	});
</script>

<svelte:head>
	<title>Projects | Timothy Itayi</title>
</svelte:head>

<main class="projects-page">
	<div class="projects-content">
		<h1>PROJECTS</h1>
		<div class="placeholder-grid">
			<div class="project-card"></div>
			<div class="project-card"></div>
			<div class="project-card"></div>
		</div>
		<button onclick={() => window.history.back()}>GO BACK</button>
	</div>
</main>

<style>
	.projects-page {
		min-height: 100vh;
		background: #ffffff;
		color: #1a1a1a;
		padding: 4rem 2rem;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.projects-content {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		font-family: 'Courier New', monospace;
		font-size: 3rem;
		letter-spacing: 0.2em;
		border-bottom: 2px solid #1a1a1a;
		padding-bottom: 1rem;
		margin-bottom: 3rem;
	}

	.placeholder-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.project-card {
		height: 200px;
		background: #f5f5f5;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
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
