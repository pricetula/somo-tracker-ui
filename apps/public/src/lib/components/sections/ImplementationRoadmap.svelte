<script lang="ts">
  import { Upload, Brain, CheckCircle } from "@lucide/svelte";
  import { inView } from "$lib/actions/intersectionObserver";

  let headerVisible = $state(false);
  let stepVisible = $state([false, false, false]);

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

<section class="py-28 px-4 bg-muted/20">
  <div class="max-w-5xl mx-auto">
    <h2
      use:inView
      onenter={() => { headerVisible = true; }}
      class="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight roadmap-header"
      class:visible={headerVisible}
    >
      From Chaos to Clarity in 3 Steps
    </h2>
    <p
      class="text-center text-muted-foreground mb-16 roadmap-sub"
      class:visible={headerVisible}
    >
      No IT department needed. No months of training.
    </p>

    <div class="grid md:grid-cols-3 gap-8 relative">
      {#each steps as step, i}
        <div
          use:inView
          onenter={() => { setTimeout(() => { stepVisible[i] = true; }, i * 180); }}
          class="step-card relative flex flex-col items-center text-center space-y-4 {step.highlight ? 'md:scale-105' : ''}"
          class:visible={stepVisible[i]}
          style="--i: {i}"
        >
          <!-- Step number -->
          <div class="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mb-2">
            {i + 1}
          </div>

          <div class="icon-box w-16 h-16 rounded-2xl {step.highlight ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary'} flex items-center justify-center">
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
  </div>
</section>

<style>
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes iconBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-4px); }
  }

  .roadmap-header {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .roadmap-header.visible { opacity: 1; transform: translateY(0); }

  .roadmap-sub {
    opacity: 0;
    transition: opacity 0.6s ease 0.2s;
  }
  .roadmap-sub.visible { opacity: 1; }

  .step-card {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .step-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .icon-box {
    animation: iconBounce 3s ease-in-out infinite;
  }
</style>
