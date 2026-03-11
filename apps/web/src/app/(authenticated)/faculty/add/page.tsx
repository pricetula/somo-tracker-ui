import { CsvImporter } from "@/components/shared/user-creator/components/importer/csv-importer";
import { bulkAddFaculty } from "@/features/faculty/api/actions";

export default function AddFacultyPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Add faculty</h1>
      <CsvImporter onImport={bulkAddFaculty} />
    </div>
  );
}
