<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import './paper.css';

	export let content: string = '';
	export let visible: boolean = false;

	let paperRef: HTMLElement;
	let isAnimating = false;
	let isInspected = false;
	let lastAnimatedContent: string | null = null;

	$: if (visible && !isAnimating && content && content !== lastAnimatedContent) {
		animatePrint();
	}

	function handlePaperClick() {
		if (isAnimating || !visible) return;
		
		isInspected = !isInspected;
		if (isInspected) {
			inspectPaper();
		} else {
			uninspectPaper();
		}
	}

	function inspectPaper() {
		isAnimating = true;
		gsap.to(paperRef, {
			x: -280, /* Move left toward center of console */
			y: -60,  /* Move up toward vertical center */
			scale: 2.2,
			rotateX: 0,
			duration: 0.8,
			ease: 'power3.inOut',
			onComplete: () => {
				isAnimating = false;
			}
		});
	}

	function uninspectPaper() {
		isAnimating = true;
		gsap.to(paperRef, {
			x: 0,
			y: 45, /* Back to resting position */
			scale: 1,
			rotateX: 2,
			duration: 0.8,
			ease: 'power3.inOut',
			onComplete: () => {
				isAnimating = false;
			}
		});
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
			gsap.killTweensOf(paperRef);
			gsap.set(paperRef, { 
				y: 0, 
				x: 0,
				scale: 1,
				opacity: 0, 
				rotateX: 0 
			});
			isAnimating = false;
			isInspected = false;
			lastAnimatedContent = null;
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	class="paper-backdrop" 
	class:visible={isInspected} 
	onclick={handlePaperClick}
></div>

<div class="paper-container" class:visible class:inspected={isInspected}>
	<button 
		class="paper-sheet" 
		bind:this={paperRef}
		onclick={handlePaperClick}
		aria-label="Inspect paper"
	>
		<div class="paper-content">
			<div class="paper-header">{content || 'PRINTING...'}</div>
			<div class="paper-line"></div>
			<div class="paper-line"></div>
			<div class="paper-line short"></div>
		</div>
		<div class="paper-sheet-curl-shadow"></div>
	</button>
</div>
