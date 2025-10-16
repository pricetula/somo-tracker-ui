import { getSchoolUsersFilterFromSearchParam } from "@/features/school-user/utils/getSchoolUsersFilterFromSearchParam"
import { getSchoolUsers } from "@/features/school-user/services/get-school-users"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const params = getSchoolUsersFilterFromSearchParam(searchParams)

    const school_users = getSchoolUsers(params)

    return NextResponse.json({ success: true, data: school_users })
}