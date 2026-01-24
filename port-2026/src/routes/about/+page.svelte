<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		gsap.from('.zine-paper', {
			scale: 0.8,
			opacity: 0,
			duration: 1,
			ease: 'back.out(1.4)'
		});
	});
</script>

<svelte:head>
	<title>About | Timothy Itayi</title>
</svelte:head>

<main class="about-inspect-page">
	<div class="background-dim"></div>
	
	<div class="zine-paper">
		<div class="zine-content">
			<div class="zine-header-compact">
				<div class="zine-top-right-image">
					<img src="/about/top-right-corner.jpg" alt="Top right decoration" />
				</div>
			</div>
			
			<div class="zine-subheader-compact">SYSTEM ENGINEER / CREATIVE DEVELOPER</div>
			
			<div class="zine-body">
				<div class="zine-left-compact">
					<div class="zine-fig-label">[fig.1.1]</div>
					<div class="zine-image-container">
						<div class="zine-photo-wrapper">
							<img src="/about/about-image-1.jpeg" alt="Timothy" class="zine-photo" />
							<div class="stipple-overlay"></div>
						</div>
					</div>
					<div class="zine-caption">Timothy</div>
				</div>
				
				<div class="zine-right">
					<div class="zine-headline">A MASTER SPEAKS</div>
					<div class="zine-text-content">
						<p>
							If you have woken up in the slightest I am sure that you know by now that the world is not run by 
							government, shadow governments or any "ments" of any kind. The world is run by an elite group 
							of engineers who communicate telepathically and carry the title master.
						</p>
						<p>
							We were granted the rare opportunity to interview one about the groups plans on the direction 
							of the world moving forward and here is a scary hint... You haven't heard about any engineers 
							getting the virus... according to our master that is not just a coincidence.
						</p>
						<p>
							Will they share their immunity with us or will... [READ MORE ON PAGE 4]
						</p>
					</div>
				</div>
			</div>
			
			<div class="zine-footer">
				Don't believe the news the world is doing fine!
			</div>
		</div>

		<button class="back-btn" onclick={() => window.history.back()}>
			[ CLOSE ]
		</button>
	</div>
</main>

<style>
	.about-inspect-page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background: #0a0a0a;
		padding: 2rem;
		position: relative;
		overflow: hidden;
	}

	.background-dim {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
		pointer-events: none;
	}

	.zine-paper {
		position: relative;
		width: min(90vw, 800px);
		background: #fff;
		color: #000;
		padding: 2.5rem;
		box-shadow: 
			0 20px 50px rgba(0,0,0,0.5),
			20px 20px 0 rgba(255,255,255,0.05);
		font-family: 'Courier New', monospace;
		border: 2px solid #000;
	}

	.zine-content {
		border: 4px double #000;
		padding: 1.5rem;
		position: relative;
	}

	.zine-header-compact {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.5rem;
	}

	.zine-top-right-image {
		width: 80px; /* Slightly larger for inspected view */
		height: 80px;
		border: 2px solid #000;
		overflow: hidden;
		background: #fff;
	}

	.zine-top-right-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: contrast(1.1);
	}

	.zine-subheader-compact {
		font-size: 0.9rem;
		text-align: center;
		background: #000;
		color: #fff;
		padding: 0.2rem;
		margin-bottom: 1.5rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.zine-body {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.zine-left-compact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 2px solid #000;
		padding: 8px;
		align-self: flex-start; /* Prevents stretching too tall */
	}

	.zine-fig-label {
		font-size: 0.8rem;
		font-weight: bold;
	}

	.zine-image-container {
		border: 2px solid #000;
		padding: 4px;
		background: #fff;
	}

	.zine-photo-wrapper {
		width: 100%;
		aspect-ratio: 4/5;
		position: relative;
		overflow: hidden;
		background: #eee;
	}

	.zine-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: contrast(1.2) brightness(0.95);
		display: block;
	}

	.stipple-overlay {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(#000 1.2px, transparent 1px);
		background-size: 4px 4px;
		opacity: 0.15;
		z-index: 2;
		mix-blend-mode: multiply;
		pointer-events: none;
	}

	.zine-caption {
		font-size: 0.7rem;
		text-align: center;
		line-height: 1.2;
		border-top: 1px dashed #000;
		padding-top: 0.5rem;
	}

	.zine-headline {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 900;
		margin-bottom: 1.5rem;
		line-height: 0.9;
		letter-spacing: -1px;
	}

	.zine-text-content {
		font-size: 0.9rem;
		line-height: 1.4;
		text-align: justify;
	}

	.zine-text-content p {
		margin-bottom: 1rem;
	}

	.zine-footer {
		border-top: 2px solid #000;
		padding-top: 0.5rem;
		text-align: center;
		font-size: 0.8rem;
		font-weight: bold;
		font-style: italic;
	}

	.back-btn {
		position: absolute;
		bottom: -3rem;
		left: 50%;
		transform: translateX(-50%);
		background: none;
		border: none;
		color: #fff;
		font-family: inherit;
		cursor: pointer;
		font-size: 1rem;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.back-btn:hover {
		opacity: 1;
	}

	@media (max-width: 600px) {
		.zine-body {
			grid-template-columns: 1fr;
		}
		
		.zine-title {
			font-size: 3rem;
		}
	}
</style>
