import React, {Component} from 'react'
import '../assets/images/loading.gif';
import {deleteRedisKey, getRedisKeyList} from "../actions/redis_key";
import 'react-notifications/lib/notifications.css';

export default class ConfirmReInput extends Component {
    constructor(props) {
        super();
        this.state = {
            confirmValue: props.confirmValue,
            isConfirmed: false,
            func: props.func,
            param: props.param,
        }
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidMount() {
    }
    onChangeInput(event) {
        const value = event.target.value
        if (value == this.state.confirmValue) {
            this.setState(...this.state, {isConfirmed: true})
        } else {
            if (this.state.isConfirmed == true)
                this.setState(...this.state, {isConfirmed: false})
        }

    }
    submit() {
        this.props.onClose()
        this.state.func(this.state.param)
    }
    render() {
        const {title, message, onClose} = this.props
        return (
            <div className='react-confirm-alert-body'>
                <h2>{title}</h2>
                <p>{message}<b>{this.state.confirmValue}</b></p>
                <input type="text" style = {{paddingLeft: '10px', width: '100%'}} onChange={this.onChangeInput} onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode || e.code || 0
                    keyCode == 13 && this.state.isConfirmed && this.submit()
                }}/>
                <div className='react-confirm-alert-button-group'>
                <button onClick={onClose}>No</button>
                {this.state.isConfirmed && <button onClick={() => {
                    this.submit()
                }}>Yes, Delete it!</button>}
                </div>
              </div>
        )
    }
}