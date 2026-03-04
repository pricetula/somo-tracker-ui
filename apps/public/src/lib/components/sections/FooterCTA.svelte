<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let email = $state("");
</script>

<section class="py-28 px-4 bg-primary text-primary-foreground">
  <div class="max-w-3xl mx-auto text-center space-y-8">
    <h2 class="text-4xl md:text-5xl font-bold tracking-tight">
      Don't Let Another Term Slip Away
    </h2>

    <div class="space-y-3 text-primary-foreground/80 text-lg">
      <p>Every week you wait = 72 hours lost</p>
      <p>Every month you wait = $3,467 wasted</p>
    </div>

    <form method="POST" action="?/subscribe" class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
      <Input
        type="email"
        name="email"
        bind:value={email}
        placeholder="principal@school.edu"
        class="h-14 text-lg bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground"
        required
      />
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        class="h-14 text-lg px-8 whitespace-nowrap animate-pulse hover:animate-none shadow-xl"
      >
        Secure My Pilot Spot
      </Button>
    </form>

    <div class="text-sm text-primary-foreground/70 space-y-1">
      <p>No credit card required · Cancel anytime during pilot · Average setup time: 1.2 hours</p>
    </div>

    <blockquote class="border-t border-primary-foreground/20 pt-6 text-primary-foreground/80 italic">
      "We recovered 9 weeks of teaching time in the first semester alone."
      <cite class="block text-sm font-semibold not-italic mt-2 text-primary-foreground">— Principal, St. Michael's Academy</cite>
    </blockquote>
  </div>
</section>
