interface PageProps {
    params: Promise<{
        schoolid: string
    }>
}

export default async function Page({ params }: PageProps) {
    const schoolId = (await params).schoolid
    return (
        <div>
            school {schoolId}
        </div>
    )
}