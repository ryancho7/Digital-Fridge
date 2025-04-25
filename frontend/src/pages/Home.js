import { useEffect } from "react"
import LoginForm from "../components/ui/Login.js"

export function Home() {

    useEffect(() => {
        fetch('/users')
            .then(res => res.text())
            .then(data => console.log(data))
    }, [])

    return (
        <div className="flex h-full flex-col justify-center items-center">
            {/* <h1>Welcome to Digital Fridge</h1> */}
            <LoginForm />
        </div>
    )
}