import { AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

export interface CustomAvatarFallbackProps {
    name: string;
}

const colors = [
    "bg-red-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-green-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-fuchsia-100",
    "bg-pink-100",
    "bg-rose-100",
    "bg-slate-100",
    "bg-gray-100",
    "bg-zinc-100",
    "bg-neutral-100",
    "bg-stone-100"
]

function stringToBoundedNumber(str: string) {
    const charSum = [...str].reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return charSum % 22
}

export function CustomAvatarFallback({ name }: CustomAvatarFallbackProps) {
    const bgColor = colors[stringToBoundedNumber(name)]
    return <AvatarFallback className={cn("rounded-lg capitalize", bgColor)}>{name}</AvatarFallback>
}