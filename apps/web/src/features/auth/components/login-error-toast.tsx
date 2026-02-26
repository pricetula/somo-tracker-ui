"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginErrorToastProps {
  message: string;
}

export function LoginErrorToast({ message }: LoginErrorToastProps) {
  const router = useRouter();

  useEffect(() => {
    toast.error(message);
    router.replace("/login");
  }, [message, router]);

  return null;
}
