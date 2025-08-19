import { PageNav } from "@/shared/components/page-nav";
import { UserInviteButton, UserInviteDialog } from "../user-invite";
import { AddStudentsButton, AddStudentsDialog } from "../add-students";
import { UserListFilter } from "./UserListFilter";
import { UserList } from "./UserList";
import { getSchoolUsers } from "../../services/get-school-users";


export async function UserListWrapper() {
    const { data } = await getSchoolUsers()
    return (
        <article>
            <PageNav>
                <div className="flex justify-between gap-4">
                    <UserListFilter />
                    <div className="flex gap-4">
                        <UserInviteButton />
                        <AddStudentsButton />
                    </div>
                </div>
            </PageNav>
            <UserList initialisedUsers={data} />
            <AddStudentsDialog />
            <UserInviteDialog />
        </article>
    )
}