"use client";

import { Input } from "@/components/ui/input";

interface Props {
  role: string;
}

export function SchoolUsersFilters({ role }: Props) {
  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search users..."
        className="max-w-xs"
      />
    </div>
  );
}
