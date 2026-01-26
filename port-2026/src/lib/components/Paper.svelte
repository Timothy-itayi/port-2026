<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import { projects } from '$lib/data/projects.js';
	import './paper.css';

	export let content: string = '';
	export let visible: boolean = false;

	let paperRef: HTMLElement;
	let isAnimating = false;
	let isTransitioning = false;
	let isReady = false;
	let lastAnimatedContent: string | null = null;
	let isHovering = false;

	onMount(() => {
		isTransitioning = false;
		isAnimating = false;
		isReady = false;
	});

	$: if (visible && !isAnimating && content && content !== lastAnimatedContent) {
		isReady = false;
		animatePrint();
	}

	function handleMouseEnter() {
		if (isTransitioning || isAnimating || !isReady || !paperRef) return;
		isHovering = true;
		
		// Different hover effects for each paper type
		let hoverY, hoverRotateX;
		if (content === 'ABOUT') {
			hoverY = 15;
			hoverRotateX = 2;
		} else if (content === 'PROJECTS') {
			hoverY = 25;
			hoverRotateX = 1.5;
		} else if (content === 'CONTACT') {
			hoverY = 20;
			hoverRotateX = 1;
		} else {
			hoverY = 42;
			hoverRotateX = 1;
		}

		gsap.to(paperRef, {
			y: hoverY,
			rotateX: hoverRotateX,
			duration: 0.3,
			ease: 'power2.out',
			overwrite: 'auto'
		});
	}

	function handleMouseLeave() {
		if (isTransitioning || isAnimating || !paperRef) return;
		isHovering = false;
		
		// Different settle positions for each paper type
		let settleY, settleRotateX;
		if (content === 'ABOUT') {
			settleY = 18;
			settleRotateX = 1;
		} else if (content === 'PROJECTS') {
			settleY = 28;
			settleRotateX = 1.2;
		} else if (content === 'CONTACT') {
			settleY = 22;
			settleRotateX = 0.8;
		} else {
			settleY = 45;
			settleRotateX = 2;
		}

		gsap.to(paperRef, {
			y: settleY,
			rotateX: settleRotateX,
			duration: 0.4,
			ease: 'power2.inOut',
			overwrite: 'auto'
		});
	}

	function handlePaperClick() {
		if (isTransitioning || !visible) return;
		
		// If clicking "PROJECTS", zoom into the projects page
		if (content === 'PROJECTS') {
			zoomIntoPage('/projects');
		} else if (content === 'ABOUT') {
			inspectPaper('/about');
		} else {
			// For other items, we can just do the standard inspect for now
			// but user asked for "zooming into a new web page", so we'll 
			// implement the zoom logic as the default for now.
			zoomIntoPage('/' + content.toLowerCase());
		}
	}

	function inspectPaper(path: string) {
		isTransitioning = true;
		isAnimating = true;

		// Kill any existing settle animations
		gsap.killTweensOf(paperRef);

		const rect = paperRef.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = viewportWidth / 2 - centerX;
		const deltaY = viewportHeight / 2 - centerY;

		const tl = gsap.timeline({
			onComplete: () => {
				(async () => {
					await goto(path);
					// Delay resetting flags to ensure route change is visually stable
					setTimeout(() => {
						isTransitioning = false;
						isAnimating = false;
					}, 100);
				})();
			}
		});

		// Ensure we don't have a jump when changing transformOrigin
		tl.set(paperRef.parentElement, { 
			zIndex: 5000, 
			clipPath: 'none' 
		})
		.set(paperRef, { 
			transformOrigin: 'center center',
			force3D: true
		});

		// Stage 1: Move the paper to dead-center and scale up SIGNIFICANTLY 
		// but NOT covering the whole screen. We want an "inspect" feel.
		tl.to(paperRef, {
			x: `+=${deltaX}`,
			y: `+=${deltaY}`,
			scale: 1.8, // Reduced from 2.2 to be less overwhelming
			rotateX: 0,
			duration: 0.8,
			ease: 'power3.inOut',
			force3D: true
		});

		// Fade out the console slightly but keep it visible (the "inspect" effect)
		tl.to('.console-cover, .console-shell', {
			opacity: 0.3,
			filter: 'blur(4px)',
			duration: 0.8,
			ease: 'power2.inOut',
			force3D: true
		}, '<');
	}

	function zoomIntoPage(path: string) {
		isTransitioning = true;
		isAnimating = true;

		// Kill any existing settle animations
		gsap.killTweensOf(paperRef);

		const rect = paperRef.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = viewportWidth / 2 - centerX;
		const deltaY = viewportHeight / 2 - centerY;
		const currentScale = Number(gsap.getProperty(paperRef, 'scale')) || 1;
		const scaleToCover = Math.max(viewportWidth / rect.width, viewportHeight / rect.height) * 1.05;

		const tl = gsap.timeline({
			onComplete: () => {
				(async () => {
					await goto(path);
					// Delay resetting flags to ensure route change is visually stable
					setTimeout(() => {
						isTransitioning = false;
						isAnimating = false;
					}, 100);
				})();
			}
		});

		// Ensure we don't have a jump when changing transformOrigin
		// and move the paper to the front immediately but smoothly
		tl.set(paperRef.parentElement, { 
			zIndex: 5000, 
			clipPath: 'none' 
		})
		.set(paperRef, { 
			transformOrigin: 'center center',
			force3D: true
		});

		// Stage 1: Move the paper to dead-center
		tl.to(paperRef, {
			x: `+=${deltaX}`,
			y: `+=${deltaY}`,
			rotateX: 0,
			duration: 0.55,
			ease: 'power2.out',
			force3D: true
		});

		// Stage 2: Expand outward to consume the viewport
		tl.to(
			paperRef,
			{
				scale: currentScale * scaleToCover,
				duration: 0.75,
				ease: 'power4.in',
				force3D: true
			},
			'>-0.05'
		);

		// Fade out the console/printer as we zoom into the white paper
		// We target the children of the container to avoid blurring the paper itself
		tl.to('.console-cover, .console-shell', {
			opacity: 0,
			duration: 0.7,
			ease: 'power2.in',
			force3D: true
		}, '<0.1');
	}

	function animatePrint() {
		if (!paperRef || isAnimating || !content) return;
		
		// Prevent concurrent animations
		isAnimating = true;
		lastAnimatedContent = content;

		// Kill any existing animations first
		gsap.killTweensOf(paperRef);
		const shadow = paperRef.querySelector('.paper-sheet-curl-shadow');
		if (shadow) gsap.killTweensOf(shadow);

		const isAbout = content === 'ABOUT';
		const isContact = content === 'CONTACT';
		const startY = -500; // Force start far above to prevent any flash

		const tl = gsap.timeline({
			onComplete: () => {
				isAnimating = false;
				isReady = true;
			}
		});

		// 1. Force the start position far above to prevent any flash
		tl.set(paperRef, {
			y: startY,
			x: 0,
			scale: 1,
			opacity: 1,
			rotateX: 0,
			transformOrigin: 'top center'
		});

		if (shadow) {
			tl.set(shadow, { opacity: 0 });
		}

		if (isAbout) {
			// ABOUT card: Start at -500, slide down continuously
			// The paper is ~120px tall. The mask is at roughly y=0.
			// At y=-120, the bottom of the paper is at y=0 (just touching the mask)
			// So the entire animation goes from -500 (hidden) to final position in phases.
			
			// Stage 1: Slide from -500 to just barely peeking (~1px visible)
			// At y=-119, the bottom edge is at y=1 (1px showing)
			tl.to(paperRef, {
				y: -119,
				rotateX: -1,
				duration: 1.5, // Slow weighted slide from above
				ease: 'power2.out'
			});

			
		
			// Stage 2: Settle
			tl.to(paperRef, {
				y: 18,
				rotateX: 1,
				duration: 0.8, // Slightly faster settle
				ease: 'power2.out',
				onStart: () => {
					// Mark as no longer "printing" so it can be interacted with
					isAnimating = false;
				},
				onComplete: () => {
					// Only mark as ready (shine + hover) after it's fully settled
					isReady = true;
				}
			}, '>-0.2');

			// Shadow fade synchronized with the main feed
			tl.to(shadow, {
				opacity: 1,
				duration: 0.8 // Match settle duration exactly
			}, '<'); 
		} else if (isContact) {
			// CONTACT card: Similar to ABOUT but with different timing
			// Stage 1: Slide from -500 to just barely peeking
			tl.to(paperRef, {
				y: -109, // Contact paper is ~110px tall
				rotateX: -1,
				duration: 1.2,
				ease: 'power2.out'
			});
			
			// Stage 2: Settle
			tl.to(paperRef, {
				y: 22,
				rotateX: 0.8,
				duration: 0.7,
				ease: 'power2.out',
				onStart: () => {
					isAnimating = false;
				},
				onComplete: () => {
					isReady = true;
				}
			}, '>-0.2');

			// Shadow fade
			if (shadow) {
				tl.to(shadow, {
					opacity: 1,
					duration: 0.7
				}, '<');
			}
		} else {
			// Standard cards: Start from -500, move to -210 (safely hidden)
			tl.to(paperRef, { y: -210, duration: 0.01 });

			// Initial peek for standard papers too to avoid "revealing too much"
			tl.to(paperRef, {
				y: -190,
				rotateX: -2,
				duration: 2.0,
				ease: 'power1.out'
			})
			.to(paperRef, {
				y: -30,
				rotateX: -5,
				duration: 3.5,
				ease: 'power1.in'
			})
			.to(shadow, {
				opacity: 1,
				duration: 2.0
			}, '>-2.0')
			.to(paperRef, {
				y: 60,
				rotateX: -8,
				duration: 3.2,
				ease: 'none'
			})
			.to(paperRef, {
				y: 50,
				rotateX: 4,
				duration: 1.0,
				ease: 'power2.out'
			}, '>-0.3')
			.to(paperRef, {
				y: 45,
				rotateX: 2,
				duration: 0.6,
				ease: 'power1.inOut',
				onStart: () => {
					isAnimating = false;
				},
				onComplete: () => {
					isReady = true;
				}
			}, '>-0.2');
		}
	}

	export function reset() {
		if (paperRef) {
			// Prevent snapping back during a transition to avoid flickering
			if (isTransitioning) return;

			gsap.killTweensOf(paperRef);
			gsap.killTweensOf('.console-cover, .console-shell');
			gsap.set(paperRef, { 
				y: -500, // Move back up above viewport/mask
				x: 0,
				scale: 1,
				opacity: 0, 
				rotateX: 0 
			});
			gsap.set('.console-cover, .console-shell', {
				opacity: 1,
				filter: 'blur(0px) brightness(1)'
			});
			isAnimating = false;
			isTransitioning = false;
			lastAnimatedContent = null;
		}
	}
</script>

<div class="paper-container" 
	class:visible 
	class:transitioning={isTransitioning} 
	class:about-paper={content === 'ABOUT'}
	class:projects-paper={content === 'PROJECTS'}
	class:contact-paper={content === 'CONTACT'}
>
	<button 
		class="paper-sheet" 
		class:animating={isAnimating}
		class:ready={isReady}
		bind:this={paperRef}
		onclick={handlePaperClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		aria-label="Inspect paper"
		type="button"
		disabled={isTransitioning}
	>
		<div class="paper-content">
			{#if content !== 'ABOUT' && content !== 'PROJECTS'}
				<div class="paper-header">{content || 'PRINTING...'}</div>
			{/if}
			{#if content === 'PROJECTS'}
				<div class="projects-preview-full">
					<nav class="preview-nav">
						<div class="nav-links">
							<span>Control Panel</span>
							<span>Clones</span>
						</div>
						<div class="beta-tag">BETA</div>
					</nav>

					<header class="preview-header">
						<h1 class="archival-title">PROJECTS</h1>
					</header>

					<div class="section-divider">
						<h2>LATEST WORKS ADDED</h2>
					</div>

					<div class="preview-project-grid">
						{#each projects as project}
							<div class="preview-project-card">
								<div class="card-header">
									<div class="header-row">
										<div class="label">Title</div>
										<div class="value">{project.title}</div>
									</div>
									<div class="header-row author">
										<div class="label">Author</div>
										<div class="value">{project.author}</div>
									</div>
								</div>
								<div class="card-image">
									<div class="image-inner">
										<img src={project.image} alt={project.title} />
									</div>
								</div>
								<div class="card-footer-desc">
									<div class="desc-label">Notes:</div>
									<div class="desc-text">{project.description}</div>
								</div>
							</div>
						{/each}
					</div>

					<footer class="preview-footer">
						<div class="footer-content">
							<div class="footer-left">© 2026 TIMOTHY ITAYI</div>
							<div class="footer-right">JAN 24 2026</div>
						</div>
					</footer>
				</div>
			{:else if content === 'ABOUT'}
				<div class="zine-content">
					<div class="zine-header-compact">
						<div class="zine-top-right-image">
							<img src="/about/top-right-corner.jpg" alt="Decoration" />
						</div>
					</div>
					<div class="zine-subheader-compact">SYSTEM ENGINEER / CREATIVE DEVELOPER</div>
					<div class="zine-body">
						<div class="zine-left-compact">
							<div class="zine-fig-label">[fig.1.1]</div>
							<div class="zine-image-placeholder">
								<img src="/about/about-image-1.jpeg" alt="Timothy" class="zine-photo" />
								<div class="zine-pixel-cat"></div>
							</div>
							<div class="zine-caption">Timothy</div>
						</div>
						<div class="zine-right">
							<div class="zine-headline">THE ENGINEER</div>
							<div class="zine-text">
								I am a software engineer based in Melbourne, originally from Zimbabwe. I grew up in New Zealand and now live in Australia with my wife. I am an avid sports fan—I don't follow many but do enjoy it when I see it. I enjoy F1, endurance racing, dirt rally, UFC and boxing. I'm passionate about building thoughtful software that balances practical engineering with creative design...
							</div>
						</div>
					</div>
				</div>
			{:else if content === 'CONTACT'}
				<div class="contact-preview-full">
					<h1 class="contact-title">CONTACT</h1>
					<p class="contact-description">Feel free to reach out for collaborations or just a chat.</p>
					<div class="contact-button">GO BACK</div>
				</div>
			{:else}
				<div class="paper-line"></div>
				<div class="paper-line"></div>
				<div class="paper-line short"></div>
			{/if}
		</div>
		<div class="paper-sheet-curl-shadow"></div>
	</button>
</div>
