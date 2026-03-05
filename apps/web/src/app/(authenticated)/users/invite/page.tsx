import { InviteUserForm } from "@/features/invitations/components/invite-user-form";

export default function InviteUserPage() {
  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-semibold">Invite user</h1>
      <InviteUserForm />
    </div>
  );
}
