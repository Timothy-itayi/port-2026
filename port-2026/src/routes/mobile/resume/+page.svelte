<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';

	let downloaded = false;

	const downloadResume = () => {
		if (downloaded) return;
		downloaded = true;
		
		const link = document.createElement('a');
		link.href = '/Resume_Timothy_Itayi.pdf';
		link.download = 'Resume_Timothy_Itayi.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	onMount(() => {
		// Trigger download automatically on mount
		downloadResume();
		
		// Animate content
		gsap.from('.resume-section', {
			opacity: 0,
			y: 15,
			duration: 0.3,
			stagger: 0.1,
			ease: 'power2.out'
		});
	});
</script>

<div class="mobile-resume">
	<!-- Frame Header -->
	<div class="frame-header resume-section">
		<span class="frame-label">Resume</span>
		<span class="frame-line"></span>
	</div>

	<!-- Header -->
	<div class="page-header resume-section">
		<div class="header-icon-box">
			<span class="header-icon">◈</span>
		</div>
		<div class="header-text">
			<h1 class="header-title">Resume</h1>
			<div class="header-sub">Download started</div>
		</div>
		<div class="header-status">
			<div class="data-label">Ready</div>
		</div>
	</div>

	<!-- Status -->
	<div class="status-block resume-section">
		<div class="status-card">
			<span class="status-key">STATUS</span>
			<span class="status-val active">DOWNLOADING</span>
		</div>
		<div class="status-card">
			<span class="status-key">FILE</span>
			<span class="status-val">CV.pdf</span>
		</div>
	</div>

	<!-- Info -->
	<div class="info-section resume-section">
		<div class="section-label">INFORMATION</div>
		<div class="info-card">
			<div class="info-text">
				Your resume download should have started automatically. If it didn't, tap the button below.
			</div>
		</div>
		<button class="download-btn" onclick={downloadResume}>
			<span class="btn-icon">▸</span>
			<span>DOWNLOAD RESUME</span>
		</button>
	</div>

	<!-- File Details -->
	<div class="file-section resume-section">
		<div class="section-label">FILE DETAILS</div>
		<div class="file-card">
			<div class="file-row">
				<span class="file-key">FILENAME</span>
				<span class="file-val">Software-Engineer_CV.pdf</span>
			</div>
			<div class="file-row">
				<span class="file-key">FORMAT</span>
				<span class="file-val">PDF</span>
			</div>
			<div class="file-row">
				<span class="file-key">VERSION</span>
				<span class="file-val">2026</span>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="page-footer resume-section">
		<button class="back-btn" onclick={() => goto('/mobile')}>
			<span class="back-arrow">◂</span>
			<span>BACK TO HOME</span>
		</button>
	</div>
</div>

<style>
	.mobile-resume {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: #fafafa;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		background: #0a0a0b;
	}

	/* Frame Header */
	.frame-header {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.frame-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #71717a;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.frame-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%);
	}

	/* Header */
	.page-header {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.header-icon-box {
		width: 44px;
		height: 44px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 12px;
		display: grid;
		place-items: center;
	}

	.header-icon {
		font-size: 1.4rem;
		color: #8b5cf6;
	}

	.header-text {
		flex: 1;
	}

	.header-title {
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 0;
		color: #fafafa;
	}

	.header-sub {
		font-size: 0.85rem;
		color: #22c55e;
		font-weight: 500;
		margin-top: 4px;
	}

	.header-status {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
	}

	.data-label {
		font-size: 0.7rem;
		font-weight: 600;
		color: #fff;
		background: #8b5cf6;
		padding: 6px 12px;
		border-radius: 20px;
		letter-spacing: 0.04em;
	}

	/* Status */
	.status-block {
		display: flex;
		gap: 12px;
	}

	.status-card {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 12px;
	}

	.status-key {
		font-size: 0.75rem;
		color: #71717a;
		font-weight: 500;
	}

	.status-val {
		font-size: 0.9rem;
		font-weight: 600;
		color: #a1a1aa;
	}

	.status-val.active {
		color: #22c55e;
	}

	/* Section Label */
	.section-label {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: #a1a1aa;
		margin-bottom: 12px;
		text-transform: uppercase;
	}

	/* Info Section */
	.info-section {
		display: flex;
		flex-direction: column;
	}

	.info-card {
		padding: 18px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		margin-bottom: 16px;
	}

	.info-text {
		font-size: 0.95rem;
		color: #a1a1aa;
		line-height: 1.6;
	}

	.download-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 18px;
		background: #8b5cf6;
		border: none;
		border-radius: 14px;
		color: #fff;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.download-btn:hover {
		background: #7c3aed;
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
	}

	.download-btn:active {
		transform: translateY(-2px) scale(0.98);
	}

	.btn-icon {
		font-size: 1.1rem;
	}

	/* File Section */
	.file-section {
		display: flex;
		flex-direction: column;
	}

	.file-card {
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		overflow: hidden;
	}

	.file-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 18px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.file-row:last-child {
		border-bottom: none;
	}

	.file-key {
		font-size: 0.8rem;
		color: #71717a;
		font-weight: 500;
	}

	.file-val {
		font-size: 0.9rem;
		font-weight: 600;
		color: #fafafa;
	}

	/* Footer */
	.page-footer {
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		margin-top: auto;
	}

	.back-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 16px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 14px;
		color: #fafafa;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.back-btn:hover {
		background: #232326;
		border-color: rgba(139, 92, 246, 0.4);
		transform: translateY(-2px);
	}

	.back-arrow {
		color: #8b5cf6;
		font-size: 1rem;
	}
</style>
