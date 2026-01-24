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
			// Phase 3: Gentle curl and settle
			.to(
				paperRef,
				{
					y: 50, /* Raised final position */
					rotateX: 4,
					duration: 1.6, /* Sped up by 20% */
					ease: 'power1.out'
				},
				'>-0.4'
			)
			.to(
				paperRef,
				{
					y: 45, /* Final resting position - higher than before */
					rotateX: 2,
					duration: 1.0, /* Sped up by 20% */
					ease: 'power1.inOut'
				},
				'>-0.3'
			);
	}

	export function reset() {
		if (paperRef) {
			gsap.killTweensOf(paperRef);
			gsap.set(paperRef, { 
				y: 0, 
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
