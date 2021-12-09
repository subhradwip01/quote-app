import React from 'react'
import classes from "./MainNavigation.module.css"
import {NavLink} from "react-router-dom"
function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Greate Quotes</div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/quotes" activeClassName={classes.active}>
                            All Quotes
                        </NavLink>
                        <NavLink to="/new-quote" activeClassName={classes.active}>
                            Add a Quote
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
