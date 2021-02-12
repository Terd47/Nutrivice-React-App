import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import LastUpdated from '../lastUpdated';
import LastUpdPref from '../lastUpdPref';
import RndmMeal from '../RandomMeals';

const Dashboard = (props) => {

    const [menuCollapse, setMenuCollapse] = useState(false);
    // const [authenticated, setAuthenticated] = useState(false);
    const menuIconClick = () => {
        // switching menu collapse between true or false depending on state
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const logout = () => {
        // Log user out
        // Remove token from local storage
        localStorage.removeItem("decodedTokenID");
        localStorage.removeItem("jwtToken");
       
        window.location.assign('/signin')
        // props.history.push("/Signin");
    }

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("decodedTokenID");
    //     const regToken = localStorage.getItem("regTokenID");
    //     if (userInfo || regToken) {
    //         // setAuthenticated(true);
    //         console.log("welcome");
    //     } else if (!userInfo) {
    //         // setAuthenticated(false);
    //         // props.history.push("/Signin");
    //         window.location.assign('/signin')
    //     }
    //     console.log(userInfo);
    // })

    return (
        <>
            <div className="dashboard-background container-fluid">
                <div className="row">
                    <div className="col-3">
                        <div id="header" className="sidebar">
                            <ProSidebar collapsed={menuCollapse}>
                                <SidebarHeader >
                                    <div className="logo-text">
                                        Menu
                            </div>
                                    <div className="closemenu" onClick={menuIconClick}>
                                        {/* changing menu collapse icon on click */}
                                        {menuCollapse ? (
                                            <FiArrowRightCircle />
                                        ) : (
                                                <FiArrowLeftCircle />
                                            )}
                                    </div>
                                </SidebarHeader>
                                <SidebarContent>
                                    <Menu iconShape="square">
                                        <MenuItem active={true} icon={<FaUser />}>
                                            Profile
                                </MenuItem>
                                        <hr></hr>
                                        <Link to={"/Meal"}><MenuItem icon={<FaList />}>Get Daily Meal Plan</MenuItem></Link>
                                        <hr></hr>
                                        <Link to={"/bmi"} > <MenuItem icon={<RiPencilLine />}>Update Stats</MenuItem> </Link>
                                        <hr></hr>
                                        <Link to={"/DietPref"} ><MenuItem icon={<BiCog />}>Update Dietary Preferences </MenuItem></Link>
                                        <hr></hr>
                                        <Link to={"/seePref"}><MenuItem icon={<FaRegHeart />}>View Saved Dietary Preferences</MenuItem></Link>
                                <hr></hr>
                                    </Menu>
                                </SidebarContent>
                                <SidebarFooter>
                                    <Menu iconShape="square">
                                        <Link to="#"> <MenuItem icon={<FiLogOut />} type="button" onClick={logout}>Logout</MenuItem> </Link>
                                    </Menu>
                                </SidebarFooter>
                            </ProSidebar>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row-3">

                            <h1 className="head"> Latest Stats</h1>
                            <LastUpdated />

                        </div>

                    </div>

                    <div className="col-3">
                        <div className="row-3">

                            <h1 className="head"> <br /> </h1>
                            <br />
                            <LastUpdPref />

                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row-3">
                            <RndmMeal />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;