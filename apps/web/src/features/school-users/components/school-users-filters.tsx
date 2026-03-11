"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = ["ADMIN", "FACULTY", "STUDENT", "GUARDIAN"] as const;

interface Props {
  isRoleFilterable?: boolean;
}

export function SchoolUsersFilters({ isRoleFilterable = false }: Props) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [role, setRole] = useQueryState("role", { defaultValue: "" });

  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue || null);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search users..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="max-w-xs"
      />
      {isRoleFilterable && (
        <Select
          value={role || "all"}
          onValueChange={(value) => setRole(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r.charAt(0) + r.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
