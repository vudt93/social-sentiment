import React, {Component} from 'react'
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {createUser, deleteUser, getUser, getUserList, updateUser} from "../actions/user";
import UserForm from "./UserForm";
import {createNotification} from "../helper";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";

class User extends Component {
    fetching = false;
    is_get_user = false;
    firstLoading = true;
    interval = null;
    constructor(props) {
        super();
        this.state = {
            user_list: null,
            isShowUserForm: false,
            env: props.env,
        }
        this.getUserList= this.getUserList.bind(this);

        this.setCreateForm= this.setCreateForm.bind(this);
        this.setUpdateForm= this.setUpdateForm.bind(this);
        this.createUser= this.createUser.bind(this);
        this.updateUser= this.updateUser.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
        this.reloadUser= this.reloadUser.bind(this);
        this.hideUserForm= this.hideUserForm.bind(this);


    }
    componentDidMount() {
        this.firstLoading = false;
        this.getUserList();
    }
    componentWillUnmount() {
        if (this.interval != null ) clearInterval(this.interval)
    }
    componentWillReceiveProps(props) {
        this.setState(...this.state, {
                user_list: props.user_list ? props.user_list : {},
                env: props.env,
            })
        if (this.state.env !== props.env) {
            this.firstLoading = true;
            this.getUserList();
        } else {
            this.firstLoading = false;
            if (props.type == 'CHANGE_SUCCESS') {
                createNotification('SUCCESS', props.message)();
                this.hideUserForm();
                setTimeout(() => this.getUserList(), 2000)

            }
            if (this.is_get_user) {
                createNotification(props.type, props.message)();
                this.is_get_user = false;
            }
        }
    }
    getUserList() {
        this.props.getUserList()
        this.is_get_user = true;
    }
    setCreateForm(param) {
        this.setState(...this.state, {isShowUserForm: true, submitUser: this.createUser,
                                             update_user_data: param, isUpdate: false})
    }
    setUpdateForm(param) {
        this.setState(...this.state, {isShowUserForm: true, submitUser: this.updateUser,
                                             update_user_data: param, isUpdate: true})
    }
    createUser(param) {
        this.props.createUser(param)
    }
    updateUser(param) {
        this.props.updateUser(param.id, param)
    }
    deleteUser(param) {
        this.props.deleteUser(param.id)
    }
    reloadUser() {
        this.getUserList();
    }
    hideUserForm() {
        this.setState({isShowUserForm: false})
    }
    submit = (func, service_id, status) => {
        func(service_id, status)
        return
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                  func(service_id, status)
              }
            },
            {
              label: 'No',
            }
          ]
        })
      };
    render() {
        if (this.firstLoading == true) {
            return <div className='loading-wrapper'>
                    <progress></progress>
                    {/*<img width = {100} height = {100} src={loading} alt="Loading..." />*/}
                </div>
        }
        const user_list = this.state.user_list
        let user_lst_html = []

        user_list && user_list.forEach((user, i) => {
            user_lst_html.push(<li key = {`${i}-user`}>
                <h3>Username: {user.username}</h3>
                <p>Email: {user.email}</p>
                <div>Joined Date: {user.created_date}</div>
                <div>
                    <span key = {`${i}-Edit`} className={`td-lv1`}><span className={`link mediumblue-color`} onClick = {() => this.setUpdateForm(user)}>Edit</span></span>
                    <span key = {`${i}-Delete`} className={`td-lv1`}><span className={`link dark-red-color`} onClick = {() => this.deleteUser(user)}>Delete</span></span>
                </div>
            </li>)

        });
        return (
            <div className="user-list">
                <h2 style={{textAlign: 'center'}}>User</h2>
                <div className="overview">
                    <ul>
                        {user_lst_html}
                    </ul>
                    <div className={'btn-area'}>
                        <button className='create-user-btn btn btn-primary' type="button" color="primary" size="lg" onClick={this.reloadUser}>
                            Reload
                        </button>
                        <button className='create-order-btn btn btn-primary' type="button" color="primary" size="lg" onClick={() => this.setCreateForm({})}>
                            Create
                        </button>
                    </div>
                    <div className = "row">                        
                        {this.state.isShowUserForm && <UserForm submitForm={this.state.submitUser} data={this.state.update_user_data}
                                   isUpdate={this.state.isUpdate} setHide={this.hideUserForm}/>}
                    </div>
                </div>
                <br />
                <NotificationContainer/>
            </div>
        )
    }
}

export default connect((state) => ({
        user_list: state.user.user_list,
        type: state.user.type,
        message: state.user.message,
        env: state.env.env,
    }), (dispatch) => ({
        getUserList: () => dispatch(getUserList()),
        getUser: (ticket) => dispatch(getUser(ticket)),
        createUser: (param) => dispatch(createUser(param)),
        updateUser: (ticket, param) => dispatch(updateUser(ticket, param)),
        deleteUser: (ticket, param) => dispatch(deleteUser(ticket, param)),
    })
)(User);