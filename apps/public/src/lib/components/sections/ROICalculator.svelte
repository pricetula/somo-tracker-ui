<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Slider } from "$lib/components/ui/slider";
  import { Separator } from "$lib/components/ui/separator";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { spring } from "svelte/motion";

  let students = $state([500]);
  let hoursPerWeek = $state([20]);
  let hourlyRate = $state([45]);

  const annualHours = spring(0, { stiffness: 0.1, damping: 0.5 });
  const annualSavings = spring(0, { stiffness: 0.1, damping: 0.5 });

  $effect(() => {
    const h = hoursPerWeek[0];
    const r = hourlyRate[0];
    annualHours.set(h * 52 * 0.9);
    annualSavings.set(h * 52 * r * 0.9);
  });
</script>

<section class="py-28 px-4 bg-muted/20">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">Calculate Your Savings</h2>
    <p class="text-center text-muted-foreground mb-12">See exactly how much time and money Somotracker saves your school.</p>

    <Card class="p-8 shadow-xl border-2 border-primary/20">
      <CardContent class="space-y-8 p-0">
        <!-- Inputs -->
        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium mb-3">
              Number of Students: <span class="text-primary font-bold">{students[0].toLocaleString()}</span>
            </p>
            <Slider type="multiple" bind:value={students} min={100} max={5000} step={50} />
          </div>

          <div>
            <p class="text-sm font-medium mb-3">
              Assessment Hours/Week: <span class="text-primary font-bold">{hoursPerWeek[0]} hours</span>
            </p>
            <Slider type="multiple" bind:value={hoursPerWeek} min={5} max={40} step={1} />
          </div>

          <div>
            <p class="text-sm font-medium mb-3">
              Average Teacher Hourly Rate: <span class="text-primary font-bold">${hourlyRate[0]}/hr</span>
            </p>
            <Slider type="multiple" bind:value={hourlyRate} min={25} max={75} step={5} />
          </div>
        </div>

        <Separator />

        <!-- Results -->
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Annual Time Saved</p>
            <p class="text-4xl font-bold font-mono">{Math.round($annualHours).toLocaleString()}</p>
            <p class="text-sm text-muted-foreground">hours</p>
          </div>

          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Annual Cost Saved</p>
            <p class="text-4xl font-bold font-mono text-green-600">${Math.round($annualSavings).toLocaleString()}</p>
            <p class="text-sm text-muted-foreground">per year</p>
          </div>

          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Payback Period</p>
            <p class="text-4xl font-bold font-mono">3.2</p>
            <p class="text-sm text-muted-foreground">weeks to ROI</p>
          </div>
        </div>

        <Separator />

        <!-- CTA -->
        <div class="text-center space-y-4">
          <p class="text-lg font-semibold">See this in your school</p>
          <form method="POST" action="?/subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" name="email" placeholder="principal@school.edu" class="h-12" required />
            <Button type="submit" size="lg" class="h-12 whitespace-nowrap">Start Free Pilot</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
