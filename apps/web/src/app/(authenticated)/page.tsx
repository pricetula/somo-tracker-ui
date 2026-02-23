"use client";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const t = () => {
        router.replace("/institute");
    };

    return <button onClick={t}>dd</button>;
}
