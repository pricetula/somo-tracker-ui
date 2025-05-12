<script lang="ts">
	import '@somo-tracker-ui/tailwindcss/app.css';
	import '../app.css';
	import Nav from '$lib/components/common/nav/nav.svelte';

	let { children } = $props();
</script>

<main>
	<Nav />
	{@render children()}
</main>
