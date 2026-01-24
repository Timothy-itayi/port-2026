<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import './paper.css';

	export let content: string = '';
	export let visible: boolean = false;

	let paperRef: HTMLElement;
	let isAnimating = false;
	let lastAnimatedContent: string | null = null;

	$: if (visible && !isAnimating && content && content !== lastAnimatedContent) {
		animatePrint();
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
			delay: 0.5, /* 0.5s delay after button press to prevent jolt */
			onComplete: () => {
				isAnimating = false;
			}
		});

		// Reset paper state - start completely hidden inside the printer
		gsap.set(paperRef, {
			y: -200, /* Hidden deep behind the visor */
			opacity: 1,
			rotateX: 0,
			transformOrigin: 'top center'
		});

		if (shadow) {
			gsap.set(shadow, { opacity: 0 });
		}

		// Phase 1: Extremely slow initial sliver emergence
		tl.to(paperRef, {
			y: -185, /* Just a tiny sliver revealed first */
			rotateX: -1,
			duration: 1.0,
			ease: 'power1.in'
		})
			.to(
				shadow,
				{
					opacity: 0.4,
					duration: 0.8
				},
				'<'
			)
			// Phase 2: Steady mechanical slide to reveal content
			.to(
				paperRef,
				{
					y: 45, /* Full reveal point */
					rotateX: -6,
					duration: 2.2, /* Much faster reveal */
					ease: 'none'
				},
				'>'
			)
			// Phase 3: Fast settle into final resting position
			.to(
				paperRef,
				{
					y: 35,
					rotateX: 3,
					duration: 0.8,
					ease: 'power2.out'
				},
				'>-0.3'
			)
			.to(
				paperRef,
				{
					y: 30, /* Final resting position - significantly higher */
					rotateX: 1,
					duration: 0.6,
					ease: 'power1.inOut'
				},
				'>-0.2'
			)
			.to(
				shadow,
				{
					opacity: 1,
					duration: 0.6
				},
				'<'
			);
	}

	export function reset() {
		if (paperRef) {
			gsap.killTweensOf(paperRef);
			const shadow = paperRef.querySelector('.paper-sheet-curl-shadow');
			if (shadow) gsap.killTweensOf(shadow);
			gsap.set(paperRef, { 
				y: -200, 
				opacity: 0, 
				rotateX: 0 
			});
			isAnimating = false;
			lastAnimatedContent = null;
		}
	}
</script>

<div class="paper-container" class:visible>
	<div class="paper-sheet" bind:this={paperRef}>
		<div class="paper-content">
			<div class="paper-header">{content || 'PRINTING...'}</div>
			<div class="paper-line"></div>
			<div class="paper-line"></div>
			<div class="paper-line short"></div>
		</div>
		<div class="paper-sheet-curl-shadow"></div>
	</div>
</div>
