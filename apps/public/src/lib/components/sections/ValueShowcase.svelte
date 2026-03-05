<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { inView } from "$lib/actions/intersectionObserver";
  import { fly } from "svelte/transition";

  const features = [
    {
      label: "AI Assessment Engine",
      headline: "From 40 Hours to 2 Minutes",
      description:
        "Our AI grades, and analyzes assessments across every subject in minutes delivering instant academic insights while eliminating the manual grading and busywork which teachers shouldn't have to do.",
      imageLeft: true,
      imgSrc: "/bot.svg",
    },
    {
      label: "Predictive Analytics",
      headline: "Catch Gaps Before They Become Chasms",
      description:
        "By detecting learning patterns early, real-time AI forecasts provide educators with the insights necessary to intervene before students fall behind.",
      imageLeft: false,
      imgSrc: "/insight.svg",
    },
    {
      label: "Adaptive Learning Paths",
      headline: "Personalized Journeys to Subject Mastery",
      description:
        "Automatically rerouting the learning experience to meet students where they are, accelerating progress through data-driven customization.",
      imageLeft: true,
      imgSrc: "/learningpath.svg",
    },
  ];

  let visibleItems: boolean[] = $state(features.map(() => false));
</script>

<section class="py-28 px-4">
  <div class="max-w-6xl mx-auto space-y-28">
    {#each features as feature, i}
      <div
        use:inView
        onenter={() => {
          visibleItems[i] = true;
        }}
      >
        {#if visibleItems[i]}
          <div
            class="grid lg:grid-cols-2 gap-16 items-center"
            in:fly={{ y: 40, duration: 700 }}
          >
            <!-- Image -->
            <div class:lg:order-2={!feature.imageLeft} class="flex justify-center">
              <img
                src={feature.imgSrc}
                alt={feature.label}
                class="w-90 showcase-img"
                style="animation-delay: {i * 0.1}s"
              />
            </div>

            <!-- Content -->
            <div class:lg:order-1={!feature.imageLeft} class="space-y-6">
              <h3 class="text-2xl font-bold tracking-tight">
                {feature.headline}
              </h3>
              <p class="text-sm">{feature.description}</p>
              <div class="flex gap-3 flex-wrap">
                <Badge variant="secondary" class="text-xs px-2">{feature.label}</Badge>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  .showcase-img {
    animation: float 5s ease-in-out infinite;
  }
</style>
