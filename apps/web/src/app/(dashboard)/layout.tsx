import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getMe } from "@/features/me/services/get-me"
import { MeHydrator } from "@/features/me/store"
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout"
import { User } from "@/shared/types/user"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { School } from "@/features/school/types"
import { getSchools } from "@/features/school/services/get-school"
import { SchoolsHydrator } from "@/features/school/store"
import { EducationSystem } from "@/features/education-system/types"
import { getEducationSystems } from "@/features/education-system/services/get-education-system"
import { EducationSystemsHydrator } from "@/features/education-system/store"

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children, modal }: { modal: React.ReactNode, children: React.ReactNode }) {
    const headersList = await headers()
    const pathname = headersList.get('x-pathname')

    // Variable to hold me data which is the current user and their institute
    let me: User | null

    try {
        // get me from api
        me = await getMe()
    } catch (error: any) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        } else {
            me = null
        }
    }

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute_id) {
        redirect("/create-institute")
    }

    // variable to hold list of schools
    let schools: School[]

    try {
        // get schools from api
        const resp = await getSchools()
        if (resp.success && resp.data) {
            schools = resp.data
        } else {
            schools = []
        }
    } catch (error: any) {
        schools = []
    }

    if (schools.length === 0 && pathname !== "/school/create") {
        redirect("/school/create")
    }

    // variable to hold list of education systems
    let educationSystems: EducationSystem[]

    try {
        // get education systems from api
        const resp = await getEducationSystems()
        if (resp.success && resp.data) {
            educationSystems = resp.data
        } else {
            educationSystems = []
        }
    } catch (error: any) {
        educationSystems = []
    }

    return (
        <DashboardLayout>
            <main className="h-[90vh] overflow-y-auto">
                {children}
                <MeHydrator me={me} />
                <SchoolsHydrator schools={schools} />
                <EducationSystemsHydrator educationSystems={educationSystems} />
                {modal}
            </main>
        </DashboardLayout>
    )
}