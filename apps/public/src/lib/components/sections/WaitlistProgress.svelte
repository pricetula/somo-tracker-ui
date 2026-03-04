<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";
  import { Badge } from "$lib/components/ui/badge";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { inView } from "$lib/actions/intersectionObserver";

  const MAX_SPOTS = 3000;
  let count = $state(2473);
  let progressVal = tweened(0, { duration: 2000, easing: cubicOut });

  function onEnter() {
    progressVal.set((count / MAX_SPOTS) * 100);
  }

  $effect(() => {
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 2) + 1;
      progressVal.set((count / MAX_SPOTS) * 100);
    }, Math.random() * 60000 + 15000);
    return () => clearInterval(interval);
  });

  const spotsLeft = $derived(MAX_SPOTS - count);
</script>

<section class="py-20 px-4" use:inView onenter={onEnter}>
  <div class="max-w-3xl mx-auto space-y-8">
    <div class="text-center space-y-2">
      <h3 class="text-3xl font-bold">{count.toLocaleString()} educators already on the waitlist</h3>
      <p class="text-muted-foreground">Join them before beta slots fill up</p>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Beta slots filling fast</span>
        <Badge variant="destructive">Only {spotsLeft} spots left</Badge>
      </div>

      <Progress value={$progressVal} class="h-4" />

      <div class="flex justify-between text-xs text-muted-foreground">
        <span>2,000 – Early Access</span>
        <span class="font-semibold text-foreground">← You are here</span>
        <span>3,000 – Closed</span>
      </div>
    </div>

    <div class="pt-4 space-y-3 border rounded-xl p-6 bg-card">
      <p class="font-semibold text-lg">Join now to get:</p>
      <ul class="space-y-2">
        <li class="flex items-center gap-2"><span class="text-primary font-bold">✓</span> 60-day free pilot (no credit card)</li>
        <li class="flex items-center gap-2"><span class="text-primary font-bold">✓</span> Priority onboarding support</li>
        <li class="flex items-center gap-2"><span class="text-primary font-bold">✓</span> Lifetime 25% discount</li>
      </ul>
    </div>
  </div>
</section>
