<script lang="ts">
	import { Database, Flag, ScanEye, Speech, TrendingUp, TriangleAlert } from 'lucide-svelte';
</script>

<svelte:head>
	<title>SomoTracker – Academic Progression Tool</title>
	<meta
		name="description"
		content="Track student progress, set academic goals, and analyze performance in real-time. Centralized, collaborative, and data-driven."
	/>
	<meta
		name="keywords"
		content="academic progression, student tracking, education analytics, goal setting, performance dashboard"
	/>
	<meta name="author" content="SomoTracker Team" />

	<!-- Open Graph -->
	<meta property="og:title" content="SomoTracker – Academic Progression Tool" />
	<meta
		property="og:description"
		content="Real-time academic tracking and performance insights for educators and students."
	/>
	<!-- <meta property="og:image" content="/preview.jpg" /> -->
	<!-- Replace with actual image -->
	<meta property="og:url" content="https://somo-tracker-web.onrender.com" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="SomoTracker – Academic Progression Tool" />
	<meta
		name="twitter:description"
		content="Real-time academic tracking and performance insights for educators and students."
	/>
	<!-- <meta name="twitter:image" content="/preview.jpg" /> -->

	<link rel="canonical" href="https://somo-tracker-web.onrender.com" />
</svelte:head>

<article class="flex flex-col items-center">
	<header
		aria-labelledby="hero"
		class="mb-12 flex min-h-[400px] flex-col items-center justify-center"
	>
		<h1 id="hero" class="text-4xl font-bold">SomoTracker 🚀</h1>
		<p class="mt-4 max-w-[400px] text-center">
			Your Central Hub for Real-Time Academic Progress and Performance Mastery.
		</p>
	</header>

	<section aria-labelledby="features" class="mb-12 max-w-[800px]">
		<h2 id="features" class="mb-12 border-b pb-2 text-center text-lg font-semibold">
			Key Features
		</h2>
		<ol class="mt-4 grid gap-4 md:grid-cols-2">
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Real-time Progress Tracking</span>
					<ScanEye class="text-blue-500" size="18" />
				</h3>
				<p class="text-sm">
					Monitor student performance with up-to-the-minute data from exam results.
				</p>
			</li>
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Collaborative Goal Setting</span>
					<Flag class="text-amber-500" size="18" />
				</h3>
				<p class="text-sm">Set and track academic goals with clarity.</p>
			</li>
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Actionable Performance Analytics</span>
					<TrendingUp class="text-teal-500" size="18" />
				</h3>
				<p class="text-sm">
					Analyze individual/ cohort progress and compare their progress on average.
				</p>
			</li>
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Centralized Data Management</span>
					<Database class="text-purple-500" size="18" />
				</h3>
				<p class="text-sm">Ditch spreadsheets and unify your academic data.</p>
			</li>
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Enhanced Communication</span>
					<Speech class="text-orange-500" size="18" />
				</h3>
				<p class="text-sm">Improve student-educator engagement and feedback.</p>
			</li>
			<li class="mb-8 px-4">
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					<span>Early Warning Systems</span>
					<TriangleAlert class="text-red-500" size="18" />
				</h3>
				<p class="text-sm">
					Identify students who are at risk of not meeting learning outcomes based on predefined
					criteria.
				</p>
			</li>
		</ol>
	</section>

	<section aria-labelledby="benefits-heading" class="max-w-[800px]">
		<h2 id="benefits-heading" class="mb-12 border-b pb-2 text-center text-lg font-semibold">
			Benefits
		</h2>
		<ul class="mt-4 list-[upper-roman] space-y-4 text-sm">
			<li>
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					Data-Driven Decisions for Improved Outcomes
				</h3>
				<p>
					Leverage real-time progress tracking and actionable analytics to identify trends,
					intervene early, and make informed decisions that boost student success.
				</p>
			</li>
			<li>
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					Streamlined Workflows and Increased Efficiency
				</h3>
				<p>
					Say goodbye to manual data entry and scattered spreadsheets. Somotracker's centralized
					platform simplifies administrative tasks and frees up valuable time for educators to focus
					on teaching and student support.
				</p>
			</li>
			<li>
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					Enhanced Collaboration and Communication
				</h3>
				<p>
					Foster a more connected academic environment. Somotracker facilitates clear communication
					about progress and goals between students and educators, leading to greater engagement and
					accountability.
				</p>
			</li>
			<li>
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					Personalized Support for Every Student
				</h3>
				<p>
					Gain a holistic view of each student's academic journey, enabling targeted support and
					interventions to ensure every learner reaches their full potential.
				</p>
			</li>
			<li>
				<h3 class="mb-2 flex items-center gap-1 font-semibold">
					Demonstrate Impact and Accountability
				</h3>
				<p>
					Generate comprehensive reports on student performance and progress, providing valuable
					insights for stakeholders and showcasing the effectiveness of your educational programs.
				</p>
			</li>
		</ul>
	</section>
</article>
