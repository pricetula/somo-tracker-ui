<script lang="ts">
	import '@somo-tracker-ui/tailwindcss/app.css';
	import '../app.css';
	import Nav from '$lib/components/common/nav/nav.svelte';

	let { children } = $props();
</script>

<main class="container mx-auto px-4">
	<Nav />
	{@render children()}
</main>
