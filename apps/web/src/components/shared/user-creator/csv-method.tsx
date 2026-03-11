"use client";

import { CsvImporter } from "@/components/shared/importer/csv-importer";
import type { AddUser } from "@/lib/importer-engine";

interface CsvMethodProps {
  onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
}

export function CsvMethod({ onImport }: CsvMethodProps) {
  return <CsvImporter onImport={onImport} />;
}
