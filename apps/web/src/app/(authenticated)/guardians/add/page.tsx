import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddGuardians } from "@/features/guardians/api/actions";

export default function AddGuardiansPage() {
  return (
    <div className="flex flex-col gap-4">
      <UserCreator onImport={bulkAddGuardians} />
    </div>
  );
}
