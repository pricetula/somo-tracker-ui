import { getSchoolUsersFilterFromSearchParam } from "@/features/school-user/utils/getSchoolUsersFilterFromSearchParam"
import { getSchoolUsers } from "@/features/school-user/services/get-school-users"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const params = getSchoolUsersFilterFromSearchParam(searchParams)

    const school_users = await getSchoolUsers(params)

    return new Response(JSON.stringify(school_users), { status: 200 })
}