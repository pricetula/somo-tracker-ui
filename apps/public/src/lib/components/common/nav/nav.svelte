<script>
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Logo from '../logo/logo.svelte';
</script>

<nav class="fixed top-0 left-0 w-screen h-[60px] px-6 bg-background">
	<div class="container-custom h-full flex items-center justify-between">
		<Logo />
		<ThemeToggle />
		<ModeWatcher />
	</div>
</nav>
