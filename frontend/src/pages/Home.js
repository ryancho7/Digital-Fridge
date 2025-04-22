import { useEffect } from "react"

export function Home() {

    useEffect(() => {
        fetch('/users')
            .then(res => res.text())
            .then(data => console.log(data))
    }, [])

    return (
        <>
            <div>This is the landing page with backend testing</div>
        </>
    )
}