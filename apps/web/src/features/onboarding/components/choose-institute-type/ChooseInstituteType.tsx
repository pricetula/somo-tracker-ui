
import Link from "next/link";
import {
    TypographyH1,
    TypographyH2,
    TypographyP,
    TypographyLarge
} from "@/shared/components/typography";
import { cn } from "@/shared/lib/utils";

export function ChooseInstituteType() {
    const listItemClassName = "md:w-1/2 shrink-0"
    const linkClassName = "h-[130px] w-full group inline-block rounded-2xl border-4 border-transparent bg-gradient-to-br p-8 text-white transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
    const headerTextClassName = "transition-transform duration-500 group-hover:scale-110"

    return (
        <div className="h-4/5 flex items-center justify-center">
            <article>
                <TypographyH1 className="mb-16">Launch Your Performance Hub</TypographyH1>
                <section>
                    <ul className="text-center flex flex-col md:flex-row md:items-center gap-6">
                        <li className={listItemClassName}>
                            <Link href="/onboarding/create-institute" className={cn(linkClassName, "from-slate-600 via-purple-800 to-indigo-700 hover:border-blue-400")}>
                                <TypographyH2 className={headerTextClassName}>Institute ⚡️</TypographyH2>
                                <TypographyP>Create school(s), manage exams, and <br /> track student progress.</TypographyP>
                            </Link>
                        </li>
                        <li>
                            <TypographyLarge>or</TypographyLarge>
                        </li>
                        <li className={listItemClassName}>
                            <Link href="/onboarding/create-home-school" className={cn(linkClassName, "from-sky-500 via-purple-600 to-pink-600 hover:border-pink-400")}>
                                <TypographyH2 className={headerTextClassName}>Home school ✨</TypographyH2>
                                <TypographyP>Manage exams and <br /> track your children’s progress.</TypographyP>
                            </Link>
                        </li>
                    </ul>
                </section>
            </article>
        </div>
    )
}