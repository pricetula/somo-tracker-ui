"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { ValidationResult } from "@/lib/importer-engine";

interface StepPreviewProps {
    result: ValidationResult;
    onConfirm: () => void;
    onBack: () => void;
    importing?: boolean;
    importError?: string | null;
}

const PREVIEW_LIMIT = 20;

export function StepPreview({ result, onConfirm, onBack, importing, importError }: StepPreviewProps) {
    const { preview, validCount, skippedCount } = result;
    const total = validCount + skippedCount;
    const rows = preview.slice(0, PREVIEW_LIMIT);

    return (
        <div className="space-y-4">
            {/* Summary bar */}
            <div className="flex gap-6 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm">
                <span className="text-gray-600">Total: <strong>{total}</strong></span>
                <span className="text-green-700">Valid: <strong>{validCount}</strong></span>
                <span className="text-red-600">Skipped: <strong>{skippedCount}</strong></span>
            </div>

            {/* Preview table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">First Name</th>
                            <th className="px-4 py-2 text-left">Last Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.index}
                                className={row.status === "skipped" ? "bg-red-50" : "bg-white"}
                            >
                                <td className="px-4 py-2 text-gray-400">{row.index + 1}</td>
                                <td className="px-4 py-2">{row.first_name || <span className="text-gray-300">—</span>}</td>
                                <td className="px-4 py-2">{row.last_name || <span className="text-gray-300">—</span>}</td>
                                <td className="px-4 py-2">{row.email || <span className="text-gray-300">—</span>}</td>
                                <td className="px-4 py-2">
                                    {row.status === "ready" ? (
                                        <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                                            <CheckCircle className="w-3.5 h-3.5" /> Ready
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-red-600 font-medium" title={row.skipReason}>
                                            <XCircle className="w-3.5 h-3.5" /> Skipped
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {preview.length > PREVIEW_LIMIT && (
                    <p className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                        Showing first {PREVIEW_LIMIT} of {preview.length} rows.
                    </p>
                )}
            </div>

            {importError && (
                <p className="text-sm text-red-600">{importError}</p>
            )}
            <div className="flex justify-between pt-2">
                <button
                    onClick={onBack}
                    disabled={importing}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Back
                </button>
                <button
                    onClick={onConfirm}
                    disabled={validCount === 0 || importing}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {importing ? "Importing…" : `Confirm Import (${validCount} users)`}
                </button>
            </div>
        </div>
    );
}
