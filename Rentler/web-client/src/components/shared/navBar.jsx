import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/logout";
import NavPopover from "./navPopover";

const NavBar = (props) => {
    const { user } = props;

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light border-bottom fixed-top">
            <Link className="navbar-brand ml-3" to="/">
                <img src="../../logo.svg" width="30" height="30"
                     className="d-inline-block align-top" alt=""/>
                <span className="font-weight-bold m-2">Rentler</span>
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav border-right">
                    <NavLink className="nav-item nav-link m-1 mx-2" to="/apartments">Rent</NavLink>
                    <NavLink className="nav-item nav-link m-1 mx-2 mr-3" to="/apartments">Buy</NavLink>
                </div>
                <form className="input-group px-4 mr-auto">
                    <input className="form-control w-100 fw-icon"
                           type="text"
                           placeholder="&#xF002; Where do you want to leave?"
                    />
                </form>
                <div className="navbar-nav d-flex align-items-center border-left" style={ { width: '540px' } }>
                    { !user &&
                    <React.Fragment>
                        <NavLink className="btn btn-outline-warning ml-4 mr-3 list-property-button"
                                 to="/signup">List a Property</NavLink>
                        <NavLink className="nav-item nav-link m-1 mx-2 p-1" to="/login">Log In</NavLink>
                        <NavLink className="nav-item nav-link m-1 mx-2 p-1" to="/signup">Sign Up</NavLink>
                    </React.Fragment> }

                    { user &&
                    <React.Fragment>
                        <NavPopover text="Properties" classes="nav-item nav-link no-button m-1 mx-2 ml-3 ">
                            <NavLink className="nav-item nav-link border-bottom"
                                     to="/applications">Application</NavLink>
                            <NavLink className="nav-item nav-link" to="/properties">My Properties</NavLink>
                        </NavPopover>

                        <NavLink className="btn btn-outline-warning mx-2 list-property-button"
                                 to="/add-apartment">List a Property</NavLink>

                        { user.data.avatar && <img src={ user.data.avatar } className="navbar-avatar"/> }
                        <NavPopover title={ user.data.username }
                                    classes={ "nav-item no-button m-1 mr-3 ml-4 " + (user.data.avatar ? "navbar-avatar-popover no-button" : "navbar-avatar-empty") }>
                            <NavLink className="nav-item nav-link border-bottom"
                                     to="/settings">Account & Settings</NavLink>
                            <Logout classes="nav-item nav-link no-button">Log Out</Logout>
                        </NavPopover>
                    </React.Fragment> }
                </div>
            </div>
        </nav>
    );

};

export default NavBar;
