<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="welcome-screen">
	<div class="welcome-inner">
		<div class="welcome-photo">
			<img src="/about/about-image-1.jpeg" alt="Timothy Itayi" />
		</div>

		<div class="welcome-intro">
			<h1 class="welcome-name">Timothy Itayi</h1>
			<p class="welcome-role">Full-Stack Developer</p>
			<p class="welcome-location">Melbourne, Australia</p>
		</div>

		<p class="welcome-pitch">
			I build polished, performant interfaces for web and mobile.
			Specialising in React, React Native, TypeScript, and Next.js,
			with backend experience across Node.js, AWS, and PostgreSQL.
		</p>

		<ul class="welcome-details">
			<li><span class="detail-label">Focus</span> Frontend & mobile development</li>
			<li><span class="detail-label">Stack</span> React, React Native, TypeScript, SvelteKit</li>
			<li><span class="detail-label">Training</span> Dev Academy, Harvard CS50</li>
		
		</ul>

		<div class="welcome-actions">
			<button class="welcome-cta" onclick={() => goto('/mobile/projects')}>
				View Projects
			</button>
			<a class="welcome-resume" href="/Resume_Timothy_Itayi.pdf" download="Resume_Timothy_Itayi.pdf">
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

	.welcome-details {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		padding: 1rem 0;
	}

	.welcome-details li {
		font-size: 0.8rem;
		color: #999;
		line-height: 1.4;
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
