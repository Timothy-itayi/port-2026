<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let formStatus = 'idle'; // idle, sending, sent, error
	let messageInput: HTMLTextAreaElement;

	const contactMethods = [
		{ icon: '✉', label: 'EMAIL', value: 'hello@timothyitayi.com', href: 'mailto:hello@timothyitayi.com' },
		{ icon: '◉', label: 'GITHUB', value: '@timothyitayi', href: 'https://github.com/timothyitayi' },
		{ icon: '◈', label: 'LINKEDIN', value: '/in/timothyitayi', href: 'https://linkedin.com/in/timothyitayi' }
	];

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		formStatus = 'sending';
		
		// Simulate send
		await new Promise(resolve => setTimeout(resolve, 1500));
		formStatus = 'sent';
		
		// Reset after 3s
		setTimeout(() => {
			formStatus = 'idle';
			if (messageInput) messageInput.value = '';
		}, 3000);
	};

	onMount(() => {
		gsap.from('.contact-section', {
			opacity: 0,
			y: 15,
			duration: 0.3,
			stagger: 0.1,
			ease: 'power2.out'
		});
	});
</script>

<div class="mobile-contact">
	<!-- Header -->
	<div class="page-header contact-section">
		<div class="header-icon">◈</div>
		<div class="header-text">
			<h1 class="header-title">CONTACT</h1>
			<div class="header-sub">ESTABLISH COMMUNICATION</div>
		</div>
	</div>

	<!-- Status -->
	<div class="status-block contact-section">
		<div class="status-row">
			<span class="status-key">CHANNEL</span>
			<span class="status-val active">OPEN</span>
		</div>
		<div class="status-row">
			<span class="status-key">RESPONSE</span>
			<span class="status-val">~24H</span>
		</div>
	</div>

	<!-- Contact Methods -->
	<div class="methods-section contact-section">
		<div class="section-label">DIRECT CHANNELS</div>
		{#each contactMethods as method}
			<a href={method.href} class="method-link" target="_blank" rel="noopener">
				<span class="method-icon">{method.icon}</span>
				<div class="method-info">
					<span class="method-label">{method.label}</span>
					<span class="method-value">{method.value}</span>
				</div>
				<span class="method-arrow">▸</span>
			</a>
		{/each}
	</div>

	<!-- Message Form -->
	<form class="message-form contact-section" onsubmit={handleSubmit}>
		<div class="section-label">SEND TRANSMISSION</div>
		
		<div class="form-field">
			<label class="field-label" for="name">IDENTIFIER</label>
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
			<label class="field-label" for="email">RETURN CHANNEL</label>
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
			<label class="field-label" for="message">MESSAGE</label>
			<textarea 
				id="message" 
				class="field-input textarea" 
				placeholder="Enter your message..."
				rows="4"
				required
				disabled={formStatus === 'sending'}
				bind:this={messageInput}
			></textarea>
		</div>

		<button 
			type="submit" 
			class="submit-btn"
			class:sending={formStatus === 'sending'}
			class:sent={formStatus === 'sent'}
			disabled={formStatus === 'sending' || formStatus === 'sent'}
		>
			{#if formStatus === 'idle'}
				<span class="btn-icon">▸</span>
				<span>TRANSMIT</span>
			{:else if formStatus === 'sending'}
				<span class="btn-loader">◌</span>
				<span>SENDING...</span>
			{:else if formStatus === 'sent'}
				<span class="btn-icon">✓</span>
				<span>TRANSMITTED</span>
			{/if}
		</button>
	</form>

	<!-- Footer -->
	<div class="page-footer contact-section">
		<span class="footer-text">Ready for collaborations or just a chat.</span>
	</div>
</div>

<style>
	.mobile-contact {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: #e4e8eb;
		font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
	}

	/* Header */
	.page-header {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-bottom: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.header-icon {
		font-size: 1.6rem;
		color: #7dd3c0;
	}

	.header-text {
		flex: 1;
	}

	.header-title {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin: 0;
		color: #e4e8eb;
	}

	.header-sub {
		font-size: 0.65rem;
		color: rgba(228, 232, 235, 0.45);
		letter-spacing: 0.08em;
		font-weight: 500;
	}

	/* Status */
	.status-block {
		display: flex;
		gap: 12px;
	}

	.status-row {
		flex: 1;
		display: flex;
		justify-content: space-between;
		padding: 12px 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
	}

	.status-key {
		font-size: 0.65rem;
		color: rgba(228, 232, 235, 0.4);
		font-weight: 600;
	}

	.status-val {
		font-size: 0.7rem;
		font-weight: 600;
		color: #e4e8eb;
	}

	.status-val.active {
		color: #7dd3c0;
	}

	/* Section Label */
	.section-label {
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: rgba(228, 232, 235, 0.4);
		margin-bottom: 10px;
	}

	/* Contact Methods */
	.methods-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.method-link {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.method-link:hover,
	.method-link:active {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
		transform: translateY(-2px);
	}

	.method-icon {
		font-size: 1.2rem;
		color: #7dd3c0;
		width: 28px;
		text-align: center;
	}

	.method-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.method-label {
		font-size: 0.65rem;
		color: rgba(228, 232, 235, 0.45);
		font-weight: 600;
		letter-spacing: 0.06em;
	}

	.method-value {
		font-size: 0.9rem;
		color: #e4e8eb;
		font-weight: 500;
	}

	.method-arrow {
		color: rgba(228, 232, 235, 0.3);
		transition: all 0.2s ease;
	}

	.method-link:hover .method-arrow,
	.method-link:active .method-arrow {
		transform: translateX(4px);
		color: #7dd3c0;
	}

	/* Form */
	.message-form {
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
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: rgba(228, 232, 235, 0.5);
	}

	.field-input {
		padding: 14px 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: #e4e8eb;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 500;
		outline: none;
		transition: all 0.2s ease;
	}

	.field-input::placeholder {
		color: rgba(228, 232, 235, 0.3);
	}

	.field-input:focus {
		border-color: rgba(125, 211, 192, 0.4);
		background: rgba(255, 255, 255, 0.05);
	}

	.field-input:disabled {
		opacity: 0.5;
	}

	.field-input.textarea {
		resize: vertical;
		min-height: 100px;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 16px;
		background: linear-gradient(135deg, #7dd3c0 0%, #5ebc9a 100%);
		border: none;
		border-radius: 12px;
		color: #12161c;
		font-family: inherit;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(125, 211, 192, 0.3);
	}

	.submit-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	.submit-btn:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.submit-btn.sending {
		background: rgba(255, 255, 255, 0.1);
		color: #e4e8eb;
	}

	.submit-btn.sent {
		background: linear-gradient(135deg, #7dd3c0 0%, #5ebc9a 100%);
	}

	.btn-icon {
		font-size: 1rem;
	}

	.btn-loader {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* Footer */
	.page-footer {
		text-align: center;
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.footer-text {
		font-size: 0.75rem;
		color: rgba(228, 232, 235, 0.45);
		font-style: italic;
		font-weight: 500;
	}
</style>
