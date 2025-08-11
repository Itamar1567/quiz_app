import "react"
import {SignIn, SignUp, SignedIn, SignedOut} from "@clerk/clerk-react";

export function AuthenticationPage()
{
    return <div className={"auth-container"}>
        {/*Display what is in here if user is signed out*/}
        <SignedOut>
             {/*//Show sign in and sign up options*/}
            <SignIn routing={"path"} path={"/sign-in"}/>
            <SignIn routing={"path"} path={"/sign-up"}/>
        </SignedOut>
        {/*Display what is in here if user is signed in*/}
        <SignedIn>
            <div className={"redirect-message"}>
                <p>You are already signed in.</p>
            </div>
        </SignedIn>
    </div>
}
