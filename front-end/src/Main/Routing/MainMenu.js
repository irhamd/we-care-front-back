import React from 'react'
import { Link } from 'react-router-dom'

function MainMenu() {
    return (
        <div>
            <ul>
                <li> <Link to="/"> Dashboard </Link> </li>
                <li> <Link to="/contact"> Contact </Link> </li>
            </ul>
        </div>
    )
}

export default MainMenu
