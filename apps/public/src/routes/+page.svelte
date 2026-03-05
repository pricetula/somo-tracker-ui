<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import Navbar from "$lib/components/sections/Navbar.svelte";
    import Hero from "$lib/components/sections/Hero.svelte";
    import EfficiencyGap from "$lib/components/sections/EfficiencyGap.svelte";
    import ValueShowcase from "$lib/components/sections/ValueShowcase.svelte";
    import ROICalculator from "$lib/components/sections/ROICalculator.svelte";
    import WaitlistProgress from "$lib/components/sections/WaitlistProgress.svelte";
    import ImplementationRoadmap from "$lib/components/sections/ImplementationRoadmap.svelte";
    import FooterCTA from "$lib/components/sections/FooterCTA.svelte";
    import Footer from "$lib/components/sections/Footer.svelte";

    let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
    <title
        >Somotracker – Zero Printing. Zero Waste. 100% Academic Insight.</title
    >
    <meta
        name="description"
        content="Turn raw student data into actionable intelligence with AI forecasts that flag struggling students weeks earlier than traditional methods."
    />
</svelte:head>

<Navbar />

<main>
    {#if form?.success}
        <div
            class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl"
        >
            🎉 You're on the waitlist! We'll be in touch soon.
        </div>
    {/if}

    <section class="max-w-7xl mx-auto text-sm">
        <Hero />
        <EfficiencyGap />
        <ValueShowcase />
        <ROICalculator />
        <WaitlistProgress />
        <ImplementationRoadmap />
    </section>

    <FooterCTA />
    <Footer />
</main>
