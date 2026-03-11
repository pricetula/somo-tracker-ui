import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddFaculty } from "@/features/faculty/api/actions";

export default function AddFacultyPage() {
  return (
    <div className="flex flex-col gap-4">
      <UserCreator onImport={bulkAddFaculty} />
    </div>
  );
}
