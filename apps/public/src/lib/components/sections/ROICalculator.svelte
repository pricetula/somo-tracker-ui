<script lang="ts">
    import { Card, CardContent } from "$lib/components/ui/card";
    import { Slider } from "$lib/components/ui/slider";
    import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { spring } from "svelte/motion";
    import { inView } from "$lib/actions/intersectionObserver";
    import JoinWaitList from "./JoinWaitList.svelte";

    // State Variables (Kenyan Context)
    let studentCount = $state([400]);
    let examsPerTerm = $state([3]); // Opener, Mid, End
    let pagesPerExam = $state([6]);
    let subjectsPerStudent = $state([8]);

    let sectionVisible = $state(false);

    // Constants based on your research
    const COST_PER_PAGE_LASER = 3.5;
    const WEEKS_PER_YEAR = 39; // 3 terms of ~13 weeks

    // Motion values for smooth counting
    const annualPrintingSaved = spring(0, { stiffness: 0.1, damping: 0.5 });
    const annualMarkingHours = spring(0, { stiffness: 0.1, damping: 0.5 });

    $effect(() => {
        const totalExamsPerYear =
            studentCount[0] * subjectsPerStudent[0] * examsPerTerm[0];
        const totalPagesPerYear = totalExamsPerYear * pagesPerExam[0];

        // Financial Savings (Printing)
        annualPrintingSaved.set(totalPagesPerYear * COST_PER_PAGE_LASER);

        // Time Savings (Assuming 5 mins to mark 1 paper manually)
        const hoursSpentMarking = (totalExamsPerYear * 5) / 60;
        annualMarkingHours.set(hoursSpentMarking);
    });
</script>

<section
    class="py-20 px-4 bg-muted/20 roi-section"
    class:visible={sectionVisible}
    use:inView
    onenter={() => { sectionVisible = true; }}
>
    <div class="max-w-4xl mx-auto">
        <h2
            class="text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight"
        >
            The Cost of Paper vs. Digital
        </h2>
        <p class="text-center text-muted-foreground mb-12 italic">
            "Is your school spending hundreds of thousands on printing every
            term?"
        </p>

        <div class="roi-card" class:visible={sectionVisible}>
        <Card class="p-8 border">
            <CardContent class="space-y-8 p-0">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div>
                            <p class="text-sm font-medium mb-3">
                                Total Students <span
                                    class="text-primary font-bold"
                                    >{studentCount[0]}</span
                                >
                            </p>
                            <Slider
                                type="multiple"
                                bind:value={studentCount}
                                min={50}
                                max={2000}
                                step={10}
                            />
                        </div>

                        <div>
                            <p class="text-sm font-medium mb-3">
                                Subjects per Student <span
                                    class="text-primary font-bold"
                                    >{subjectsPerStudent[0]}</span
                                >
                            </p>
                            <Slider
                                type="multiple"
                                bind:value={subjectsPerStudent}
                                min={1}
                                max={12}
                                step={1}
                            />
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <p class="text-sm font-medium mb-3">
                                Exams per Term <span
                                    class="text-primary font-bold"
                                    >{examsPerTerm[0]}</span
                                >
                            </p>
                            <Slider
                                type="multiple"
                                bind:value={examsPerTerm}
                                min={1}
                                max={5}
                                step={1}
                            />
                        </div>

                        <div>
                            <p class="text-sm font-medium mb-3">
                                Avg. Pages per Exam <span
                                    class="text-primary font-bold"
                                    >{pagesPerExam[0]}</span
                                >
                            </p>
                            <Slider
                                type="multiple"
                                bind:value={pagesPerExam}
                                min={1}
                                max={15}
                                step={1}
                            />
                        </div>
                    </div>
                </div>

                <Separator class="bg-muted" />

                <div class="grid md:grid-cols-3 gap-6 text-center">
                    <div class="space-y-2 metric-item">
                        <p class="text-sm text-muted-foreground">
                            Hidden Printing Cost
                        </p>
                        <p class="text-3xl font-bold font-mono text-red-400">
                            *KSh {Math.round(
                                $annualPrintingSaved,
                            ).toLocaleString()}
                        </p>
                        <p class="text-xs text-muted-foreground">
                            spent annually on paper & ink
                        </p>
                    </div>

                    <div class="space-y-2 border-x border-muted metric-item" style="animation-delay: 0.1s">
                        <p class="text-sm text-muted-foreground">
                            Teacher Time Saved
                        </p>
                        <p class="text-3xl font-bold font-mono text-primary">
                            {Math.round($annualMarkingHours).toLocaleString()}
                        </p>
                        <p class="text-xs text-muted-foreground">
                            hours of manual marking/year
                        </p>
                    </div>

                    <div class="space-y-2 metric-item" style="animation-delay: 0.2s">
                        <p class="text-sm text-muted-foreground">
                            Somotracker ROI
                        </p>
                        <p class="text-3xl font-bold font-mono text-green-600">
                            92%
                        </p>
                        <p class="text-xs text-muted-foreground">
                            Reduction in assessment overhead
                        </p>
                    </div>
                </div>

                <div
                    class="bg-primary/5 p-4 rounded-lg border border-primary/10"
                >
                    <p class="text-sm text-center">
                        <strong>Pro Tip:</strong> Even if you use a RISO
                        duplicator, you are still losing hundreds of hours in
                        <strong>manual marking</strong> and
                        <strong>stapling</strong>. AI does it in seconds.
                    </p>
                </div>

                <div class="flex flex-col items-center space-y-4">
                    <p class="text-xs font-semibold italic text-primary">
                        Ready to eliminate your school's paper budget?
                    </p>
                    <JoinWaitList />
                </div>
            </CardContent>
        </Card>
        </div>
    </div>
</section>

<style>
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .roi-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .roi-section.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .roi-card {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
    }
    .roi-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
</style>
