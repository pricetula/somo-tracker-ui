"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AddUser } from "@/lib/importer-engine";
import { ManualMethod } from "./manual-method";
import { CsvMethod } from "./csv-method";
import { ExcelMethod } from "./excel-method";

type Method = "manual" | "csv" | "excel";

interface MethodOption {
  id: Method;
  label: string;
  description: string;
  icon: string;
}

const METHOD_OPTIONS: MethodOption[] = [
  {
    id: "manual",
    label: "Enter manually",
    description: "Type in names and emails one by one",
    icon: "✏️",
  },
  {
    id: "csv",
    label: "Import CSV",
    description: "Upload a .csv file and map the columns",
    icon: "📄",
  },
  {
    id: "excel",
    label: "Import Excel",
    description: "Upload a .xlsx file",
    icon: "📊",
  },
];

interface UserCreatorProps {
  onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
}

export function UserCreator({ onImport }: UserCreatorProps) {
  const [method, setMethod] = useState<Method | null>(null);

  function reset() {
    setMethod(null);
  }

  if (!method) {
    return (
      <div className="space-y-3 py-2">
        {METHOD_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMethod(opt.id)}
            className="w-full flex items-center gap-4 rounded-lg border border-gray-200 px-4 py-4 text-left hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">{opt.icon}</span>
            <div>
              <p className="font-medium text-sm text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {METHOD_OPTIONS.find((o) => o.id === method)?.label}
        </p>
        <Button variant="ghost" size="sm" onClick={reset}>
          ← Reset
        </Button>
      </div>

      {method === "manual" && <ManualMethod onImport={onImport} onReset={reset} />}
      {method === "csv" && <CsvMethod onImport={onImport} />}
      {method === "excel" && <ExcelMethod />}
    </div>
  );
}
