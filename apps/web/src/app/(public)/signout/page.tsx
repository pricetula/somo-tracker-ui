"use client"

import React from "react"

export default function Page() {
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
    React.useEffect(() => {
        signout()
    }, [])
    return (
        <div>
            <p>You have been signed out.</p>
        </div>
    )
}
