import React from 'react'
import logo from '../assets/images/logo.png';
import {connect} from "react-redux";
import {changeEnv} from "../actions/env";
import {logout} from "../actions/auth";
import {isAuthenticated} from "../reducers";

const Header = (props) => {
    return (<header className="App-header">
        <span className="logo"> <img src={logo} className="App-logo" alt="logo" /></span>
        <h1 className="App-title title">News</h1>
        {props.isAuthenticated &&
            <div>
                <span onClick={props.logout} className={`logout-btn`}>Log Out</span>
                <div className={'env-tray'}>
                    <span onClick={props.changeEnvLocal} className={`env-btn ${props.env=='local' ? 'active' : ''}`}>Local</span>
                    <span onClick={props.changeEnvDev} className={`env-btn ${props.env=='dev' ? 'active' : ''}`}>Dev</span>
                    <span onClick={props.changeEnvBeta} className={`env-btn ${props.env=='beta' ? 'active' : ''}`}>Beta</span>
                </div>
            </div>
        }
    </header>)
}

export default connect(
    state => ({
        env: state.env.env,
        isAuthenticated: isAuthenticated(state)
    }),
    dispatch => ({
        changeEnvLocal: () => dispatch(changeEnv('local')),
        changeEnvDev: () => dispatch(changeEnv('dev')),
        changeEnvBeta: () => dispatch(changeEnv('beta')),
        logout: () => dispatch(logout()),
    })
)(Header)