import React from 'react'
import LayoutAnt from './Layout/LayoutAnt'
import Logo from "../_Assets/logos/logo-hitam.png"

function Home() {
    return (
        <div>
            <LayoutAnt>
                <div className="wrapper">
                    
                    <div className="">
                        <div className="centerTengah" style={{left:"50%", top:"30%"}}>  <img src={Logo} style={{ right: "0px", width:"250px", zIndex:"999" , position: "absolute" }} />
                        </div>
                        <ul className="bg-bubbles">
                            <li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /></ul>
                    </div>
                </div>


            </LayoutAnt>
        </div >
    )
}

export default Home
