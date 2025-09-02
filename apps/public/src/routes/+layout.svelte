<script lang="ts">
	import '@somo-tracker-ui/tailwindcss/app.css';
	import '../app.css';
	import Nav from '$lib/components/common/nav/nav.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/common/footer/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>SomoTracker – Academic Progression Tool</title>
	<meta
		name="description"
		content="Track student progress, set academic goals, and analyze performance in real-time. Centralized, collaborative, and data-driven."
	/>
	<meta
		name="keywords"
		content="academic progression, student tracking, education analytics, goal setting, performance dashboard"
	/>
	<meta name="author" content="SomoTracker Team" />

	<!-- Open Graph -->
	<meta property="og:title" content="SomoTracker – Academic Progression Tool" />
	<meta
		property="og:description"
		content="Real-time academic tracking and performance insights for educators and students."
	/>
	<!-- <meta property="og:image" content="/preview.jpg" /> -->
	<!-- Replace with actual image -->
	<meta property="og:url" content="https://somo-tracker-web.onrender.com" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="SomoTracker – Academic Progression Tool" />
	<meta
		name="twitter:description"
		content="Real-time academic tracking and performance insights for educators and students."
	/>
	<!-- <meta name="twitter:image" content="/preview.jpg" /> -->

	<link rel="canonical" href="https://somo-tracker-web.onrender.com" />
</svelte:head>

<ModeWatcher />
<main class="container relative mx-auto px-4">
	<div class="absolute right-4 top-4 z-10">
		<ThemeToggle />
	</div>
	<Nav />
	{@render children()}
	<Footer />
</main>
