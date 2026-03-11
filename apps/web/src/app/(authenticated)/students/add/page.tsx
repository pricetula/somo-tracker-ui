import { CsvImporter } from "@/components/shared/importer/csv-importer";
import { bulkAddStudents } from "@/features/students/api/actions";

export default function AddStudentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Add students</h1>
      <CsvImporter onImport={bulkAddStudents} />
    </div>
  );
}
