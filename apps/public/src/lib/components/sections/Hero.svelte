<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Badge } from "$lib/components/ui/badge";
  import { ArrowDown } from "@lucide/svelte";
  import { fly, fade } from "svelte/transition";

  let email = $state("");
  let waitlistCount = $state(2473);

  $effect(() => {
    const interval = setInterval(() => {
      waitlistCount += Math.floor(Math.random() * 3);
    }, Math.random() * 60000 + 15000);
    return () => clearInterval(interval);
  });

  function scrollDown() {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
</script>

<section class="relative min-h-screen flex items-center justify-center px-4 py-20">
  <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
    <!-- Left Column -->
    <div class="space-y-8" in:fly={{ y: 20, duration: 600, delay: 100 }}>
      <Badge variant="secondary" class="text-sm px-3 py-1">Limited Beta Access</Badge>

      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
        Zero Printing. Zero Waste.
        <span class="text-primary"> 100% Academic Insight.</span>
      </h1>

      <p class="text-xl md:text-2xl text-muted-foreground">
        Stop waiting for report cards to spot failure. Turn raw data into actionable
        intelligence with AI forecasts that flag struggling students weeks earlier than traditional methods.
      </p>

      <ul class="space-y-3 text-lg">
        <li class="flex items-center gap-2">
          <span class="text-primary font-bold">✓</span> 100% Paperless Assessments
        </li>
        <li class="flex items-center gap-2">
          <span class="text-primary font-bold">✓</span> AI-Driven Gap Forecasting
        </li>
        <li class="flex items-center gap-2">
          <span class="text-primary font-bold">✓</span> Setup in &lt; 2 hours
        </li>
      </ul>

      <form method="POST" action="?/subscribe" class="flex flex-col sm:flex-row gap-4 max-w-2xl">
        <Input
          type="email"
          name="email"
          bind:value={email}
          placeholder="principal@school.edu"
          class="h-14 text-lg"
          required
        />
        <Button
          type="submit"
          size="lg"
          class="h-14 text-lg px-8 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
        >
          Join {waitlistCount.toLocaleString()} Schools
        </Button>
      </form>

      <p class="text-sm text-muted-foreground">No credit card required · 60-day free pilot</p>
    </div>

    <!-- Right Column - Hero Visual placeholder -->
    <div class="relative" in:fade={{ duration: 800, delay: 300 }}>
      <div class="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
        <div class="text-center text-muted-foreground">
          <div class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="text-4xl">📊</span>
          </div>
          <p class="text-sm font-medium">Dashboard Preview</p>
          <p class="text-xs opacity-60">Visual coming soon</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <button
    class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
    onclick={scrollDown}
  >
    <span class="text-sm">See how we do it</span>
    <ArrowDown class="w-6 h-6 animate-bounce" />
  </button>
</section>
