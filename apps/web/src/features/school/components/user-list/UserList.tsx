import { PageNav } from "@/shared/components/page-nav";
import { UserInviteButton, UserInviteDialog } from "../user-invite";
import { AddStudentsButton, AddStudentsDialog } from "../add-students";

export function UserList() {
    return (
        <article>
            <PageNav>
                <div className="flex gap-4">
                    <UserInviteButton />
                    <AddStudentsButton />
                </div>
            </PageNav>
            Users
            <AddStudentsDialog />
            <UserInviteDialog />
        </article>
    )
}