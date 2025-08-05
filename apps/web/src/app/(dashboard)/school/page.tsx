import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link href={"/school/create"}>
                <span>Create School</span>
            </Link>
        </div>
    )
}