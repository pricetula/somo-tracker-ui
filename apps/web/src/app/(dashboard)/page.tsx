"use client"

export default function Home() {
    function signout() {
        fetch("/api/signout", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "/signin"
                }
            })
    }
    return (
        <article>
            <button onClick={signout}>Signout</button>
            dashboard
        </article>
    )
}
