<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import './console.css';
	import './console-theme-alt.css';
	import Paper from '../lib/components/Paper.svelte';
	import { BREAKPOINTS } from '$lib/utils/viewport.js';
	import { themeActive, toggleTheme } from '$lib/stores/theme.js';
	import { projects } from '$lib/data/projects.js';

	const showcaseSlugs = ['amber', 'stacks', 'formula1-heritage'];
	const featuredProjects = showcaseSlugs
		.map(slug => projects.find(p => p.slug === slug))
		.filter((p): p is NonNullable<typeof p> => p !== undefined);

	let viewportReady = false;
	let selectedButton: string | null = null;
	let lineOneEl: HTMLElement | null = null;
	let lineTwoEl: HTMLElement | null = null;
	let promptEl: HTMLElement | null = null;
	let visorEl: HTMLElement | null = null;

	let isPrinting = false;
	let printContent = '';
	let paperComponent: Paper;
	let projectPrintSound: HTMLAudioElement | null = null;

	const checkViewportAndRedirect = () => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile', { replaceState: true });
		}
	};

	let resizeHandler: () => void;

	const typeLine = (element: HTMLElement | null, text: string, duration = 1.6) => {
		if (!element) return;
		element.textContent = '';
		const state = { count: 0 };
		gsap.to(state, {
			count: text.length,
			duration,
			ease: 'none',
			onUpdate: () => {
				element.textContent = text.slice(0, Math.floor(state.count));
			}
		});
	};

	const truncateText = (text: string, maxLength: number = 24): string => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength - 3) + '...';
	};

	const triggerPrint = async (label: string) => {
		// Reset state before starting new print
		if (paperComponent) {
			paperComponent.reset();
		}
		
		// Reset printing flag to ensure clean state
		isPrinting = false;
		
		// Wait for reset to complete
		await tick();
		
		// Set content
		printContent = label;
		await tick();

		// Animate visor opening to let paper through
		if (visorEl) {
			const tl = gsap.timeline();
			// Spring open - quick lift with overshoot
			tl.to(visorEl, {
				rotationX: 50,
				duration: 0.2,
				ease: 'power3.out'
			})
			// Spring back with natural sway
			.to(visorEl, {
				rotationX: 12,
				duration: 1.2,
				ease: 'elastic.out(1.0, 0.3)'
			})
			.add(() => {
				// Start paper animation as visor settles
				isPrinting = true;
				
				// Play sound effect for PROJECTS button when print starts
				if (label === 'PROJECTS' && projectPrintSound) {
					projectPrintSound.currentTime = 0;
					projectPrintSound.play().catch(() => {
						// Ignore autoplay errors
					});
				}
			}, 0.35); // Trigger print early during the spring-back
		} else {
			// If no visor, start immediately
			isPrinting = true;
			
			// Play sound effect for PROJECTS button when print starts
			if (label === 'PROJECTS' && projectPrintSound) {
				projectPrintSound.currentTime = 0;
				projectPrintSound.play().catch(() => {
					// Ignore autoplay errors
				});
			}
		}
	};

	const handleButtonClick = (label: string, event: MouseEvent) => {
		selectedButton = label;

		const button = event.currentTarget as HTMLElement;
		gsap.fromTo(button, { y: 0 }, { y: 2, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.out' });

		if (promptEl) {
			const promptText = truncateText(`> ${label}`, 20);
			typeLine(promptEl, promptText, 0.6);
		}

		// Trigger the print animation
		triggerPrint(label);
	};

	const handleVisorClick = (event: MouseEvent) => {
		const visor = event.currentTarget as HTMLElement;

		// Flick forward, then spring back with overshoot and natural decay
		const tl = gsap.timeline();
		tl.to(visor, {
			rotationX: 38,
			perspective: 150,
			duration: 0.1,
			ease: 'power2.out'
		}).to(visor, {
			rotationX: 15,
			perspective: 150,
			duration: 0.95,
			ease: 'elastic.out(1.25, 0.35)'
		});
	};

	onMount(() => {
		if (browser && window.innerWidth < BREAKPOINTS.tablet) {
			goto('/mobile', { replaceState: true });
			return;
		}
		viewportReady = true;

		let resizeTimer: ReturnType<typeof setTimeout>;
		resizeHandler = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(checkViewportAndRedirect, 100);
		};
		window.addEventListener('resize', resizeHandler);
		window.addEventListener('orientationchange', () => {
			setTimeout(checkViewportAndRedirect, 150);
		});

		lineOneEl = document.querySelector<HTMLElement>('[data-terminal-line="1"]');
		lineTwoEl = document.querySelector<HTMLElement>('[data-terminal-line="2"]');
		promptEl = document.querySelector<HTMLElement>('[data-terminal-line="3"]');
		visorEl = document.querySelector<HTMLElement>('.roller-bar:last-child');

		// Initialize audio for project print sound
		projectPrintSound = new Audio('/sounds/project-button-sound.mp3');
		projectPrintSound.volume = 0.5;

		gsap.from('.hero-section', {
			opacity: 0,
			y: 20,
			duration: 0.6,
			ease: 'power2.out'
		});

		gsap.from('.teaser-card', {
			opacity: 0,
			y: 16,
			duration: 0.4,
			stagger: 0.1,
			delay: 0.3,
			ease: 'power2.out'
		});

		typeLine(lineOneEl, 'SYSTEM READY', 1.0);
		gsap.delayedCall(1.3, () => typeLine(lineTwoEl, 'PORTFOLIO LOADED', 1.4));
		gsap.delayedCall(3.0, () => typeLine(promptEl, '> SELECT CMD', 0.9));

		// Add click handler to visor
		visorEl?.addEventListener('click', handleVisorClick);

		return () => {
			visorEl?.removeEventListener('click', handleVisorClick);
		};
	});

	onDestroy(() => {
		if (browser && resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

<svelte:head>
	<title>Timothy Itayi | Portfolio</title>
</svelte:head>

<main class="stage" class:theme-alt={$themeActive} class:ready={viewportReady}>
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-inner">
			<div class="hero-photo">
				<img src="/about/about-image-1.jpeg" alt="Timothy Itayi" />
			</div>
			<div class="hero-info">
				<h1 class="hero-name">Timothy Itayi</h1>
				<p class="hero-role">Frontend & Mobile Developer</p>
				<p class="hero-location">Melbourne, Australia</p>
			</div>
			<p class="hero-pitch">
				I build with React, React Native, TypeScript, and Next.js. Specialising in frontend development, always looking to improve.
			</p>
			<div class="hero-stack">
				<div class="hero-stack-group">
					<span class="hero-stack-label">Frontend</span>
					<div class="hero-stack-items">
						<span class="hero-chip">React</span>
						<span class="hero-chip">React Native</span>
						<span class="hero-chip">TypeScript</span>
						<span class="hero-chip">Next.js</span>
						<span class="hero-chip">SvelteKit</span>
					</div>
				</div>
				<div class="hero-stack-group">
					<span class="hero-stack-label">Backend</span>
					<div class="hero-stack-items">
						<span class="hero-chip">Node.js</span>
						<span class="hero-chip">AWS</span>
						<span class="hero-chip">PostgreSQL</span>
					</div>
				</div>
			</div>
			<div class="hero-training">
				<span class="hero-training-label">Training</span> Dev Academy · Harvard CS50
			</div>
		</div>
	</section>

	<!-- Project Teasers -->
	<section class="teaser-section">
		<h2 class="teaser-heading">Showcase</h2>
		<div class="teaser-grid">
			{#each featuredProjects as project}
				<div class="teaser-card" role="button" tabindex="0" onclick={() => goto(`/projects/${project.slug}`)} onkeydown={(e) => { if (e.key === 'Enter') goto(`/projects/${project.slug}`); }}>
					<div class="teaser-thumb" class:portrait={project.portraitPreview}>
						{#if project.previewVideo}
							<video
								src={project.previewVideo}
								autoplay
								muted
								loop
								playsinline
								disablepictureinpicture
								preload="auto"
								poster={project.image}
							></video>
						{:else}
							<img src={project.image} alt={project.title} />
						{/if}
					</div>
					<div class="teaser-info">
						<span class="teaser-title">{project.title}</span>
						<span class="teaser-sub">{project.subtitle}</span>
						<div class="teaser-tags">
							{#each project.techStack.slice(0, 3) as tech}
								<span class="teaser-tag">{tech}</span>
							{/each}
						</div>
					</div>
					<div class="teaser-links">
						{#if project.liveSiteUrl}
							<a href={project.liveSiteUrl} target="_blank" rel="noopener" class="teaser-link-badge live" onclick={(e) => e.stopPropagation()}>Live</a>
						{/if}
						{#if project.githubUrl}
							<a href={project.githubUrl} target="_blank" rel="noopener" class="teaser-link-badge" onclick={(e) => e.stopPropagation()}>GitHub</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Desktop Console + Printer UI -->
		<section class="console-container">
			<!-- Console Top Cover -->
			<div class="console-cover">
				<div class="cover-ridge"></div>
				<div class="cover-ridge"></div>
				<div class="cover-ridge"></div>
			</div>

			<div class="console-shell">
				<div class="console-shell-shadow"></div>
				<div class="console-shell-highlight"></div>

				<div class="console-housing">
					<div class="console-housing-inner">
						<div class="console-top">
							<div class="top-title">CONTROL PANEL</div>
							<div class="top-strip">
								<a href="https://github.com/Timothy-itayi" target="_blank" rel="noopener" class="strip-link">
									<span class="toggle-label">GITHUB</span>
								</a>
								<a href="https://linkedin.com/in/timothyitayi" target="_blank" rel="noopener" class="strip-link">
									<span class="toggle-label">LINKEDIN</span>
								</a>
								<a href="mailto:hello@timothyitayi_icloud.com" class="strip-link">
									<span class="toggle-label">EMAIL</span>
								</a>
								<a href="/Resume_Timothy_itayi.pdf" download="Resume_Timothy_itayi.pdf" class="strip-link">
									<span class="toggle-label">RESUME</span>
								</a>
								<button
									class="strip-toggle"
									class:active={$themeActive}
									onclick={toggleTheme}
									aria-label="Toggle colour theme"
									type="button"
								><span class="toggle-label">THEME</span></button>
							</div>
						</div>

						<div class="console-body">
							<!-- Left Panel: Terminal + Buttons -->
							<div class="console-left">
								<div class="console-screen">
									<div class="screen-bezel"></div>
									<div class="screen-frame"></div>
									<div class="screen-content">
										<div class="screen-line" data-terminal-line="1"></div>
										<div class="screen-line" data-terminal-line="2"></div>
										<div class="screen-line" data-terminal-line="3">
											<span class="screen-cursor"></span>
										</div>
									</div>
								</div>

								<div class="button-row">
									{#each ['ABOUT', 'PROJECTS', 'RESUME'] as label}
										<div class="button-wrapper">
											<button
												class="tactile-button"
												aria-label={label}
												onclick={(e) => handleButtonClick(label, e)}
											>
												<span class="button-shadow"></span>
												<span class="button-outline"></span>
												<span class="button-top"></span>
												<span class="button-edge"></span>
												<span class="button-face"></span>
												<span class="button-label">{label}</span>
											</button>
										</div>
									{/each}
								</div>

							</div>

							<!-- Right Panel: Printer -->
							<div class="console-right printer">
								<!-- Printer Top / Paper Feed -->
								<div class="printer-top">
									<div class="printer-roller">
										<div class="roller-bar"></div>
										<div class="roller-bar"></div>
									</div>
								</div>

								<!-- Paper Output Area -->
								<div class="printer-output">
									<div class="paper-slot">
										<div class="paper-slot-shadow"></div>
										<div class="paper-slot-edge"></div>
									</div>
									<!-- Animated Paper Component -->
									<Paper
										bind:this={paperComponent}
										content={printContent}
										visible={isPrinting}
										onPrintComplete={(content) => {
											if (content === 'RESUME' && promptEl) {
												// Wait a moment after animation completes, then show download instruction
												setTimeout(() => {
													typeLine(promptEl, '> TAP PAGE TO DOWNLOAD', 0.8);
												}, 400);
											}
										}}
									/>
								</div>

								<!-- Printer Body -->
								<div class="printer-body">
									<div class="printer-window">
										<div class="printer-window-inner"></div>
									</div>
									<div class="printer-vents">
										<span></span>
										<span></span>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
</main>
