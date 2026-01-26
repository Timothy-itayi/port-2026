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
		// Check viewport on mount and redirect if needed
		checkViewportAndRedirect();

		// Debounced resize handler
		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		
		window.addEventListener('resize', resizeHandler);

		gsap.from('.dossier', {
			scale: 0.9,
			opacity: 0,
			duration: 0.6,
			ease: 'power3.out'
		});

		gsap.from('.data-row', {
			opacity: 0,
			x: -8,
			duration: 0.2,
			stagger: 0.03,
			delay: 0.3
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

<main class="about-inspect-page">
	<div class="background-dim"></div>
	
	<div class="dossier">
		<!-- Header -->
		<header class="dossier-header">
			<div class="agency-brand">
				<div class="agency-seal">
					<span class="seal-icon">&#9881;</span>
				</div>
				<div class="agency-text">
					<div class="agency-name">Bureau of Engineering Investigation</div>
					<div class="agency-subtitle">PERSONNEL DOSSIER</div>
				</div>
			</div>
			<div class="file-info">
				<div class="file-row"><span class="file-label">FILE</span><span class="file-value">#2026-TI-0x3F</span></div>
				<div class="file-row"><span class="file-label">STATUS</span><span class="file-value status-active">ACTIVE</span></div>
			</div>
		</header>

		<div class="dossier-body">
			<!-- Left: Taped Photo + Stamps -->
			<div class="photo-column">
				<div class="taped-photo">
					<div class="tape tape-top"></div>
					<div class="tape tape-bottom"></div>
					<img src="/about/about-image-1.jpeg" alt="Subject: Timothy Itayi" class="subject-photo" />
				</div>
				<div class="photo-label">SUBJECT #TI-001</div>
				
				<div class="stamps-container">
					<div class="stamp classified-stamp">CLASSIFIED</div>
					<div class="stamp approved-stamp">APPROVED</div>
				</div>
			</div>

			<!-- Right: Subject Data -->
			<div class="subject-data">
				<div class="data-section">
					<div class="data-row"><span class="data-label">SUBJECT</span><span class="data-value highlight-name">TIMOTHY ITAYI</span></div>
					<div class="data-row"><span class="data-label">CODENAME</span><span class="data-value highlight-codename">"THE ENGINEER"</span></div>
					<div class="data-row"><span class="data-label">CLASS</span><span class="data-value">SYSTEM ENGINEER / CREATIVE DEV</span></div>
					<div class="data-row"><span class="data-label">LOCATION</span><span class="data-value">MELBOURNE, AU</span></div>
					<div class="data-row"><span class="data-label">ORIGIN</span><span class="data-value">ZIMBABWE → NZ → AU</span></div>
					<div class="data-row"><span class="data-label">STATUS</span><span class="data-value status-active">ACTIVELY DEBUGGING</span></div>
				</div>

				<div class="data-section wanted-section">
					<div class="section-title">WANTED FOR:</div>
					<div class="wanted-content">
						<span class="wanted-item">Excessive refactoring</span> • 
						<span class="wanted-item">Documentation unprompted</span> • 
						<span class="wanted-item">Friday deploys</span> • 
						<span class="wanted-item">Descriptive variables</span>
					</div>
				</div>

				<div class="data-section">
					<div class="section-title">LAST KNOWN ACTIVITIES:</div>
					<div class="activity-log">
						<div class="log-row"><span class="log-time">03:47</span><span class="log-text">Refactoring at ungodly hours</span></div>
						<div class="log-row"><span class="log-time">--:--</span><span class="log-text">Odd tech experiments</span></div>
						<div class="log-row"><span class="log-time">DAILY</span><span class="log-text">Suspicious long walks</span></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Intel Grid -->
		<div class="intel-grid">
			<div class="intel-box">
				<div class="intel-title">KNOWN STACK</div>
				<div class="intel-content tags">
					<span class="tag">TypeScript</span>
					<span class="tag">Svelte</span>
					<span class="tag">Go</span>
					<span class="tag">Python</span>
					<span class="tag">Rust</span>
					<span class="tag">PostgreSQL</span>
				</div>
			</div>
			<div class="intel-box">
				<div class="intel-title">INTERESTS</div>
				<div class="intel-content">
					F1, endurance racing, UFC, boxing, books, building/breaking/fixing things.
				</div>
			</div>
			<div class="intel-box">
				<div class="intel-title">ANTI-PATTERNS</div>
				<div class="intel-content anti-patterns">
					Magic numbers, god classes, "works on my machine", cargo cult code.
				</div>
			</div>
		</div>

		<!-- Footer: Biometrics only -->
		<footer class="dossier-footer">
			<div class="biometrics-inline">
				<div class="bio-label">KEYSTROKE ANALYSIS</div>
				<div class="key-combo">
					<div class="key-group">
						<span class="key">CTRL</span><span class="key-plus">+</span><span class="key">C</span>
						<div class="print-mini"></div>
					</div>
					<div class="key-group">
						<span class="key">CTRL</span><span class="key-plus">+</span><span class="key">V</span>
						<div class="print-mini"></div>
					</div>
				</div>
				<div class="bio-note">Primary method of productivity. Suspicious proficiency.</div>
			</div>
		</footer>

		<button class="back-btn" onclick={() => window.history.back()}>
			[ CLOSE FILE ]
		</button>
	</div>
</main>

<style>
	.about-inspect-page {
		height: 100vh;
		display: grid;
		place-items: center;
		background: #0a0a0a;
		padding: 1rem;
		position: relative;
		overflow: hidden;
	}

	.background-dim {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 100%);
		pointer-events: none;
	}

	.dossier {
		position: relative;
		width: min(95vw, 880px);
		max-height: calc(100vh - 4rem);
		background: #f5f3ef;
		color: #1a1a1a;
		box-shadow: 0 20px 50px rgba(0,0,0,0.6);
		font-family: 'Courier New', Courier, monospace;
		border: 2px solid #1a1a1a;
		display: flex;
		flex-direction: column;
	}

	/* ========== HEADER ========== */
	.dossier-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.6rem 1.25rem;
		border-bottom: 2px solid #1a1a1a;
		background: #fff;
		flex-shrink: 0;
	}

	.agency-brand {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.agency-seal {
		width: 38px;
		height: 38px;
		border: 2px solid #1a1a1a;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 1.1rem;
		background: #fff;
	}

	.seal-icon {
		opacity: 0.8;
	}

	.agency-text {
		display: flex;
		flex-direction: column;
	}

	.agency-name {
		font-size: 0.8rem;
		font-weight: 900;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.agency-subtitle {
		font-size: 0.65rem;
		font-weight: bold;
		letter-spacing: 0.1em;
		opacity: 0.6;
	}

	.file-info {
		display: flex;
		gap: 1.25rem;
	}

	.file-row {
		display: flex;
		gap: 0.5rem;
		font-size: 0.7rem;
	}

	.file-label {
		opacity: 0.5;
	}

	.file-value {
		font-weight: bold;
	}

	.status-active {
		color: #2a7d2a;
		font-weight: 900;
	}

	/* ========== BODY ========== */
	.dossier-body {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		padding: 1.25rem;
		background: #f5f3ef;
	}

	/* ========== PHOTO COLUMN ========== */
	.photo-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.taped-photo {
		position: relative;
		width: 140px;
		padding: 6px;
		background: #fff;
		box-shadow: 2px 3px 10px rgba(0,0,0,0.18);
		transform: rotate(-1.5deg);
	}

	.tape {
		position: absolute;
		width: 55px;
		height: 20px;
		background: linear-gradient(180deg, 
			rgba(255,235,180,0.9) 0%, 
			rgba(240,220,160,0.8) 100%
		);
		z-index: 2;
	}

	.tape::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			90deg,
			transparent,
			transparent 3px,
			rgba(0,0,0,0.04) 3px,
			rgba(0,0,0,0.04) 4px
		);
	}

	.tape-top {
		top: -8px;
		left: 50%;
		transform: translateX(-50%) rotate(2deg);
	}

	.tape-bottom {
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%) rotate(-1deg);
	}

	.subject-photo {
		width: 100%;
		aspect-ratio: 3/4;
		object-fit: cover;
		display: block;
		filter: contrast(1.05) saturate(0.95);
	}

	.photo-label {
		font-size: 0.6rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		opacity: 0.5;
	}

	.stamps-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
	}

	.stamp {
		padding: 5px 12px;
		font-size: 0.7rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		border: 2px solid;
		border-radius: 2px;
	}

	.classified-stamp {
		color: #8b0000;
		border-color: #8b0000;
		transform: rotate(-3deg);
		opacity: 0.85;
	}

	.approved-stamp {
		color: #2a7d2a;
		border-color: #2a7d2a;
		transform: rotate(2deg);
		opacity: 0.85;
	}

	/* ========== SUBJECT DATA ========== */
	.subject-data {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.data-section {
		border: 1px solid #1a1a1a;
		background: #fff;
	}

	.data-row {
		display: grid;
		grid-template-columns: 100px 1fr;
		border-bottom: 1px solid #eee;
	}

	.data-row:last-child {
		border-bottom: none;
	}

	.data-label {
		padding: 6px 10px;
		font-size: 0.7rem;
		font-weight: 900;
		background: #f0ede8;
		border-right: 1px solid #1a1a1a;
	}

	.data-value {
		padding: 6px 10px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.highlight-name {
		font-weight: 900;
		font-size: 0.85rem;
	}

	.highlight-codename {
		font-weight: 900;
		font-style: italic;
		background: linear-gradient(90deg, #fff8dc 0%, #fff 100%);
	}

	.wanted-section {
		background: #fffaf5;
		border-color: #c4713b;
	}

	.section-title {
		font-size: 0.7rem;
		font-weight: 900;
		padding: 5px 10px;
		background: #1a1a1a;
		color: #f5f3ef;
		letter-spacing: 0.05em;
	}

	.wanted-content {
		padding: 8px 10px;
		font-size: 0.75rem;
		line-height: 1.5;
	}

	.wanted-item {
		background: #fff3e0;
		padding: 1px 4px;
		border-radius: 2px;
	}

	.activity-log {
		padding: 8px 10px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.log-row {
		display: flex;
		gap: 12px;
		font-size: 0.75rem;
	}

	.log-time {
		font-weight: 900;
		opacity: 0.4;
		min-width: 45px;
		font-size: 0.7rem;
	}

	.log-text {
		font-weight: 500;
	}

	/* ========== INTEL GRID ========== */
	.intel-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid #1a1a1a;
		border-bottom: 1px solid #1a1a1a;
		background: #fff;
	}

	.intel-box {
		padding: 0.65rem 0.85rem;
		border-right: 1px solid #ddd;
	}

	.intel-box:last-child {
		border-right: none;
	}

	.intel-title {
		font-size: 0.6rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		margin-bottom: 0.5rem;
		padding-bottom: 4px;
		border-bottom: 1px solid #1a1a1a;
	}

	.intel-content {
		font-size: 0.7rem;
		line-height: 1.5;
	}

	.intel-content.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.tag {
		padding: 2px 6px;
		background: #1a1a1a;
		color: #f5f3ef;
		font-size: 0.6rem;
		font-weight: bold;
	}

	.anti-patterns {
		color: #8b0000;
		font-weight: 600;
	}

	/* ========== FOOTER ========== */
	.dossier-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.6rem 1rem;
		background: #faf9f7;
		border-top: 1px solid #1a1a1a;
		flex-shrink: 0;
	}

	.biometrics-inline {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.bio-label {
		font-size: 0.6rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		opacity: 0.5;
	}

	.key-combo {
		display: flex;
		gap: 2rem;
	}

	.key-group {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.key {
		padding: 3px 7px;
		font-size: 0.6rem;
		font-weight: 900;
		background: linear-gradient(180deg, #fff 0%, #e0e0e0 100%);
		border: 1px solid #1a1a1a;
		border-radius: 3px;
		box-shadow: 0 2px 0 #1a1a1a;
	}

	.key-plus {
		font-size: 0.6rem;
		opacity: 0.4;
	}

	.print-mini {
		width: 16px;
		height: 20px;
		border: 1px solid #aaa;
		border-radius: 50% 50% 45% 45%;
		background: #fff;
		margin-left: 6px;
		position: relative;
		overflow: hidden;
	}

	.print-mini::before {
		content: '';
		position: absolute;
		inset: 2px;
		border-radius: inherit;
		background: repeating-radial-gradient(
			ellipse at center,
			transparent 0px,
			transparent 1px,
			rgba(0,0,0,0.12) 1px,
			rgba(0,0,0,0.12) 2px
		);
	}

	.bio-note {
		font-size: 0.6rem;
		font-style: italic;
		opacity: 0.45;
	}

	/* ========== BACK BUTTON ========== */
	.back-btn {
		position: absolute;
		bottom: -2.5rem;
		left: 50%;
		transform: translateX(-50%);
		background: none;
		border: 1px solid rgba(255,255,255,0.3);
		color: #fff;
		font-family: inherit;
		cursor: pointer;
		font-size: 0.75rem;
		padding: 6px 18px;
		opacity: 0.6;
		transition: all 0.2s;
		letter-spacing: 0.1em;
	}

	.back-btn:hover {
		opacity: 1;
		background: rgba(255,255,255,0.1);
	}

	/* ========== RESPONSIVE ========== */
	@media (max-width: 650px) {
		.dossier-header {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.dossier-body {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.photo-column {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem;
		}

		.stamps-container {
			flex-direction: row;
			margin-top: 0;
		}

		.taped-photo {
			width: 110px;
		}

		.intel-grid {
			grid-template-columns: 1fr;
		}

		.intel-box {
			border-right: none;
			border-bottom: 1px solid #ddd;
		}

		.intel-box:last-child {
			border-bottom: none;
		}

		.key-combo {
			gap: 1.25rem;
		}
	}
</style>
