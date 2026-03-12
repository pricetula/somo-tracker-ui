"use client";

import { CsvImporter } from "@/components/shared/user-creator/components/csv-importer";
import type { AddUser } from "@/lib/importer-engine";
import type { UserCreatorConfig } from "./user-creator";

interface CsvMethodProps {
    onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
    config?: UserCreatorConfig;
}

export function CsvMethod({ onImport, config }: CsvMethodProps) {
    return <CsvImporter onImport={onImport} config={config} />;
}
