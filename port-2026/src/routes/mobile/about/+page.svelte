<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		gsap.from('.about-section', {
			opacity: 0,
			y: 12,
			duration: 0.3,
			stagger: 0.08,
			ease: 'power2.out'
		});
	});
</script>

<div class="gtv-about">
	<!-- Hero Image -->
	<div class="about-hero about-section">
		<img src="/about/about-image-1.jpeg" alt="Timothy Itayi" class="hero-photo" />
		<div class="hero-gradient"></div>
		<div class="hero-info">
			<h1 class="hero-name">Timothy Itayi</h1>
			<div class="hero-role">Software Engineer</div>
		</div>
	</div>

	<div class="about-body">
		<!-- Bio -->
		<section class="about-section">
			<p class="bio-text">
				Software engineer based in Melbourne, AU. Originally from Zimbabwe, with a journey through New Zealand that shaped a curiosity-driven approach to building things.
			</p>
		</section>

		<!-- Quick Info -->
		<section class="info-grid about-section">
			<div class="info-item">
				<span class="info-label">Location</span>
				<span class="info-value">Melbourne, AU</span>
			</div>
			<div class="info-item">
				<span class="info-label">Origin</span>
				<span class="info-value">Zimbabwe → NZ → AU</span>
			</div>
			<div class="info-item">
				<span class="info-label">Status</span>
				<span class="info-value active">Available</span>
			</div>
			<div class="info-item">
				<span class="info-label">Focus</span>
				<span class="info-value">Full-stack / Creative Dev</span>
			</div>
		</section>

		<!-- Stack -->
		<section class="stack-section about-section">
			<h2 class="section-title">Tech Stack</h2>
			<div class="stack-pills">
				{#each ['TypeScript', 'Svelte', 'Go', 'Rust', 'Python'] as tech}
					<span class="stack-pill">{tech}</span>
				{/each}
			</div>
		</section>

		<!-- Known For -->
		<section class="known-section about-section">
			<h2 class="section-title">Known for</h2>
			<div class="known-list">
				<span class="known-item">Excessive refactoring</span>
				<span class="known-item">Documentation unprompted</span>
				<span class="known-item">Friday deploys</span>
				<span class="known-item">Descriptive variable names</span>
			</div>
		</section>

		<!-- Interests -->
		<section class="interests-section about-section">
			<h2 class="section-title">Interests</h2>
			<p class="interests-text">F1, endurance racing, UFC, boxing, books, tinkering</p>
		</section>

		<!-- Philosophy -->
		<section class="philosophy about-section">
			<p class="philosophy-text">
				Best ideas come from curiosity and willingness to tinker, fail, and try again.
			</p>
		</section>
	</div>
</div>

<style>
	.gtv-about {
		display: flex;
		flex-direction: column;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	/* ===== HERO ===== */
	.about-hero {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		overflow: hidden;
	}

	.hero-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			#0a0a0a 0%,
			rgba(10, 10, 10, 0.7) 40%,
			transparent 100%
		);
	}

	.hero-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
	}

	.hero-name {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 4px;
		color: #fff;
	}

	.hero-role {
		font-size: 0.9rem;
		color: #999;
		font-weight: 500;
	}

	/* ===== BODY ===== */
	.about-body {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.bio-text {
		font-size: 0.95rem;
		color: #bbb;
		line-height: 1.6;
		margin: 0;
	}

	/* ===== INFO GRID ===== */
	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 14px;
		overflow: hidden;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		background: #1a1a1a;
	}

	.info-label {
		font-size: 0.7rem;
		color: #666;
		font-weight: 500;
	}

	.info-value {
		font-size: 0.85rem;
		color: #e8e8e8;
		font-weight: 500;
	}

	.info-value.active {
		color: #34d399;
	}

	/* ===== STACK ===== */
	.section-title {
		font-size: 1rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 0 0 12px;
	}

	.stack-section,
	.known-section,
	.interests-section {
		display: flex;
		flex-direction: column;
	}

	.stack-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.stack-pill {
		padding: 8px 16px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.08);
		font-size: 0.82rem;
		font-weight: 500;
		color: #bbb;
	}

	/* ===== KNOWN FOR ===== */
	.known-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-radius: 14px;
		overflow: hidden;
	}

	.known-item {
		padding: 14px 16px;
		background: #1a1a1a;
		font-size: 0.85rem;
		color: #bbb;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.known-item:last-child {
		border-bottom: none;
	}

	/* ===== INTERESTS ===== */
	.interests-text {
		font-size: 0.9rem;
		color: #999;
		line-height: 1.5;
		margin: 0;
	}

	/* ===== PHILOSOPHY ===== */
	.philosophy {
		padding: 20px;
		background: #1a1a1a;
		border-radius: 14px;
	}

	.philosophy-text {
		font-size: 0.9rem;
		font-style: italic;
		color: #999;
		line-height: 1.6;
		margin: 0;
		text-align: center;
	}
</style>
