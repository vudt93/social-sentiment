import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

import expandArrow from '../assets/images/expand-arrow.svg';
import expandButton from '../assets/images/expand-button.svg';

export default class LeftSideBar extends Component {
    constructor() {
        super();
        const listSubMenu = ['List'];

        this.state = {
            expand : {
                monitor : listSubMenu.filter(subMenu => window.location.href.indexOf(subMenu) >= 0).length > 0 ? true : false,
            }
        };
        this.toggleMenuExpand = this.toggleMenuExpand.bind(this)
    }
    toggleMenuExpand(event) {
        event.preventDefault();
        const menu_type = event.target.getAttribute('menu_type') || event.target.parentElement && event.target.parentElement.getAttribute('menu_type');
        let expand = {...this.state.expand};
        expand[menu_type] = !expand[menu_type];
        this.setState(...this.state, {expand: expand})
    }
    render() {
        return (
            <div className="left-menu">
                <span onClick={this.props.toggleMenu}
                      className={`hide-show-btn ${this.props.showLeftMenu ? '' : 'rotate180'}`}></span>
              <div className={`menu-nav ${this.props.showLeftMenu ? '' : 'hide'}`}>
                <NavLink activeClassName="active" className = "menu" exact to="/">Home</NavLink>
                  <div className = "menu menu-lv1" menu_type = 'monitor' onClick={this.toggleMenuExpand}>
                      <img className={`hide-show-submenu ${this.state.expand.monitor ? '' : ''}`} src={this.state.expand.monitor ? expandArrow: expandButton} width={15} height={10}/>
                      <span className='menu-title'>Monitor</span>
                  </div>
                  <div className={`sub-menu-wrapper ${this.state.expand.monitor ? '' : 'hidden'}`}>
                    <NavLink activeClassName="active" className = "menu sub-menu" to="/Post">Post</NavLink>
                  </div>
                  <div className={`sub-menu-wrapper ${this.state.expand.monitor ? '' : 'hidden'}`}>
                    <NavLink activeClassName="active" className = "menu sub-menu" to="/User">User</NavLink>
                  </div>
              </div>
            </div>
        )
    }
}
