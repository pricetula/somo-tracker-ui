<script lang="ts">
    import { Card, CardContent } from "$lib/components/ui/card";
    import { Hourglass, DollarSign, AlertTriangle } from "@lucide/svelte";
    import { inView } from "$lib/actions/intersectionObserver";

    const paperWasteCost = "Kes 20";
    const weekAssesmentDelay = 4;

    let headerVisible = $state(false);
    let cardsVisible = $state([false, false, false]);
    let footerVisible = $state(false);

    function showCard(i: number) {
        setTimeout(() => { cardsVisible[i] = true; }, i * 150);
    }
</script>

<section class="py-28 px-4 bg-muted/30">
    <div class="max-w-6xl mx-auto">
        <p
            use:inView
            onenter={() => { headerVisible = true; }}
            class="text-center text-sm uppercase tracking-widest text-muted-foreground mb-4 section-header"
            class:visible={headerVisible}
        >
            The Hidden Cost of Manual Assessment
        </p>

        <div class="grid md:grid-cols-3 gap-8">
            {#each [0, 1, 2] as i}
                <div
                    use:inView
                    onenter={() => showCard(i)}
                    class="card-wrapper"
                    class:visible={cardsVisible[i]}
                    style="--delay: {i * 150}ms"
                >
                    {#if i === 0}
                        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 hover:-translate-y-1 transition-all duration-300">
                            <CardContent class="p-0 space-y-4">
                                <div class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center icon-pulse">
                                    <Hourglass class="w-5 h-5 text-destructive" />
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">TIME SINK</p>
                                <p class="text-lg font-bold font-mono text-destructive">hours/term</p>
                                <p class="text-muted-foreground">Lost to manual grading</p>
                            </CardContent>
                        </Card>
                    {:else if i === 1}
                        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 hover:-translate-y-1 transition-all duration-300">
                            <CardContent class="p-0 space-y-4">
                                <div class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center icon-pulse" style="animation-delay: 0.3s">
                                    <DollarSign class="w-5 h-5 text-destructive" />
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">PAPER WASTE</p>
                                <p class="text-lg font-bold font-mono text-destructive">{paperWasteCost}/term</p>
                                <p class="text-muted-foreground">Spent on printing, storage, disposal</p>
                            </CardContent>
                        </Card>
                    {:else}
                        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 hover:-translate-y-1 transition-all duration-300">
                            <CardContent class="p-0 space-y-4">
                                <div class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center icon-pulse" style="animation-delay: 0.6s">
                                    <AlertTriangle class="w-5 h-5 text-destructive" />
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">LATE INTERVENTIONS</p>
                                <p class="text-lg font-bold font-mono text-destructive">{weekAssesmentDelay}-week delay</p>
                                <p class="text-muted-foreground">Before at-risk students get help</p>
                            </CardContent>
                        </Card>
                    {/if}
                </div>
            {/each}
        </div>

        <p class="text-center mt-12 text-muted-foreground italic footer-note"
            use:inView
            onenter={() => { footerVisible = true; }}
            class:visible={footerVisible}
        >
            But it doesn't have to be this way...
        </p>
    </div>
</section>

<style>
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.12); }
    }

    .section-header {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
        transform: translateY(12px);
    }
    .section-header.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .card-wrapper {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.5s ease, transform 0.5s ease;
        transition-delay: var(--delay, 0ms);
    }
    .card-wrapper.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .icon-pulse {
        animation: iconPulse 3s ease-in-out infinite;
    }

    .footer-note {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
    }
    .footer-note.visible {
        opacity: 1;
        transform: translateY(0);
    }
</style>
