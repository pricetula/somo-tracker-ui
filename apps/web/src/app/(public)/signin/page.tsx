import { Suspense } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { SigninForm } from "@/features/auth/components/signin";

export default function Page() {
    return (
        <Suspense fallback={<Skeleton className="h-[300px] w-[200px]" />}>
            <SigninForm />
        </Suspense>
    )
}
