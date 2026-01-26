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
	<!-- Header -->
	<div class="page-header dossier-section">
		<div class="header-badge">
			<span class="badge-icon">&#9881;</span>
		</div>
		<div class="header-text">
			<div class="agency-name">BUREAU OF ENGINEERING</div>
			<div class="doc-type">PERSONNEL DOSSIER</div>
		</div>
		<div class="header-file">
			<span class="file-label">FILE</span>
			<span class="file-num">#2026-TI-0x3F</span>
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
			<span class="data-label">CODENAME</span>
			<span class="data-value italic">"THE ENGINEER"</span>
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
			<span class="data-value status-active">ACTIVELY DEBUGGING</span>
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
				<span class="tag">Svelte</span>
				<span class="tag">Go</span>
				<span class="tag">Rust</span>
				<span class="tag">Python</span>
			</div>
		</div>
		<div class="intel-box">
			<div class="intel-title">INTERESTS</div>
			<div class="intel-text">F1, endurance racing, UFC, boxing, books, tinkering</div>
		</div>
	</div>

	<!-- Biometrics -->
	<div class="bio-section dossier-section">
		<div class="bio-label">KEYSTROKE ANALYSIS</div>
		<div class="bio-keys">
			<span class="key-combo">CTRL+C</span>
			<span class="key-combo">CTRL+V</span>
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
		gap: 14px;
		color: #e4e8eb;
		font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
	}

	/* Header */
	.page-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		background: rgba(125, 211, 192, 0.06);
		border: 1px solid rgba(125, 211, 192, 0.15);
		border-radius: 14px;
	}

	.header-badge {
		width: 32px;
		height: 32px;
		border: 1px solid rgba(125, 211, 192, 0.3);
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 1rem;
		flex-shrink: 0;
		color: #7dd3c0;
	}

	.header-text {
		flex: 1;
	}

	.agency-name {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #e4e8eb;
	}

	.doc-type {
		font-size: 0.6rem;
		color: rgba(228, 232, 235, 0.5);
		letter-spacing: 0.06em;
		font-weight: 500;
	}

	.header-file {
		text-align: right;
		font-size: 0.6rem;
	}

	.file-label {
		color: rgba(228, 232, 235, 0.4);
		font-weight: 500;
	}

	.file-num {
		display: block;
		font-weight: 600;
		color: #7dd3c0;
		font-family: 'SF Mono', monospace;
	}

	/* ID Section */
	.id-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
	}

	.photo-frame {
		width: 110px;
		aspect-ratio: 3/4;
		border: 2px solid rgba(255, 255, 255, 0.15);
		padding: 4px;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
	}

	.subject-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
	}

	.id-stamps {
		display: flex;
		gap: 10px;
	}

	.stamp {
		font-size: 0.55rem;
		font-weight: 700;
		padding: 4px 10px;
		border: 1px solid;
		letter-spacing: 0.06em;
		border-radius: 4px;
	}

	.stamp.classified {
		color: #f87171;
		border-color: rgba(248, 113, 113, 0.4);
		background: rgba(248, 113, 113, 0.08);
	}

	.stamp.approved {
		color: #7dd3c0;
		border-color: rgba(125, 211, 192, 0.4);
		background: rgba(125, 211, 192, 0.08);
	}

	.id-label {
		font-size: 0.65rem;
		color: rgba(228, 232, 235, 0.45);
		letter-spacing: 0.08em;
		font-weight: 500;
	}

	/* Data Section */
	.data-section {
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		overflow: hidden;
	}

	.data-row {
		display: flex;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.data-row:last-child {
		border-bottom: none;
	}

	.data-label {
		min-width: 100px;
		padding: 12px 14px;
		font-size: 0.65rem;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.02);
		border-right: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(228, 232, 235, 0.5);
		letter-spacing: 0.04em;
	}

	.data-value {
		flex: 1;
		padding: 12px 14px;
		font-size: 0.8rem;
		font-weight: 500;
		color: #e4e8eb;
	}

	.data-value.highlight {
		font-weight: 600;
		font-size: 0.85rem;
	}

	.data-value.italic {
		font-style: italic;
		color: #f0b866;
	}

	.data-value.status-active {
		color: #7dd3c0;
	}

	/* Wanted Section */
	.wanted-section {
		background: rgba(240, 184, 102, 0.06);
		border: 1px solid rgba(240, 184, 102, 0.2);
		border-radius: 14px;
		overflow: hidden;
	}

	.section-header {
		padding: 10px 14px;
		font-size: 0.7rem;
		font-weight: 600;
		background: rgba(240, 184, 102, 0.1);
		color: #f0b866;
		letter-spacing: 0.04em;
	}

	.wanted-list {
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.wanted-item {
		font-size: 0.8rem;
		color: rgba(228, 232, 235, 0.75);
		font-weight: 500;
	}

	/* Intel Section */
	.intel-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.intel-box {
		padding: 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
	}

	.intel-title {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		margin-bottom: 10px;
		padding-bottom: 6px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(228, 232, 235, 0.5);
	}

	.intel-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag {
		padding: 6px 10px;
		background: rgba(125, 211, 192, 0.08);
		border: 1px solid rgba(125, 211, 192, 0.2);
		border-radius: 8px;
		font-size: 0.7rem;
		font-weight: 600;
		color: #7dd3c0;
	}

	.intel-text {
		font-size: 0.8rem;
		color: rgba(228, 232, 235, 0.7);
		line-height: 1.5;
		font-weight: 500;
	}

	/* Biometrics */
	.bio-section {
		text-align: center;
		padding: 16px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 14px;
	}

	.bio-label {
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: rgba(228, 232, 235, 0.4);
		margin-bottom: 10px;
	}

	.bio-keys {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-bottom: 8px;
	}

	.key-combo {
		padding: 8px 14px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		font-size: 0.8rem;
		font-weight: 600;
		color: #e4e8eb;
		font-family: 'SF Mono', monospace;
	}

	.bio-note {
		font-size: 0.65rem;
		font-style: italic;
		color: rgba(228, 232, 235, 0.4);
		font-weight: 500;
	}

	/* Footer */
	.page-footer {
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.footer-note {
		font-size: 0.75rem;
		font-style: italic;
		color: rgba(228, 232, 235, 0.5);
		line-height: 1.6;
		display: block;
		font-weight: 500;
	}
</style>
