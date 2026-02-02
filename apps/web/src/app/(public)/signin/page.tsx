// import { Suspense } from "react";
// import { Skeleton } from "@/shared/components/ui/skeleton";
// import { SigninForm } from "@/features/auth/components/signin";

// export default function Page() {
//     return (
//         <Suspense fallback={<Skeleton className="h-[300px] w-[200px]" />}>
//             <SigninForm />
//         </Suspense>
//     )
// }

"use client";
import { StytchB2B } from "@stytch/nextjs/b2b";
import { AuthFlowType, B2BProducts } from "@stytch/vanilla-js/b2b";

export default function LoginPage() {
    return (
        <StytchB2B config={{
            authFlowType: AuthFlowType.Discovery,
            products: [B2BProducts.emailMagicLinks],
            sessionOptions: { sessionDurationMinutes: 60 },
        }} />
    )
}