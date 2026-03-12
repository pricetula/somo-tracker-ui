"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

interface StepFileUploadProps {
    onParsed: (headers: string[], rawRows: Record<string, string>[]) => void;
}

export function StepFileUpload({ onParsed }: StepFileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    async function handleFile(file: File) {
        if (!file.name.endsWith(".csv")) {
            setError("Please upload a .csv file.");
            return;
        }
        setError(null);
        const { parseCSV } = await import("@/lib/importer-engine");
        const result = await parseCSV(file);
        onParsed(result.headers, result.rawRows);
    }

    return (
        <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 transition-colors cursor-pointer ${
                dragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
            }}
        >
            <UploadCloud className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-sm font-medium text-gray-700">
                Drop a CSV file here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">.csv files only</p>
            {error && <p className="text-xs text-red-500 mt-3">{error}</p>}
            <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />
        </div>
    );
}
