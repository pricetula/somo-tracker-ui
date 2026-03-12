import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddStudents } from "@/features/students/api/actions";

export default function AddStudentsPage() {
    return (
        <div className="flex flex-col gap-4">
            <UserCreator onImport={bulkAddStudents} />
        </div>
    );
}
