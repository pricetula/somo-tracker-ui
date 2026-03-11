"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AddUser } from "@/lib/importer-engine";

interface Row {
  first_name: string;
  last_name: string;
  email: string;
}

interface ManualMethodProps {
  onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
  onReset: () => void;
}

function emptyRow(): Row {
  return { first_name: "", last_name: "", email: "" };
}

export function ManualMethod({ onImport, onReset }: ManualMethodProps) {
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function updateRow(index: number, field: keyof Row, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function validate(): boolean {
    const newErrors = rows.map((row) => {
      if (!row.first_name.trim() && !row.last_name.trim()) return "Missing name";
      if (!row.email.trim()) return "Missing email";
      return "";
    });
    setErrors(newErrors);
    return newErrors.every((e) => e === "");
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    const users: AddUser[] = rows.map((r) => ({
      first_name: r.first_name.trim(),
      last_name: r.last_name.trim(),
      email: r.email.trim(),
    }));
    const result = await onImport(users);
    setSubmitting(false);
    if (!result.success) {
      setSubmitError(result.error ?? "Import failed.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <p className="text-lg font-semibold text-green-700">Users added successfully!</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setRows([emptyRow()]); setErrors([]); setDone(false); }}>
            Add more users
          </Button>
          <Button variant="ghost" onClick={onReset}>
            Start over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="space-y-1">
            <div className="flex gap-2 items-center">
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="First name"
                  value={row.first_name}
                  onChange={(e) => updateRow(i, "first_name", e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Last name"
                  value={row.last_name}
                  onChange={(e) => updateRow(i, "last_name", e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Email"
                  type="email"
                  value={row.email}
                  onChange={(e) => updateRow(i, "email", e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeRow(i)}
                disabled={rows.length === 1}
                className="shrink-0"
              >
                ✕
              </Button>
            </div>
            {errors[i] && <p className="text-xs text-red-500 pl-1">{errors[i]}</p>}
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addRow}>
        + Add row
      </Button>

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Adding..." : "Add users"}
        </Button>
      </div>
    </div>
  );
}
