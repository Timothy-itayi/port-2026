<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import './console.css';

	let sliderActive = false;

	const typeLine = (
		element: HTMLElement | null,
		text: string,
		duration = 1.6
	) => {
		if (!element) return;
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

	onMount(() => {
		const lineOne = document.querySelector<HTMLElement>('[data-terminal-line="1"]');
		const lineTwo = document.querySelector<HTMLElement>('[data-terminal-line="2"]');
		const prompt = document.querySelector<HTMLElement>('[data-terminal-line="3"]');

		typeLine(lineOne, 'SYSTEM READY', 1.1);
		gsap.delayedCall(1.4, () => typeLine(lineTwo, 'PORTFOLIO MODULE LOADED', 1.6));
		gsap.delayedCall(3.3, () => typeLine(prompt, '> SELECT COMMAND', 1.1));

		const slider = document.querySelector<HTMLElement>('.slider');
		const sliderKnob = document.querySelector<HTMLElement>('.slider-knob');

		const toggleSlider = () => {
			if (!sliderKnob) return;
			sliderActive = !sliderActive;
			gsap.to(sliderKnob, {
				x: sliderActive ? 140 : 0,
				duration: 0.25,
				ease: 'power2.out'
			});
		};

		slider?.addEventListener('click', toggleSlider);

		const buttons = document.querySelectorAll<HTMLElement>('.tactile-button');
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				gsap.fromTo(
					button,
					{ y: 0 },
					{ y: 2, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.out' }
				);
			});
		});

		return () => {
			slider?.removeEventListener('click', toggleSlider);
		};
	});
</script>

<svelte:head>
	<title>Tactile Console UI</title>
</svelte:head>

<main class="stage">
	<section class="console-container">
		<div class="console-shell">
			<div class="console-shell-shadow"></div>
			<div class="console-shell-highlight"></div>

			<div class="console-housing">
				<div class="console-housing-inner">
					<div class="console-top">
						<div class="top-title">COMMAND UNIT</div>
						<div class="top-strip">
							<span></span>
							<span></span>
						</div>
					</div>

					<div class="console-body">
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

							<div class="console-sliders">
								<div class="slider">
									<div class="slider-track"></div>
									<div class="slider-knob"></div>
								</div>
								<div class="slider">
									<div class="slider-track"></div>
									<div class="slider-knob"></div>
								</div>
							</div>

							<div class="console-knobs">
								<div class="knob">
									<div class="knob-face"></div>
									<div class="knob-notch"></div>
								</div>
								<div class="knob">
									<div class="knob-face"></div>
									<div class="knob-notch"></div>
								</div>
								<div class="knob">
									<div class="knob-face"></div>
									<div class="knob-notch"></div>
								</div>
							</div>
						</div>

						<div class="console-right">
							<div class="button-cluster">
								{#each ['APPS', 'WEBSITES', 'COLLABS', 'BLOG'] as label}
									<div class="button-wrapper">
										<button class="tactile-button" aria-label={label}>
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

							<div class="button-cluster small">
								{#each ['EMAIL', 'GITHUB'] as label}
									<div class="button-wrapper">
										<button class="tactile-button small" aria-label={label}>
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
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
