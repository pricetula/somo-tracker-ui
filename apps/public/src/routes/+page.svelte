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

    const siteUrl = "https://somotracker.com";
    const title = "Somotracker – Zero Printing. Zero Waste. 100% Academic Insight.";
    const description = "Eliminate manual grading and printing costs with AI-powered assessments. Catch struggling students weeks earlier with real-time predictive analytics built for African schools.";
    const ogImage = `${siteUrl}/og-image.png`;
</script>

<svelte:head>
    <!-- Primary -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={siteUrl} />

    <!-- Keywords -->
    <meta name="keywords" content="school management software, AI grading, student assessment, predictive analytics education, paperless school, Kenya EdTech, academic tracking, learning gaps" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Somotracker" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Somotracker – AI-powered academic assessment platform" />
    <meta property="og:locale" content="en_KE" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@somotracker" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content="Somotracker – AI-powered academic assessment platform" />

    <!-- JSON-LD: Organization -->
    {@html `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Somotracker",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.svg`,
        "description": description,
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@somotracker.com",
            "contactType": "customer support"
        }
    })}</script>`}

    <!-- JSON-LD: WebPage -->
    {@html `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": siteUrl,
        "description": description,
        "inLanguage": "en-KE",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Somotracker",
            "url": siteUrl
        }
    })}</script>`}

    <!-- JSON-LD: SoftwareApplication -->
    {@html `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Somotracker",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KES",
            "description": "60-day free pilot, no credit card required"
        },
        "description": description,
        "url": siteUrl
    })}</script>`}
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

    <section class="max-w-5xl mx-auto text-sm">
        <Hero />
        <EfficiencyGap />
        <ValueShowcase />
        <ROICalculator />
        <WaitlistProgress />
        <ImplementationRoadmap />
    </section>

    <!-- <FooterCTA /> -->
    <Footer />
</main>
