"use client";

import { FieldMapping } from "@/lib/importer-engine";
import type { UserCreatorConfig } from "../../user-creator";

interface StepFieldMappingProps {
    headers: string[];
    mapping: Partial<FieldMapping>;
    onMappingChange: (mapping: Partial<FieldMapping>) => void;
    onNext: () => void;
    onBack: () => void;
    config?: UserCreatorConfig;
}

const REQUIRED_FIELDS: { key: keyof FieldMapping; label: string }[] = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
];

export function StepFieldMapping({
    headers,
    mapping,
    onMappingChange,
    onNext,
    onBack,
    config,
}: StepFieldMappingProps) {
    function handleChange(key: keyof FieldMapping, value: string) {
        onMappingChange({ ...mapping, [key]: value || undefined });
    }

    const canProceed = mapping.first_name || mapping.last_name;

    const optionalFields: { key: keyof FieldMapping; label: string }[] = [
        ...(config?.showPhone ? [{ key: "phone" as keyof FieldMapping, label: "Phone" }] : []),
        ...(config?.showRegistrationNumber
            ? [{ key: "registration_number" as keyof FieldMapping, label: "Registration Number" }]
            : []),
    ];

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-600">
                Map your CSV columns to the required fields. Auto-mapping is applied where possible.
            </p>

            <div className="space-y-4">
                {REQUIRED_FIELDS.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-4">
                        <label className="w-40 text-sm font-medium text-gray-700 shrink-0">
                            {label}
                        </label>
                        <select
                            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={mapping[key] ?? ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                        >
                            <option value="">— Not mapped —</option>
                            {headers.map((h) => (
                                <option key={h} value={h}>
                                    {h}
                                </option>
                            ))}
                        </select>
                        {mapping[key] && (
                            <span className="text-xs text-green-600 font-medium">Auto-mapped</span>
                        )}
                    </div>
                ))}

                {optionalFields.length > 0 && (
                    <>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide pt-2">
                            Optional fields
                        </p>
                        {optionalFields.map(({ key, label }) => (
                            <div key={key} className="flex items-center gap-4">
                                <label className="w-40 text-sm font-medium text-gray-700 shrink-0">
                                    {label}
                                </label>
                                <select
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={mapping[key] ?? ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                >
                                    <option value="">— Not mapped —</option>
                                    {headers.map((h) => (
                                        <option key={h} value={h}>
                                            {h}
                                        </option>
                                    ))}
                                </select>
                                {mapping[key] && (
                                    <span className="text-xs text-green-600 font-medium">
                                        Auto-mapped
                                    </span>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div className="flex justify-between pt-2">
                <button
                    onClick={onBack}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Preview
                </button>
            </div>
        </div>
    );
}
