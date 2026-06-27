<script>
	import favicon from '$lib/assets/favicon.svg';
  import { Styles } from '@sveltestrap/sveltestrap';

	let { children } = $props();
</script>
<Styles />
<!-- <slot /> -->

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--paper: #faf6ee;
		--ink: #1a1a1a;
		--ink-soft: #5c574c;
		--accent: #c1502e;
		--accent-secondary: #2d4a3e;
		--rule: #d8d2c2;
		--font-display: "Fraunces", Georgia, serif;
		--font-body: "Inter", system-ui, sans-serif;
		--font-mono: "JetBrains Mono", "Courier New", monospace;
	}

	:global(body) {
		background: var(--paper);
		color: var(--ink);
		font-family: var(--font-body);
		margin: 0;
	}
</style>