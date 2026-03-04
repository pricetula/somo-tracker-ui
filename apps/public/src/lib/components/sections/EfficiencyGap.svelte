<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Hourglass, DollarSign, AlertTriangle } from "@lucide/svelte";
  import { inView } from "$lib/actions/intersectionObserver";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  let visible = $state(false);

  const stat1 = tweened(0, { duration: 1500, easing: cubicOut });
  const stat2 = tweened(0, { duration: 1500, easing: cubicOut });
  const stat3 = tweened(0, { duration: 1500, easing: cubicOut });

  function onEnter() {
    visible = true;
    stat1.set(847);
    stat2.set(12400);
    stat3.set(6);
  }
</script>

<section
  class="py-28 px-4 bg-muted/30"
  use:inView
  onenter={onEnter}
>
  <div class="max-w-6xl mx-auto">
    <p class="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      The Hidden Cost of Manual Assessment
    </p>

    {#if visible}
      <div class="grid md:grid-cols-3 gap-8" in:fly={{ y: 30, duration: 600 }}>
        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300">
          <CardContent class="p-0 space-y-4">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Hourglass class="w-8 h-8 text-destructive" />
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">TIME SINK</p>
            <p class="text-4xl font-bold font-mono text-destructive">
              {Math.round($stat1).toLocaleString()} hours/term
            </p>
            <p class="text-muted-foreground">Lost to manual grading & test prep</p>
          </CardContent>
        </Card>

        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300">
          <CardContent class="p-0 space-y-4">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
              <DollarSign class="w-8 h-8 text-destructive" />
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">PAPER WASTE</p>
            <p class="text-4xl font-bold font-mono text-destructive">
              ${Math.round($stat2).toLocaleString()}/term
            </p>
            <p class="text-muted-foreground">Spent on printing, storage, disposal</p>
          </CardContent>
        </Card>

        <Card class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300">
          <CardContent class="p-0 space-y-4">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle class="w-8 h-8 text-destructive" />
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">LATE INTERVENTIONS</p>
            <p class="text-4xl font-bold font-mono text-destructive">
              {Math.round($stat3)}-week delay
            </p>
            <p class="text-muted-foreground">Before at-risk students get help</p>
          </CardContent>
        </Card>
      </div>

      <p class="text-center mt-12 text-xl text-muted-foreground italic" in:fly={{ y: 20, duration: 600, delay: 400 }}>
        But it doesn't have to be this way...
      </p>
    {/if}
  </div>
</section>
