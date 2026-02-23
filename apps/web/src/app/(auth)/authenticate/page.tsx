"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyMagicLinkToken } from "@/features/auth/api/actions";

export default function AuthenticatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = searchParams.get("token")?.trim();

    if (!token) {
      router.replace("/login");
      return;
    }

    verifyMagicLinkToken(token).then((result) => {
      if (result.success) {
        router.replace("/institute");
      } else {
        toast.error(result.error ?? "Invalid or expired link.");
        router.replace("/login");
      }
    });
  }, [searchParams, router]);

  return null;
}
