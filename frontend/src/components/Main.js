import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Post from "./Post";
import User from "./User";
import LeftSideBar from "./LeftSideBar";

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showLeftMenu: true
        };
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    toggleMenu(){
        this.setState({showLeftMenu: !this.state.showLeftMenu});
    }
    render() {
            return (
                <Router>
                    <div className={`row main ${this.state.showLeftMenu ? '' : 'hide-menu'}`}>
                        <LeftSideBar toggleMenu = {this.toggleMenu} showLeftMenu = {this.state.showLeftMenu}/>
                        <div className="wrapper">

                            <Switch>
                                <Route path="/Post" component={Post} />
                                <Route path="/User" component={User} />
                                <Route path="/" component={Home} />
                            </Switch>
                        </div>
                    </div>
                </Router>

        )
    }
}
