import { CsvImporter } from "@/components/shared/importer/csv-importer";
import { bulkAddGuardians } from "@/features/guardians/api/actions";

export default function AddGuardiansPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Add guardians</h1>
      <CsvImporter onImport={bulkAddGuardians} />
    </div>
  );
}
