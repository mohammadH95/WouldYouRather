import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


export function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    return <Button block onClick={() => loginWithRedirect()}>Log In</Button>;
}

export function LogoutButton() {
    const { logout } = useAuth0();
    return <Button className='justify-content-end' variant="outline-danger" onClick={() => logout()}>Logout</Button>
}