<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { ArrowDown, Check } from "@lucide/svelte";
    import JoinWaitList from "./JoinWaitList.svelte";

    let email = $state("");

    function scrollDown() {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
</script>

<section class="relative min-h-screen flex items-center justify-center px-4">
    <header class="w-full grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column -->
        <div>
            <h1 class="text-4xl font-bold tracking-tight leading-tight mb-4">
                <span class="hero-line hero-line-1">Zero Printing.</span>
                <br />
                <span class="hero-line hero-line-2">Zero Waste.</span>
                <br />
                <span class="hero-line hero-line-3"> 100% Academic Insight.</span>
            </h1>

            <p class="mb-4 hero-p">
                Eliminate administrative overhead and printing costs. Harness
                real-time academic data insights to identify struggling students
                early and guide them toward a successful, personalized learning
                path.
            </p>

            <ul class="space-y-1 text-xs mb-8">
                <li class="flex items-center gap-1 hero-check hero-check-1">
                    <Check size="14" class="text-green-500" />
                    <span>Assessments</span>
                </li>
                <li class="flex items-center gap-1 hero-check hero-check-2">
                    <Check size="14" class="text-green-500" />
                    <span>AI-Driven Gap Forecasting</span>
                </li>
                <li class="flex items-center gap-1 hero-check hero-check-3">
                    <Check size="14" class="text-green-500" />
                    <span>Setup in &lt; 2 hours</span>
                </li>
            </ul>

            <div class="hero-cta">
                <JoinWaitList />
            </div>

            <p class="text-xs text-muted-foreground hero-subtext">
                No credit card required · 60-day free pilot
            </p>
        </div>

        <!-- Right Column - Hero Visual placeholder -->
        <img
            src="/team.svg"
            alt="collaborate with somotracker"
            class="w-90 hidden lg:block hero-image"
        />
    </header>

    <!-- Scroll Indicator -->
    <button
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary hero-scroll"
        onclick={scrollDown}
    >
        <ArrowDown class="w-6 h-6 animate-bounce" />
    </button>
</section>

<style>
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes subtleRotate {
        0%, 100% { transform: rotate(0deg); }
        50%       { transform: rotate(2deg); }
    }

    .hero-line, .hero-p, .hero-check, .hero-cta, .hero-subtext, .hero-scroll {
        opacity: 0;
        animation: fadeUp 0.6s ease-out forwards;
    }

    .hero-line-1  { animation-delay: 0.1s; }
    .hero-line-2  { animation-delay: 0.25s; }
    .hero-line-3  { animation-delay: 0.4s; }
    .hero-p       { animation-delay: 0.55s; }
    .hero-check-1 { animation-delay: 0.65s; }
    .hero-check-2 { animation-delay: 0.75s; }
    .hero-check-3 { animation-delay: 0.85s; }
    .hero-cta     { animation-delay: 1s; }
    .hero-subtext { animation-delay: 1.1s; }
    .hero-scroll  { animation-delay: 1.4s; }

    .hero-image {
        animation:
            fadeIn 2s ease-out forwards,
            subtleRotate 4s ease-in-out infinite;
        animation-delay: 0s, 2s;
    }
</style>
