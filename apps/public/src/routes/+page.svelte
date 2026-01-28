<script lang="ts">
	import { Zap } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	const features = [
		{
			title: 'Real-Time Progress Tracking',
			description:
				'Monitor performance with up-to-the-minute data. See exactly how your cohort is trending the moment an assessment ends.'
		},
		{
			title: 'Actionable Performance Analytics',
			description:
				'Deep-dive into individual and cohort trends. Compare group averages against historical benchmarks to refine your teaching strategy.'
		},
		{
			title: 'Early Warning Systems',
			description:
				'Automatically identify learners at risk of falling behind. Use predefined criteria to trigger support before learning gaps widen.'
		},
		{
			title: 'Centralized Data Management',
			description:
				'Ditch filing cabinets and spreadsheets. Unify all academic records into a single, secure hub designed for speed and accessibility.'
		},
		{
			title: 'Collaborative Goal Setting',
			description:
				'Set and track clear academic milestones. Empower both educators and learners to stay focused on the roadmap to mastery.'
		},
		{
			title: 'Enhanced Communication',
			description:
				'Foster stronger engagement with targeted, data-backed feedback that helps learners bridge the gap between effort and results.'
		}
	];
</script>

<article>
	<header
		aria-labelledby="hero"
		class="mt-30 md:mt-30 mb-40 md:h-[calc(100vh_-_100px)] flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
	>
		<div class="mb-6 md:mb-0">
			<h1 id="hero" class="text-3xl md:text-4xl font-bold leading-12 mb-4">
				Intelligent Academics.<br /> Zero Waste.
			</h1>
			<p class="max-w-[460px] mb-10">
				Eliminate printing overhead and reclaim faculty hours with automated testing and deep
				analysis designed to accelerate academic mastery.
			</p>
			<Button
				href="/onboarding"
				class="inline-flex items-center gap-2 px-4 py-2 no-underline rounded text-white bg-green-500 hover:bg-green-600"
			>
				<span>Get started for free</span>
				<Zap size="14" />
			</Button>
		</div>
		<div class="bg-blue-50 dark:bg-slate-900 w-full max-w-[380px] h-[240px]"></div>
	</header>

	<section aria-labelledby="features" class="mb-40 w-full flex flex-col items-center">
		<h2 id="features" class="mb-4 text-center text-2xl font-semibold">
			The Cost of the Status Quo
		</h2>
		<p class="mb-20 text-center max-w-[380px] mx-auto">
			Manual processes aren't just slow-they’re expensive. <br /> See how Somotracker solves this.
		</p>
		<ol class="px-4 max-w-[900px]">
			{#each features as feature, index (feature.title)}
				<li
					class={`mb-20 gap-8 flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
				>
					<article class="flex flex-col grow items-center justify-center">
						<h3 class="mb-2 font-semibold text-lg">
							{feature.title}
						</h3>
						<p class="text-center max-w-[300px]">{feature.description}</p>
					</article>
					<div class="bg-blue-50 dark:bg-slate-900 w-[320px] h-[180px]"></div>
				</li>
			{/each}
		</ol>
	</section>
</article>
