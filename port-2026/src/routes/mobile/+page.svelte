<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="welcome-screen">
	<div class="welcome-inner">
		<div class="welcome-photo">
			<img src="/about/about-image-1.jpeg" alt="Timothy Itayi" loading="eager" onload={(e) => e.currentTarget.classList.add('loaded')} />
		</div>

		<div class="welcome-intro">
			<h1 class="welcome-name">Timothy Itayi</h1>
			<p class="welcome-role">Full-Stack Developer</p>
			<p class="welcome-location">Melbourne, Australia</p>
		</div>

		<p class="welcome-pitch">
			I build with React, React Native, TypeScript, and Next.js.
			Passionate about improving and always learning.
		</p>

		<div class="welcome-stack">
			<div class="stack-group">
				<span class="stack-label">Frontend</span>
				<div class="stack-items">
					<span class="stack-chip">React</span>
					<span class="stack-chip">React Native</span>
					<span class="stack-chip">TypeScript</span>
					<span class="stack-chip">Next.js</span>
					<span class="stack-chip">SvelteKit</span>
				</div>
			</div>
			<div class="stack-group">
				<span class="stack-label">Backend</span>
				<div class="stack-items">
					<span class="stack-chip">Node.js</span>
					<span class="stack-chip">AWS</span>
					<span class="stack-chip">PostgreSQL</span>
				</div>
			</div>
		</div>

		<div class="welcome-training">
			<span class="detail-label">Training</span> Dev Academy, Harvard CS50
		</div>

		<div class="welcome-actions">
			<button class="welcome-cta" onclick={() => goto('/mobile/projects')}>
				View Projects
			</button>
			<a class="welcome-resume" href="/Resume_Timothy_itayi.pdf" download="Resume_Timothy_Itayi.pdf">
				Resume
			</a>
		</div>
	</div>
</div>

<style>
	.welcome-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100%;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		padding: 3rem 1.5rem;
	}

	.welcome-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
		max-width: 340px;
	}

	.welcome-photo {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid rgba(255, 255, 255, 0.12);
	}

	.welcome-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.welcome-photo :global(img.loaded) {
		opacity: 1;
	}

	.welcome-intro {
		text-align: center;
	}

	.welcome-name {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0;
		color: #fff;
		letter-spacing: -0.01em;
	}

	.welcome-role {
		font-size: 0.85rem;
		font-weight: 500;
		color: #999;
		margin: 0.2rem 0 0;
	}

	.welcome-location {
		font-size: 0.78rem;
		font-weight: 400;
		color: #666;
		margin: 0.15rem 0 0;
	}

	.welcome-pitch {
		font-size: 0.84rem;
		line-height: 1.6;
		color: #aaa;
		margin: 0;
		text-align: center;
	}

	.welcome-stack {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		padding: 1rem 0;
	}

	.stack-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.stack-label {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #666;
	}

	.stack-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.stack-chip {
		font-size: 0.75rem;
		font-weight: 500;
		color: #ccc;
		background: rgba(255, 255, 255, 0.08);
		padding: 3px 10px;
		border-radius: 4px;
	}

	.welcome-training {
		font-size: 0.8rem;
		color: #999;
		width: 100%;
	}

	.detail-label {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 6px;
		border-radius: 3px;
		margin-right: 0.4rem;
		vertical-align: middle;
	}

	.welcome-actions {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		width: 100%;
		margin-top: 0.25rem;
	}

	.welcome-cta {
		width: 100%;
		padding: 0.85rem;
		background: #fff;
		color: #0a0a0a;
		border: none;
		border-radius: 10px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
	}

	.welcome-resume {
		display: block;
		width: 100%;
		padding: 0.85rem;
		background: transparent;
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		font-size: 0.9rem;
		font-weight: 600;
		text-align: center;
		text-decoration: none;
		font-family: inherit;
		box-sizing: border-box;
	}
</style>
