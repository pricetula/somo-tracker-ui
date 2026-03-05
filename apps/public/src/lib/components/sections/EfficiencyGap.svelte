<script lang="ts">
    import { Card, CardContent } from "$lib/components/ui/card";
    import { Hourglass, DollarSign, AlertTriangle } from "@lucide/svelte";
    import { fly } from "svelte/transition";

    const paperWasteCost = "Kes 20";
    const weekAssesmentDelay = 4;
</script>

<section class="py-28 px-4 bg-muted/30">
    <div class="max-w-6xl mx-auto">
        <p
            class="text-center text-sm uppercase tracking-widest text-muted-foreground mb-4"
        >
            The Hidden Cost of Manual Assessment
        </p>

        <div class="grid md:grid-cols-3 gap-8">
            <Card
                class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300"
            >
                <CardContent class="p-0 space-y-4">
                    <div
                        class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center"
                    >
                        <Hourglass class="w-5 h-5 text-destructive" />
                    </div>
                    <p
                        class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                        TIME SINK
                    </p>
                    <p class="text-lg font-bold font-mono text-destructive">
                        hours/term
                    </p>
                    <p class="text-muted-foreground">Lost to manual grading</p>
                </CardContent>
            </Card>

            <Card
                class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300"
            >
                <CardContent class="p-0 space-y-4">
                    <div
                        class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center"
                    >
                        <DollarSign class="w-5 h-5 text-destructive" />
                    </div>
                    <p
                        class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                        PAPER WASTE
                    </p>
                    <p class="text-lg font-bold font-mono text-destructive">
                        {paperWasteCost}/term
                    </p>
                    <p class="text-muted-foreground">
                        Spent on printing, storage, disposal
                    </p>
                </CardContent>
            </Card>

            <Card
                class="p-8 text-center hover:shadow-lg hover:border-destructive/30 transition-all duration-300"
            >
                <CardContent class="p-0 space-y-4">
                    <div
                        class="w-10 h-10 mx-auto rounded-lg bg-destructive/10 flex items-center justify-center"
                    >
                        <AlertTriangle class="w-5 h-5 text-destructive" />
                    </div>
                    <p
                        class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                        LATE INTERVENTIONS
                    </p>
                    <p class="text-lg font-bold font-mono text-destructive">
                        {weekAssesmentDelay}-week delay
                    </p>
                    <p class="text-muted-foreground">
                        Before at-risk students get help
                    </p>
                </CardContent>
            </Card>
        </div>

        <p class="text-center mt-12 text-muted-foreground italic">
            But it doesn't have to be this way...
        </p>
    </div>
</section>
