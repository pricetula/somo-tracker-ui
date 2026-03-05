<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { ArrowDown, Check } from "@lucide/svelte";

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
                <span>Zero Printing.</span>
                <br />
                <span>Zero Waste.</span>
                <br />
                <span> 100% Academic Insight.</span>
            </h1>

            <p class="mb-4">
                Eliminate administrative overhead and printing costs. Harness
                real-time academic data insights to identify struggling students
                early and guide them toward a successful, personalized learning
                path.
            </p>

            <ul class="space-y-1 text-xs mb-8">
                <li class="flex items-center gap-1">
                    <Check size="14" class="text-green-500" />
                    <span>Assessments</span>
                </li>
                <li class="flex items-center gap-1">
                    <Check size="14" class="text-green-500" />
                    <span>AI-Driven Gap Forecasting</span>
                </li>
                <li class="flex items-center gap-1">
                    <Check size="14" class="text-green-500" />
                    <span>Setup in &lt; 2 hours</span>
                </li>
            </ul>

            <form
                method="POST"
                action="?/subscribe"
                class="flex flex-col sm:flex-row gap-4 max-w-[380px] mb-2"
            >
                <Input
                    type="email"
                    name="email"
                    bind:value={email}
                    placeholder="principal@school.edu"
                    required
                />
                <Button type="submit">Join Waitlist</Button>
            </form>

            <p class="text-xs text-muted-foreground">
                No credit card required · 60-day free pilot
            </p>
        </div>

        <!-- Right Column - Hero Visual placeholder -->
        <div class="relative">
            <div
                class="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center"
            >
                <div class="text-center text-muted-foreground">
                    <div
                        class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                    >
                        <span class="text-4xl">📊</span>
                    </div>
                    <p class="text-sm font-medium">Dashboard Preview</p>
                    <p class="text-xs opacity-60">Visual coming soon</p>
                </div>
            </div>
        </div>
    </header>

    <!-- Scroll Indicator -->
    <button
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary"
        onclick={scrollDown}
    >
        <!-- <span class="text-sm">See how we do it</span> -->
        <ArrowDown class="w-6 h-6 animate-bounce" />
    </button>
</section>
