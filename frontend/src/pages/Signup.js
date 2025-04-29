import SignupForm from "../components/ui/Signup.js"

export default function SignupPage() {

    return (
        <div className="relative flex min-h-screen flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/kitchen.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"/>
            <div className="relative z-10">
                <SignupForm />
            </div>
        </div>
    )
}