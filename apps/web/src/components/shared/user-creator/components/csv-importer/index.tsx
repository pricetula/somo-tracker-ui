"use client";

import { useMemo, useState } from "react";
import {
    FieldMapping,
    ValidationResult,
    AddUser,
    autoMap,
    transform,
    validate,
} from "@/lib/importer-engine";
import type { UserCreatorConfig } from "../../user-creator";
import { StepFileUpload } from "./step-file-upload";
import { StepFieldMapping } from "./step-field-mapping";
import { StepPreview } from "./step-preview";

type Step = "upload" | "mapping" | "preview";

const STEP_LABELS: Record<Step, string> = {
    upload: "Upload File",
    mapping: "Map Fields",
    preview: "Preview & Confirm",
};
const STEPS: Step[] = ["upload", "mapping", "preview"];

interface CsvImporterProps {
    onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
    config?: UserCreatorConfig;
}

export function CsvImporter({ onImport, config }: CsvImporterProps) {
    const [step, setStep] = useState<Step>("upload");
    const [headers, setHeaders] = useState<string[]>([]);
    const [rawRows, setRawRows] = useState<Record<string, string>[]>([]);
    const [mapping, setMapping] = useState<Partial<FieldMapping>>({});
    const [done, setDone] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importError, setImportError] = useState<string | null>(null);

    function handleParsed(h: string[], rows: Record<string, string>[]) {
        setHeaders(h);
        setRawRows(rows);
        setMapping(autoMap(h) as Partial<FieldMapping>);
        setStep("mapping");
    }

    const validationResult = useMemo<ValidationResult | null>(() => {
        if (!mapping.first_name && !mapping.last_name && !mapping.email) return null;
        const full: FieldMapping = {
            first_name: mapping.first_name ?? "",
            last_name: mapping.last_name ?? "",
            email: mapping.email ?? "",
            phone: mapping.phone,
            registration_number: mapping.registration_number,
        };
        const mapped = transform(rawRows, full);
        return validate(mapped);
    }, [rawRows, mapping]);

    async function handleConfirm() {
        if (!validationResult) return;
        setImporting(true);
        setImportError(null);
        const result = await onImport(validationResult.data);
        setImporting(false);
        if (!result.success) {
            setImportError(result.error ?? "Import failed.");
            return;
        }
        setDone(true);
    }

    if (done) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
                <p className="text-lg font-semibold text-green-700">Import complete!</p>
                <p className="text-sm text-gray-500">Users have been added successfully.</p>
                <button
                    className="mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                    onClick={() => {
                        setStep("upload");
                        setHeaders([]);
                        setRawRows([]);
                        setMapping({});
                        setDone(false);
                    }}
                >
                    Import another file
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Step indicator */}
            <div className="flex items-center gap-2">
                {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                s === step
                                    ? "bg-blue-600 text-white"
                                    : STEPS.indexOf(step) > i
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {i + 1}
                        </div>
                        <span
                            className={`text-sm ${s === step ? "font-medium text-gray-900" : "text-gray-400"}`}
                        >
                            {STEP_LABELS[s]}
                        </span>
                        {i < STEPS.length - 1 && <div className="w-6 h-px bg-gray-300 mx-1" />}
                    </div>
                ))}
            </div>

            {/* Step content */}
            {step === "upload" && <StepFileUpload onParsed={handleParsed} />}

            {step === "mapping" && (
                <StepFieldMapping
                    headers={headers}
                    mapping={mapping}
                    onMappingChange={setMapping}
                    onNext={() => setStep("preview")}
                    onBack={() => setStep("upload")}
                    config={config}
                />
            )}

            {step === "preview" && validationResult && (
                <StepPreview
                    result={validationResult}
                    onConfirm={handleConfirm}
                    onBack={() => setStep("mapping")}
                    importing={importing}
                    importError={importError}
                />
            )}
        </div>
    );
}
