import React, {Component} from 'react'
import '../assets/images/loading.gif';
import 'react-notifications/lib/notifications.css';
import {Button, Form, Jumbotron, Label} from 'reactstrap';
import TextInput from "./common/TextInput";


export default class UserForm extends Component {
    constructor(props) {
        super(props);
        const {submitForm, data, isUpdate} = props;
        this.state = {
            id: data.id,
            username: data.username,
            password: null,
            confirmedPassword: null,
            isMatchPassword: null,
            email: data.email,
            createdDate: data.created_date,
            submitForm: submitForm,
            isUpdate: isUpdate,
        };
        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmedPassword = this.setConfirmedPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
    }
    componentWillReceiveProps(props) {
        const {submitForm, data, isUpdate} = props;
        this.setState({
            id: data.id,
            username: data.username,
            password: null,
            confirmedPassword: null,
            isMatchPassword: null,
            email: data.email,
            createdDate: data.created_date,
            submitForm: submitForm,
            isUpdate: isUpdate,
        })
    }

    setUsername(event) {
        const value = event.target.value;
        this.setState(...this.state, {username: value})
    }

    setEmail(event) {
        const value = event.target.value;
        this.setState(...this.state, {email: value})
    }

    setPassword(event) {
        const value = event.target.value;
        this.setState(...this.state, {password: value})
    }

    setConfirmedPassword(event) {
        const value = event.target.value;
        const isMatchPassword = this.checkPasswordMatch(this.state.password, value)
        this.setState(...this.state, {
            confirmedPassword: value,
            isMatchPassword: isMatchPassword
        })
    }

    checkPasswordMatch(password, confirmed_pw) {
        return password == confirmed_pw
    }

    onSubmit() {
        if (!this.state.isUpdate && !this.state.isMatchPassword)
            return

        this.props.submitForm({
            id:  this.state.id,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        })
    }
    render() {
        const {} = this.props;
        return (
            <div className='react-confirm-alert-body user-form'>
                <h2></h2>
                <Jumbotron className="container">
                <Form>
                    <TextInput label="Username" type="text" onChange = {this.setUsername} autocomplete="off" placeholder="Enter username" value={this.state.username}/>
                    {!this.state.isUpdate &&
                        <div>
                            <TextInput onChange = {this.setPassword} label="Password" type="password" placeholder="Enter password" value={this.state.password}/>
                            <TextInput className = {this.state.isMatchPassword === false ? 'red-border' : ''} onChange = {this.setConfirmedPassword}
                                       placeholder="Retype password"
                                       autocomplete="new-password" label="Confirmed Password" type="password" value={this.state.confirmedPassword}/>
                            {this.state.isMatchPassword === false && <Label className={'red-color'}>Confirmed Password does not match!</Label>}
                        </div>
                    }
                    <TextInput label="Email" type="textarea" onChange = {this.setEmail} placeholder="Enter email" value={this.state.email}/>
                </Form>
                    <Button className='submit-btn' type="button" color="primary" size="lg" onClick={this.onSubmit}>
                      Send
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button className='submit-btn' type="button" color="primary" size="lg" onClick={this.props.setHide}>
                      Hide
                    </Button>
                </Jumbotron>
              </div>
        )
    }
}