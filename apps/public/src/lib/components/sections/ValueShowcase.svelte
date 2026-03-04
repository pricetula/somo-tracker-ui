<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { inView } from "$lib/actions/intersectionObserver";
  import { fly } from "svelte/transition";

  const features = [
    {
      label: "AI Assessment Engine",
      headline: "From 40 Hours to 4 Minutes",
      description: "Our AI generates, grades, and analyzes assessments across all subjects. Zero busywork.",
      stats: ["95% grading accuracy", "Supports 47 question types"],
      imageLeft: true,
    },
    {
      label: "Predictive Analytics",
      headline: "Catch Gaps Before They Become Chasms",
      description: "Real-time learning trajectory forecasts. Intervene 6 weeks earlier with AI-spotted patterns.",
      stats: ["89% early-intervention success rate", "Tracks 200+ learning indicators"],
      imageLeft: false,
    },
    {
      label: "Adaptive Learning Paths",
      headline: "Every Student Gets a Personal Tutor",
      description: "Dynamically adjusts content difficulty. No two paths are the same.",
      stats: ["2.3x faster concept mastery", "Replaces $4,500/year tutoring costs"],
      imageLeft: true,
    },
  ];

  let visibleItems: boolean[] = $state(features.map(() => false));
</script>

<section class="py-28 px-4">
  <div class="max-w-6xl mx-auto space-y-28">
    {#each features as feature, i}
      <div
        use:inView
        onenter={() => { visibleItems[i] = true; }}
      >
        {#if visibleItems[i]}
          <div
            class="grid lg:grid-cols-2 gap-16 items-center"
            in:fly={{ y: 40, duration: 700 }}
          >
            <!-- Image placeholder -->
            <div class:lg:order-2={!feature.imageLeft}>
              <div class="aspect-video bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 shadow-lg" style="transform: rotate({feature.imageLeft ? -1 : 1}deg)">
                <p class="text-muted-foreground text-sm font-medium">{feature.label} Visual</p>
              </div>
            </div>

            <!-- Content -->
            <div class:lg:order-1={!feature.imageLeft} class="space-y-6">
              <Badge variant="secondary" class="text-xs font-semibold uppercase tracking-wider">{feature.label}</Badge>
              <h3 class="text-3xl md:text-4xl font-bold tracking-tight">{feature.headline}</h3>
              <p class="text-lg text-muted-foreground">{feature.description}</p>
              <div class="flex gap-3 flex-wrap">
                {#each feature.stats as stat}
                  <Badge variant="outline" class="text-sm py-1">{stat}</Badge>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
