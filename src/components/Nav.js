import React from "react"
import { NavLink } from "react-router-dom"

export default function Nav() {
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to='/home' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leadreboard' activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}