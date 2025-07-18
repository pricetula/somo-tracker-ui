interface PageProps {
    params: Promise<{
        studentid: string
    }>
}

export default async function Page({ params }: PageProps) {
    const studentId = (await params).studentid
    return (
        <div>
            exam student {studentId}
        </div>
    )
}