import { CsvImporter } from "@/components/importer/csv-importer";

export default function AddStudentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Add students</h1>
      <CsvImporter />
    </div>
  );
}
