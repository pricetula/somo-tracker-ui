interface PageProps {
    params: Promise<{
        examid: string
    }>
}

export default async function Page({ params }: PageProps) {
    const examId = (await params).examid
    return (
        <div>
            exam {examId}
        </div>
    )
}