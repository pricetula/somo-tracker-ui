<script lang="ts">
  import { Upload, Brain, CheckCircle } from "@lucide/svelte";
  import { inView } from "$lib/actions/intersectionObserver";
  import { fly } from "svelte/transition";

  let visible = $state(false);

  const steps = [
    {
      Icon: Upload,
      title: "Simple Data Upload",
      time: "15 minutes",
      details: ["CSV or direct SIS integration", "We handle messy data"],
    },
    {
      Icon: Brain,
      title: "AI Calibration",
      time: "1 hour (automated)",
      details: ["System learns your curriculum", "Zero manual setup required"],
      highlight: true,
    },
    {
      Icon: CheckCircle,
      title: "Total School Visibility",
      time: "Instant",
      details: ["Real-time analytics go live", "All stakeholders get access"],
    },
  ];
</script>

<section class="py-28 px-4 bg-muted/20" use:inView onenter={() => { visible = true; }}>
  <div class="max-w-5xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">From Chaos to Clarity in 3 Steps</h2>
    <p class="text-center text-muted-foreground mb-16">No IT department needed. No months of training.</p>

    {#if visible}
      <div class="grid md:grid-cols-3 gap-8 relative" in:fly={{ y: 30, duration: 700 }}>
        {#each steps as step, i}
          <div class="relative flex flex-col items-center text-center space-y-4 {step.highlight ? 'md:scale-105' : ''}">
            <!-- Step number -->
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mb-2">
              {i + 1}
            </div>

            <div class="w-16 h-16 rounded-2xl {step.highlight ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary'} flex items-center justify-center">
              <step.Icon class="w-8 h-8" />
            </div>

            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{step.time}</p>
              <h3 class="text-xl font-bold mt-1">{step.title}</h3>
            </div>

            <ul class="space-y-1 text-sm text-muted-foreground">
              {#each step.details as detail}
                <li>{detail}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
