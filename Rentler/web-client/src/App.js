import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AddApartment from "./components/apartments/addApartment";
import ApartmentDetails from "./components/apartments/apartmentDetails";
import Apartments from "./components/apartments/apartments";
import EditApartment from "./components/apartments/editApartment";
import Properties from "./components/apartments/properties";
import AddInfoForm from "./components/auth/addInfoForm";
import LoginForm from "./components/auth/loginForm";
import ResetPassword from "./components/auth/resetPassword";
import SignupForm from "./components/auth/signupForm";
import ApartmentApplications from "./components/pages/apartmentApplications";
import Applications from "./components/pages/applications";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound";
import Profile from "./components/pages/profile";
import SettingsForm from "./components/pages/settingsForm";
import Footer from "./components/shared/footer";
import NavBar from "./components/shared/navBar";
import authService from "./services/authService";
import userService from "./services/userService";

class App extends Component {
    state = {
        navbar: true,
        footer: true
    };

    async componentDidMount() {
        if (authService.getToken()) {
            try {
                const user = await userService.getCurrentAccount();
                this.setState({ user });
            } catch (ex) {
                await authService.logout();
            }
        }
    }

    hideNavbar = () => {
        this.setState({ navbar: false });
    };

    showNavbar = () => {
        this.setState({ navbar: true });
    };

    hideFooter = () => {
        this.setState({ footer: false });
    };

    showFooter = () => {
        this.setState({ footer: true });
    };

    render() {
        const { navbar, footer } = this.state;
        const clearFuncs = {
            hideNavbar: this.hideNavbar,
            showNavbar: this.showNavbar,
            hideFooter: this.hideFooter,
            showFooter: this.showFooter
        };

        return (
            <React.Fragment>
                <ToastContainer position="top-center" pauseOnHover/>
                { navbar && <NavBar user={ this.state.user }/> }
                <main className="container">
                    <Switch>
                        <Route path="/profile/:username" component={ Profile }/>
                        <Route path="/add-apartment" component={ AddApartment }/>
                        <Route path="/settings" component={ SettingsForm }/>
                        <Route path="/applications"
                               render={ props => <Applications { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/properties" component={ Properties }/>
                        <Route path="/edit-apartment/:id"
                               render={ props => <EditApartment { ...props }/> }/>
                        <Route path="/apartments/:id/applications"
                               render={ props => <ApartmentApplications { ...props }/> }/>
                        <Route path="/apartments/:id"
                               render={ props => <ApartmentDetails { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/apartments"
                               render={ props => <Apartments { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/login"
                               render={ props => <LoginForm { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/signup"
                               render={ props => <SignupForm { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/confirm"
                               render={ props => <AddInfoForm { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/reset-password"
                               render={ props => <ResetPassword { ...props }{ ...clearFuncs }/> }/>
                        <Route path="/not-found" component={ NotFound }/>
                        <Route path="/" exact component={ Home }/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
                { footer && <Footer/> }
            </React.Fragment>
        );
    }
}

export default App;
