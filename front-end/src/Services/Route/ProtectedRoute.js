import React, { useState } from 'react'
import { Route, Redirect, useHistory } from "react-router-dom"
import { ubahText } from '../Crypto';
import { globalText } from '../Text/GlobalText';

var getCache = sessionStorage.getItem(globalText.x_auth_resu)
export const userLogin = JSON.parse(getCache && ubahText(getCache))


function ProtectedRoute({ component: Component, ...rest }) {

    var author = sessionStorage.getItem(globalText.y_auth_fhdev) != null ? true : false;
    const [Auth] = useState(author)

    return (
        <Route
            {...rest}
            render={(props) => {
                if (Auth == true) {
                    return <Component />
                } else {
                    return (
                        <Redirect to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }} />
                    )
                }
            }}
        >

        </Route>
    )
}

export default ProtectedRoute
