<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let downloaded = false;

	const downloadResume = () => {
		if (downloaded) return;
		downloaded = true;
		const link = document.createElement('a');
		link.href = '/Software-Engineer_CV.pdf';
		link.download = 'Software-Engineer_CV.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	onMount(() => {
		downloadResume();
		gsap.from('.resume-section', {
			opacity: 0,
			y: 12,
			duration: 0.3,
			stagger: 0.08,
			ease: 'power2.out'
		});
	});
</script>

<div class="gtv-resume">
	<div class="resume-body">
		<!-- Icon -->
		<div class="resume-icon-wrap resume-section">
			<div class="resume-icon">◈</div>
		</div>

		<!-- Title -->
		<h1 class="resume-title resume-section">Resume</h1>
		<p class="resume-subtitle resume-section">Your download should have started automatically.</p>

		<!-- CTA -->
		<button class="download-cta resume-section" onclick={downloadResume}>
			<span class="cta-icon">↓</span>
			<div class="cta-text">
				<span class="cta-label">Download Resume</span>
				<span class="cta-sub">PDF · 2026</span>
			</div>
		</button>

		<!-- File Details -->
		<div class="file-details resume-section">
			<div class="file-row">
				<span class="file-key">Filename</span>
				<span class="file-val">Software-Engineer_CV.pdf</span>
			</div>
			<div class="file-row">
				<span class="file-key">Format</span>
				<span class="file-val">PDF</span>
			</div>
			<div class="file-row">
				<span class="file-key">Version</span>
				<span class="file-val">2026</span>
			</div>
		</div>
	</div>
</div>

<style>
	.gtv-resume {
		display: flex;
		flex-direction: column;
		background: #0a0a0a;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	.resume-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 48px 24px;
		gap: 16px;
		text-align: center;
	}

	.resume-icon-wrap {
		margin-bottom: 8px;
	}

	.resume-icon {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		color: #8ab4f8;
	}

	.resume-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
		color: #e8e8e8;
	}

	.resume-subtitle {
		font-size: 0.9rem;
		color: #999;
		margin: 0;
		line-height: 1.5;
	}

	.download-cta {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 24px;
		background: #fff;
		border-radius: 28px;
		border: none;
		cursor: pointer;
		font-family: inherit;
		margin-top: 8px;
		width: 100%;
		max-width: 320px;
		transition: all 0.2s ease;
	}

	.download-cta:active {
		transform: scale(0.98);
		background: #eee;
	}

	.cta-icon {
		width: 40px;
		height: 40px;
		background: #0a0a0a;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.cta-text {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.cta-label {
		font-size: 1rem;
		font-weight: 600;
		color: #0a0a0a;
	}

	.cta-sub {
		font-size: 0.75rem;
		color: #666;
	}

	.file-details {
		width: 100%;
		max-width: 320px;
		margin-top: 16px;
		border-radius: 14px;
		overflow: hidden;
	}

	.file-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 16px;
		background: #1a1a1a;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.file-row:last-child {
		border-bottom: none;
	}

	.file-key {
		font-size: 0.8rem;
		color: #666;
		font-weight: 500;
	}

	.file-val {
		font-size: 0.8rem;
		color: #e8e8e8;
		font-weight: 500;
	}
</style>
