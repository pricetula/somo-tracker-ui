"use client";

import { Input } from "@/components/ui/input";

interface Props {
  isRoleFilterable?: boolean;
}

export function SchoolUsersFilters({ isRoleFilterable = false }: Props) {
  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search users..."
        className="max-w-xs"
      />
    </div>
  );
}
