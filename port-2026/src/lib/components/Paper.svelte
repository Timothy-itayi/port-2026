<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import './paper.css';

	export let content: string = '';
	export let visible: boolean = false;

	let paperRef: HTMLElement;
	let isAnimating = false;
	let isTransitioning = false;
	let lastAnimatedContent: string | null = null;

	onMount(() => {
		isTransitioning = false;
		isAnimating = false;
	});

	$: if (visible && !isAnimating && content && content !== lastAnimatedContent) {
		animatePrint();
	}

	function handlePaperClick() {
		if (isAnimating || isTransitioning || !visible) return;
		
		// If clicking "PROJECTS", zoom into the projects page
		if (content === 'PROJECTS') {
			zoomIntoPage('/projects');
		} else {
			// For other items, we can just do the standard inspect for now
			// but user asked for "zooming into a new web page", so we'll 
			// implement the zoom logic as the default for now.
			zoomIntoPage('/' + content.toLowerCase());
		}
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
			onComplete: async () => {
				await goto(path);
				// Delay resetting flags to ensure route change is visually stable
				setTimeout(() => {
					isTransitioning = false;
					isAnimating = false;
				}, 100);
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

		const tl = gsap.timeline({
			onComplete: () => {
				isAnimating = false;
			}
		});

		// Reset paper state - start hidden deep inside the printer (negative y)
		gsap.set(paperRef, {
			y: -180, /* Tucked way up behind the visor and black bar */
			opacity: 1,
			rotateX: 0,
			transformOrigin: 'top center'
		});

		if (shadow) {
			gsap.set(shadow, { opacity: 0 });
		}

		// Phase 1: Slow emergence - reveals the bottom edge first, then middle
		tl.to(paperRef, {
			y: -30, /* Raised final reveal point */
			rotateX: -5,
			duration: 2.8, /* Sped up by 20% */
			ease: 'power1.in'
		})
			.to(
				shadow,
				{
					opacity: 1,
					duration: 1.6 /* Sped up by 20% */
				},
				'>-1.6'
			)
			// Phase 2: Steady gradual slide to full reveal
			.to(
				paperRef,
				{
					y: 60, /* Raised final position */
					rotateX: -8,
					duration: 3.2, /* Sped up by 20% */
					ease: 'none'
				},
				'>'
			)
			// Phase 3: Gentle curl and settle (Sped up by 40%)
			.to(
				paperRef,
				{
					y: 50,
					rotateX: 4,
					duration: 1.0, /* Reduced from 1.6 */
					ease: 'power2.out'
				},
				'>-0.3'
			)
			.to(
				paperRef,
				{
					y: 45,
					rotateX: 2,
					duration: 0.6, /* Reduced from 1.0 */
					ease: 'power1.inOut'
				},
				'>-0.2'
			);
	}

	export function reset() {
		if (paperRef) {
			// Prevent snapping back during a transition to avoid flickering
			if (isTransitioning) return;

			gsap.killTweensOf(paperRef);
			gsap.killTweensOf('.console-container');
			gsap.set(paperRef, { 
				y: 0, 
				x: 0,
				scale: 1,
				opacity: 0, 
				rotateX: 0 
			});
			gsap.set('.console-container', {
				opacity: 1,
				filter: 'blur(0px) brightness(1)'
			});
			isAnimating = false;
			isTransitioning = false;
			lastAnimatedContent = null;
		}
	}
</script>

<div class="paper-container" class:visible class:transitioning={isTransitioning}>
	<button 
		class="paper-sheet" 
		bind:this={paperRef}
		onclick={handlePaperClick}
		aria-label="Inspect paper"
	>
		<div class="paper-content">
			<div class="paper-header">{content || 'PRINTING...'}</div>
			{#if content === 'PROJECTS'}
				<div class="preview-projects">
					<div class="preview-grid">
						<div class="preview-card"></div>
						<div class="preview-card"></div>
						<div class="preview-card"></div>
						<div class="preview-card"></div>
					</div>
				</div>
			{:else if content === 'GITHUB'}
				<div class="preview-github">
					<div class="preview-line long"></div>
					<div class="preview-line medium"></div>
					<div class="preview-line short"></div>
				</div>
			{:else if content === 'EMAIL'}
				<div class="preview-email">
					<div class="preview-line medium"></div>
					<div class="preview-line long"></div>
					<div class="preview-line short"></div>
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
