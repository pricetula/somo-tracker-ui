<script lang="ts">
	import '@somo-tracker-ui/tailwindcss/app.css';
	import '../app.css';
	import Nav from '$lib/components/common/nav/nav.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<main class="container mx-auto px-4 relative">
	<div class="absolute top-4 right-4 z-10">
		<ThemeToggle />
	</div>
	<Nav />
	{@render children()}
</main>
