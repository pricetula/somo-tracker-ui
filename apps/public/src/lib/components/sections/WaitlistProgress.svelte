<script lang="ts">
    import { Progress } from "$lib/components/ui/progress";
    import { Badge } from "$lib/components/ui/badge";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { inView } from "$lib/actions/intersectionObserver";

    const MAX_SPOTS = 30;
    let count = $state(5);
    let progressVal = tweened(0, { duration: 2000, easing: cubicOut });

    let headerVisible = $state(false);
    let listVisible = $state(false);

    function onEnter() {
        progressVal.set((count / MAX_SPOTS) * 100);
        headerVisible = true;
        setTimeout(() => { listVisible = true; }, 400);
    }

    const spotsLeft = $derived(MAX_SPOTS - count);
</script>

<section class="py-20 px-4" use:inView onenter={onEnter}>
    <div class="max-w-3xl mx-auto space-y-8">
        <div
            class="text-center space-y-2 waitlist-header"
            class:visible={headerVisible}
        >
            <h3 class="text-3xl font-bold">
                {count.toLocaleString()} educators already on the waitlist
            </h3>
            <p class="text-muted-foreground">
                Join them before beta slots fill up
            </p>
        </div>

        <div
            class="space-y-3 progress-wrap"
            class:visible={headerVisible}
        >
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Beta slots filling fast</span>
                <Badge variant="destructive" class="badge-pulse">Only {spotsLeft} spots left</Badge>
            </div>

            <Progress value={$progressVal} class="h-4" />
        </div>

        <div
            class="pt-4 space-y-3 border rounded-xl p-6 bg-card benefits-card"
            class:visible={listVisible}
        >
            <p class="font-semibold text-lg">Join now to get:</p>
            <ul class="space-y-2">
                <li class="flex items-center gap-2 benefit-item benefit-1" class:visible={listVisible}>
                    <span class="text-primary font-bold">✓</span> 60-day free pilot
                    (no credit card)
                </li>
                <li class="flex items-center gap-2 benefit-item benefit-2" class:visible={listVisible}>
                    <span class="text-primary font-bold">✓</span> Priority onboarding
                    support
                </li>
            </ul>
        </div>
    </div>
</section>

<style>
    @keyframes badgePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
    }

    .waitlist-header {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .waitlist-header.visible { opacity: 1; transform: translateY(0); }

    .progress-wrap {
        opacity: 0;
        transition: opacity 0.6s ease 0.2s;
    }
    .progress-wrap.visible { opacity: 1; }

    .badge-pulse {
        animation: badgePulse 2s ease-in-out infinite;
    }

    .benefits-card {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .benefits-card.visible { opacity: 1; transform: translateY(0); }

    .benefit-item {
        opacity: 0;
        transform: translateX(-10px);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .benefit-1.visible { opacity: 1; transform: translateX(0); transition-delay: 0.1s; }
    .benefit-2.visible { opacity: 1; transform: translateX(0); transition-delay: 0.25s; }
</style>
