import { PageNav } from "@/shared/components/page-nav";
import { UserInviteButton } from "../user-invite";
import { AddStudentsButton } from "../add-students";

export function UserList() {
    return (
        <article>
            <PageNav>
                <div className="flex gap-2">
                    <UserInviteButton />
                    <AddStudentsButton />
                </div>
            </PageNav>
            Users
        </article>
    )
}