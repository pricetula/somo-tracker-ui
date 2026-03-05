import { SchoolForm } from "@/features/school/components/school-form"

export default function CreateSchoolPage() {
  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-semibold">Create school</h1>
      <SchoolForm />
    </div>
  )
}
