<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		gsap.from('.dossier-section', {
			opacity: 0,
			y: 15,
			duration: 0.3,
			stagger: 0.1,
			ease: 'power2.out'
		});
	});
</script>

<div class="mobile-about">
	<!-- Frame Header -->
	<div class="frame-header dossier-section">
		<span class="frame-label">About</span>
		<span class="frame-line"></span>
	</div>

	<!-- Header -->
	<div class="page-header dossier-section">
		<div class="header-badge">
			<span class="badge-icon">&#9881;</span>
		</div>
		<div class="header-text">
			<div class="agency-name">Get to know me</div>
			<div class="doc-type">About Me</div>
		</div>
		<div class="header-file">
			<span class="file-label">Based in</span>
			<span class="file-num">Melbourne, AU</span>
		</div>
	</div>

	<!-- Photo & ID -->
	<div class="id-section dossier-section">
		<div class="photo-frame">
			<img src="/about/about-image-1.jpeg" alt="Subject" class="subject-photo" />
		</div>
		<div class="id-stamps">
			<span class="stamp classified">CLASSIFIED</span>
			<span class="stamp approved">APPROVED</span>
		</div>
		<div class="id-label">SUBJECT #TI-001</div>
	</div>

	<!-- Data Rows -->
	<div class="data-section dossier-section">
		<div class="data-row">
			<span class="data-label">SUBJECT</span>
			<span class="data-value highlight">TIMOTHY ITAYI</span>
		</div>
		<div class="data-row">
			<span class="data-label">ALIAS</span>
			<span class="data-value">"TimTam"</span>
		</div>
		<div class="data-row">
			<span class="data-label">CLASS</span>
			<span class="data-value">SYSTEM ENGINEER / CREATIVE DEV</span>
		</div>
		<div class="data-row">
			<span class="data-label">LOCATION</span>
			<span class="data-value">MELBOURNE, AU</span>
		</div>
		<div class="data-row">
			<span class="data-label">ORIGIN</span>
			<span class="data-value">ZIMBABWE → NZ → AU</span>
		</div>
		<div class="data-row">
			<span class="data-label">STATUS</span>
			<span class="data-value status-active">ACTIVELY LEARNING...</span>
		</div>
	</div>

	<!-- Wanted Section -->
	<div class="wanted-section dossier-section">
		<div class="section-header">WANTED FOR:</div>
		<div class="wanted-list">
			<span class="wanted-item">• Excessive refactoring</span>
			<span class="wanted-item">• Documentation unprompted</span>
			<span class="wanted-item">• Friday deploys</span>
			<span class="wanted-item">• Descriptive variables</span>
		</div>
	</div>

	<!-- Intel Grid -->
	<div class="intel-section dossier-section">
		<div class="intel-box">
			<div class="intel-title">KNOWN STACK</div>
			<div class="intel-tags">
				<span class="tag">TypeScript</span>
				<span class="tag">React</span>
				<span class="tag">PostgreSQL</span>
				<span class="tag">Next.js</span>
				<span class="tag">Node.js</span>
			</div>
		</div>
		<div class="intel-box">
			<div class="intel-title">INTERESTS</div>
			<div class="intel-text">F1, Sim Racing, UFC, boxing, books, building/breaking/fixing things.</div>
		</div>
	</div>

	<!-- Biometrics -->
	<div class="bio-section dossier-section">
		<div class="bio-label">KEYSTROKE ANALYSIS</div>
		<div class="bio-keys">
			<span class="key-combo">Google Search</span>
		
		</div>
		<div class="bio-note">Primary productivity method. Suspicious proficiency.</div>
	</div>

	<!-- Footer -->
	<div class="page-footer dossier-section">
		<span class="footer-note">
			Subject believes best ideas come from curiosity and willingness to tinker, fail, and try again.
		</span>
	</div>
</div>

<style>
	.mobile-about {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
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

	.header-badge {
		width: 44px;
		height: 44px;
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 12px;
		display: grid;
		place-items: center;
		font-size: 1.3rem;
		flex-shrink: 0;
		color: #8b5cf6;
		background: rgba(139, 92, 246, 0.15);
	}

	.header-text {
		flex: 1;
	}

	.agency-name {
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #a1a1aa;
	}

	.doc-type {
		font-size: 1.1rem;
		color: #fafafa;
		font-weight: 700;
		margin-top: 2px;
	}

	.header-file {
		text-align: right;
	}

	.file-label {
		font-size: 0.75rem;
		color: #71717a;
		font-weight: 500;
	}

	.file-num {
		display: block;
		font-size: 0.85rem;
		font-weight: 600;
		color: #8b5cf6;
		margin-top: 2px;
	}

	/* ID Section */
	.id-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 24px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.photo-frame {
		width: 120px;
		aspect-ratio: 3/4;
		border: 2px solid rgba(139, 92, 246, 0.4);
		border-radius: 12px;
		padding: 4px;
		background: #141416;
		overflow: hidden;
	}

	.subject-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
	}

	.id-stamps {
		display: flex;
		gap: 10px;
	}

	.stamp {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 6px 14px;
		border-radius: 20px;
		letter-spacing: 0.04em;
	}

	.stamp.classified {
		color: #fafafa;
		background: rgba(239, 68, 68, 0.8);
		border: none;
	}

	.stamp.approved {
		color: #fafafa;
		background: rgba(34, 197, 94, 0.8);
		border: none;
	}

	.id-label {
		font-size: 0.8rem;
		color: #71717a;
		letter-spacing: 0.04em;
		font-weight: 500;
	}

	/* Data Section */
	.data-section {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: #1c1c1f;
		border-radius: 16px;
		overflow: hidden;
	}

	.data-row {
		display: flex;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.data-row:last-child {
		border-bottom: none;
	}

	.data-label {
		min-width: 100px;
		padding: 14px 16px;
		font-size: 0.75rem;
		font-weight: 600;
		background: #141416;
		border-right: 1px solid rgba(255, 255, 255, 0.08);
		color: #71717a;
		letter-spacing: 0.02em;
	}

	.data-value {
		flex: 1;
		padding: 14px 16px;
		font-size: 0.9rem;
		font-weight: 500;
		color: #fafafa;
	}

	.data-value.highlight {
		font-weight: 700;
		font-size: 0.95rem;
		color: #8b5cf6;
	}

	.data-value.italic {
		font-style: italic;
		color: #f59e0b;
	}

	.data-value.status-active {
		color: #22c55e;
	}

	/* Wanted Section */
	.wanted-section {
		background: #1c1c1f;
		border: 1px solid rgba(245, 158, 11, 0.4);
		border-radius: 16px;
		overflow: hidden;
	}

	.section-header {
		padding: 12px 16px;
		font-size: 0.8rem;
		font-weight: 600;
		background: rgba(245, 158, 11, 0.15);
		color: #f59e0b;
		letter-spacing: 0.04em;
		border-bottom: 1px solid rgba(245, 158, 11, 0.3);
	}

	.wanted-list {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.wanted-item {
		font-size: 0.9rem;
		color: #a1a1aa;
		font-weight: 500;
		line-height: 1.5;
	}

	/* Intel Section */
	.intel-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.intel-box {
		padding: 18px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.intel-title {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		margin-bottom: 12px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		color: #a1a1aa;
		text-transform: uppercase;
	}

	.intel-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tag {
		padding: 8px 14px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
		color: #8b5cf6;
	}

	.intel-text {
		font-size: 0.95rem;
		color: #a1a1aa;
		line-height: 1.6;
		font-weight: 500;
	}

	/* Biometrics */
	.bio-section {
		text-align: center;
		padding: 20px;
		background: #1c1c1f;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
	}

	.bio-label {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #a1a1aa;
		margin-bottom: 14px;
		text-transform: uppercase;
	}

	.bio-keys {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-bottom: 12px;
	}

	.key-combo {
		padding: 10px 18px;
		background: #141416;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 10px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #fafafa;
	}

	.bio-note {
		font-size: 0.85rem;
		font-style: italic;
		color: #71717a;
		font-weight: 500;
	}

	/* Footer */
	.page-footer {
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.footer-note {
		font-size: 0.9rem;
		font-style: italic;
		color: #71717a;
		line-height: 1.6;
		display: block;
		font-weight: 500;
	}
</style>
