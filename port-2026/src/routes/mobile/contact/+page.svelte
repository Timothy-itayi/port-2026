<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let formStatus = $state('idle');
	let messageInput: HTMLTextAreaElement;

	const contactMethods = [
		{ icon: '✉', label: 'Email', value: 'hello@timothyitayi_icloud.com', href: 'mailto:hello@timothyitayi_icloud.com' },
		{ icon: '◉', label: 'GitHub', value: '@timothyitayi', href: 'https://github.com/timothyitayi' },
		{ icon: '◈', label: 'LinkedIn', value: '/in/timothyitayi', href: 'https://linkedin.com/in/timothyitayi' }
	];

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		formStatus = 'sending';
		await new Promise(resolve => setTimeout(resolve, 1500));
		formStatus = 'sent';
		setTimeout(() => {
			formStatus = 'idle';
			if (messageInput) messageInput.value = '';
		}, 3000);
	};

	onMount(() => {
		gsap.from('.contact-section', {
			opacity: 0,
			y: 12,
			duration: 0.3,
			stagger: 0.08,
			ease: 'power2.out'
		});
	});
</script>

<div class="gtv-contact">
	<!-- Header -->
	<header class="contact-header contact-section">
		<h1 class="header-title">Contact</h1>
		<p class="header-sub">Let's connect</p>
	</header>

	<!-- Contact Methods -->
	<section class="methods contact-section">
		{#each contactMethods as method}
			<a href={method.href} class="method-card" target="_blank" rel="noopener">
				<span class="method-icon">{method.icon}</span>
				<div class="method-info">
					<span class="method-label">{method.label}</span>
					<span class="method-value">{method.value}</span>
				</div>
				<span class="method-arrow">›</span>
			</a>
		{/each}
	</section>

	<!-- Message Form -->
	<form class="form-section contact-section" onsubmit={handleSubmit}>
		<h2 class="section-title">Send a message</h2>

		<div class="form-field">
			<label class="field-label" for="name">Name</label>
			<input
				type="text"
				id="name"
				class="field-input"
				placeholder="Your name"
				required
				disabled={formStatus === 'sending'}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="email">Email</label>
			<input
				type="email"
				id="email"
				class="field-input"
				placeholder="your@email.com"
				required
				disabled={formStatus === 'sending'}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="message">Message</label>
			<textarea
				id="message"
				class="field-input textarea"
				placeholder="What's on your mind?"
				rows="4"
				required
				disabled={formStatus === 'sending'}
				bind:this={messageInput}
			></textarea>
		</div>

		<button
			type="submit"
			class="submit-btn"
			disabled={formStatus === 'sending' || formStatus === 'sent'}
		>
			{#if formStatus === 'idle'}
				Send
			{:else if formStatus === 'sending'}
				Sending...
			{:else if formStatus === 'sent'}
				Sent ✓
			{/if}
		</button>
	</form>
</div>

<style>
	.gtv-contact {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		color: #e8e8e8;
		font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100%;
	}

	.contact-header {
		padding-top: 8px;
	}

	.header-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 4px;
		color: #e8e8e8;
	}

	.header-sub {
		font-size: 0.9rem;
		color: #999;
		margin: 0;
	}

	.methods {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-radius: 14px;
		overflow: hidden;
	}

	.method-card {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px;
		background: #1a1a1a;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: background 0.2s;
	}

	.method-card:last-child {
		border-bottom: none;
	}

	.method-card:active {
		background: #222;
	}

	.method-icon {
		font-size: 1.2rem;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.method-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.method-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #e8e8e8;
	}

	.method-value {
		font-size: 0.78rem;
		color: #999;
	}

	.method-arrow {
		font-size: 1.2rem;
		color: #555;
	}

	.section-title {
		font-size: 1rem;
		font-weight: 600;
		color: #e8e8e8;
		margin: 0 0 16px;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #999;
	}

	.field-input {
		padding: 14px 16px;
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		color: #e8e8e8;
		font-family: inherit;
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.field-input::placeholder {
		color: #555;
	}

	.field-input:focus {
		border-color: rgba(138, 180, 248, 0.5);
	}

	.field-input:disabled {
		opacity: 0.5;
	}

	.field-input.textarea {
		resize: vertical;
		min-height: 100px;
	}

	.submit-btn {
		padding: 16px;
		background: #fff;
		border: none;
		border-radius: 28px;
		color: #0a0a0a;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-btn:active:not(:disabled) {
		transform: scale(0.98);
		background: #eee;
	}

	.submit-btn:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
</style>
