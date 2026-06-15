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
