<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';

	let resizeHandler: (() => void) | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile/about', { replaceState: true });
		}
	};

	onMount(() => {
		checkViewportAndRedirect();

		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};

		window.addEventListener('resize', resizeHandler);

		gsap.from('.about-card', {
			opacity: 0,
			y: 30,
			duration: 0.7,
			ease: 'power3.out'
		});

		gsap.from('.section', {
			opacity: 0,
			y: 12,
			duration: 0.4,
			stagger: 0.08,
			delay: 0.35,
			ease: 'power2.out'
		});
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

<svelte:head>
	<title>About | Timothy Itayi</title>
</svelte:head>

<main class="about-page">
	<div class="about-card">
		<header class="card-header">
			<div class="header-left">
				<h1>Timothy Itayi</h1>
				<p class="role">Full-Stack Developer</p>
				<p class="location">Melbourne, Australia</p>
			</div>
			<div class="header-right">
				<img src="/about/about-image-1.jpeg" alt="Timothy Itayi" class="profile-photo" />
			</div>
		</header>

		<div class="card-body">
			<div class="section">
				<h2>Summary</h2>
				<p>
					Full-stack developer with 3 years of experience, trained through a rigorous
					Dev Academy bootcamp and Harvard CS50 certification. While skilled across the stack,
					I gravitate toward frontend development, building polished, performant interfaces for web and
					mobile using React and React Native. Based in Melbourne, eager to contribute to
					innovative teams leveraging agile workflows and CI/CD practices.
				</p>
			</div>

			<div class="two-col">
				<div class="section">
					<h2>Core Stack</h2>
					<ul class="stack-list">
						<li><span class="stack-category">Frontend</span> React, React Native, TypeScript, Next.js, SvelteKit</li>
						<li><span class="stack-category">Backend</span> Node.js, AWS (Lambda, DynamoDB, S3), PostgreSQL</li>
						<li><span class="stack-category">Tooling</span> Git, CI/CD, Agile workflows, serverless architectures</li>
					</ul>
				</div>

				<div class="section">
					<h2>What I Do Most</h2>
					<ul class="focus-list">
						<li>Building responsive, accessible web interfaces with React</li>
						<li>Building mobile apps with React Native</li>
						<li>Complex state management and real-time data sync</li>
						<li>End-to-end feature delivery with agile and CI/CD</li>
					</ul>
				</div>
			</div>

		
		</div>

		<footer class="card-footer">
			<span class="footer-note">Eager to contribute to innovative teams in Melbourne or Remote</span>
			<button class="back-btn" onclick={() => window.history.back()}>Go Back</button>
		</footer>
	</div>
</main>

<style>
	.about-page {
		height: 100vh;
		display: grid;
		place-items: center;
		background: #0a0a0a;
		padding: 1.5rem 1rem;
		overflow: hidden;
	}

	.about-card {
		position: relative;
		width: min(95vw, 820px);
		background: #ffffff;
		color: #1a1a1a;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		border-radius: 2px;
		display: flex;
		flex-direction: column;
	}

	/* ========== HEADER ========== */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 2rem;
		border-bottom: 2px solid #1a1a1a;
	}

	.header-left {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		margin: 0;
		line-height: 1.2;
	}

	.role {
		font-size: 0.9rem;
		font-weight: 500;
		color: #444;
		margin: 0;
	}

	.location {
		font-size: 0.8rem;
		font-weight: 400;
		color: #777;
		margin: 0.15rem 0 0 0;
	}

	.profile-photo {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 50%;
		border: 2px solid #1a1a1a;
		flex-shrink: 0;
	}

	/* ========== BODY ========== */
	.card-body {
		padding: 1.25rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	h2 {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #1a1a1a;
		margin: 0;
		padding-bottom: 0.3rem;
		border-bottom: 1px solid #e0e0e0;
	}

	p {
		font-size: 0.85rem;
		line-height: 1.6;
		color: #333;
		margin: 0;
	}

	/* ========== TWO COLUMN ========== */
	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	/* ========== STACK LIST ========== */
	.stack-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.stack-list li {
		font-size: 0.82rem;
		line-height: 1.45;
		color: #333;
	}

	.stack-category {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: #1a1a1a;
		color: #fff;
		padding: 1px 5px;
		border-radius: 2px;
		margin-right: 0.4rem;
		vertical-align: middle;
	}

	/* ========== FOCUS LIST ========== */
	.focus-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.focus-list li {
		font-size: 0.82rem;
		line-height: 1.45;
		color: #333;
		padding-left: 1rem;
		position: relative;
	}

	.focus-list li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: #999;
	}

	/* ========== FOOTER ========== */
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border-top: 2px solid #1a1a1a;
		background: #fafafa;
	}

	.footer-note {
		font-size: 0.8rem;
		color: #888;
		font-style: italic;
	}

	.back-btn {
		background: #fff;
		color: #1a1a1a;
		border: 1px solid #1a1a1a;
		padding: 0.45rem 1.1rem;
		font-size: 0.8rem;
		font-weight: 600;
		border-radius: 2px;
		cursor: pointer;
		transition: opacity 0.2s;
		font-family: inherit;
	}

	.back-btn:hover {
		opacity: 0.75;
	}

	/* ========== RESPONSIVE ========== */
	@media (max-width: 650px) {
		.card-header {
			flex-direction: column-reverse;
			gap: 0.75rem;
			align-items: flex-start;
			padding: 1rem 1.25rem;
		}

		.card-body {
			padding: 1rem 1.25rem;
		}

		.two-col {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.card-footer {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
			padding: 1rem 1.25rem;
		}
	}
</style>
