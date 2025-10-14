
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export function ChooseInstituteType() {
    return (
        <div className="h-4/5 flex items-center justify-center">
            <article>
                <h1 className="text-center">Choose Institute Type</h1>
                <section>
                    <ul className="flex gap-4">
                        <li className="w-1/2 shrink-0 bg-red-300">
                            <h2>Learning Institute</h2>
                            <p>This is for a school with children enrolled</p>
                            <Button asChild>
                                <Link href="/onboarding/create-institute">
                                    Create Institute
                                </Link>
                            </Button>
                        </li>
                        <li className="w-1/2 shrink-0 bg-red-300">
                            <h2>Home school</h2>
                            <p>This is for home school geared towards parents and their children</p>
                            <Button asChild>
                                <Link href="/onboarding/create-home-school">
                                    Create Home School
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </section>
            </article>
        </div>
    )
}