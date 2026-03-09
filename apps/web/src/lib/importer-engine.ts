import Papa from "papaparse";

export interface AddUser {
  first_name: string;
  last_name: string;
  email: string;
}

export interface RowStatus {
  index: number;
  first_name: string;
  last_name: string;
  email: string;
  status: "ready" | "skipped";
  skipReason?: string;
}

export interface FieldMapping {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ParseResult {
  headers: string[];
  rawRows: Record<string, string>[];
}

export interface ValidationResult {
  data: AddUser[];
  validCount: number;
  skippedCount: number;
  preview: RowStatus[];
}

export async function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields ?? [];
        resolve({ headers, rawRows: results.data });
      },
      error: (err) => reject(err),
    });
  });
}

export function transform(
  rawRows: Record<string, string>[],
  mapping: FieldMapping
): Record<string, string>[] {
  return rawRows.map((row) => ({
    first_name: row[mapping.first_name] ?? "",
    last_name: row[mapping.last_name] ?? "",
    email: row[mapping.email] ?? "",
  }));
}

export function validate(mappedRows: Record<string, string>[]): ValidationResult {
  const preview: RowStatus[] = [];
  const data: AddUser[] = [];

  for (let i = 0; i < mappedRows.length; i++) {
    const row = mappedRows[i];
    const first_name = row.first_name?.trim() ?? "";
    const last_name = row.last_name?.trim() ?? "";
    const email = row.email?.trim() ?? "";

    const missingName = !first_name && !last_name;

    if (missingName) {
      preview.push({ index: i, first_name, last_name, email, status: "skipped", skipReason: "Missing first and last name" });
    } else if (!email) {
      preview.push({ index: i, first_name, last_name, email, status: "skipped", skipReason: "Missing email" });
    } else {
      preview.push({ index: i, first_name, last_name, email, status: "ready" });
      data.push({ first_name, last_name, email });
    }
  }

  return {
    data,
    validCount: data.length,
    skippedCount: preview.filter((r) => r.status === "skipped").length,
    preview,
  };
}

export function autoMap(headers: string[]): Partial<FieldMapping> {
  const lower = headers.map((h) => h.toLowerCase().trim());
  const mapping: Partial<FieldMapping> = {};

  const firstNameMatches = ["first_name", "first name", "firstname", "given name"];
  const lastNameMatches = ["last_name", "last name", "lastname", "surname", "family name"];
  const emailMatches = ["email", "email address", "e-mail"];

  const find = (candidates: string[]) =>
    headers[lower.findIndex((h) => candidates.includes(h))] ?? undefined;

  const fn = find(firstNameMatches);
  const ln = find(lastNameMatches);
  const em = find(emailMatches);

  if (fn) mapping.first_name = fn;
  if (ln) mapping.last_name = ln;
  if (em) mapping.email = em;

  return mapping;
}
