import React, {Component} from 'react'
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {closeUser, createUser, getUser, getUserList, updateUser} from "../actions/user";

class User extends Component {
    fetching = false;
    firstLoading = true;
    interval = null;
    constructor(props) {
        super();
        this.state = {
            user_list: null,
            isShowUserForm: false,
            env: props.env,
        }
        /*
        this.setCreateForm= this.setCreateForm.bind(this);
        this.setUpdateForm= this.setUpdateForm.bind(this);
        this.createUser= this.createUser.bind(this);
        this.updateUser= this.updateUser.bind(this);
        this.closeUser= this.closeUser.bind(this);
        this.reloadTable= this.reloadTable.bind(this);
        this.hideUserForm= this.hideUserForm.bind(this);
        this.hideClosePartialForm= this.hideClosePartialForm.bind(this);
        */

    }
    componentDidMount() {
        this.firstLoading = false;
        this.getUserList();
    }
    componentWillUnmount() {
        if (this.interval != null ) clearInterval(this.interval)
    }
    componentWillReceiveProps(props) {
        this.setState(...this.state,
            {
                status: props.status ? props.status : {},
                env: props.env,
            })
        if (this.state.env !== props.env) {
            this.firstLoading = true;
            this.getUserList();
        } else {
            this.firstLoading = false;
        }
    }
    getUserList() {
        this.props.getUserList()
    }
    updateUserList(service_id, status) {
        let param = {}
        param[service_id] = status
        this.props.updateUserList(param)
    }
    submitEnable(event) {
        const service_id = event.target.getAttribute('service_id')
        this.submit(this.updateUserList, service_id, true)
    }
    submitDisable(event) {
        const service_id = event.target.getAttribute('service_id')
        this.submit(this.updateUserList, service_id,false)
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
        let user_lst_html = []

        this.user_list && this.user_list.forEach(user => {
            user_lst_html.push(<li>
                <h3>{user.title}</h3>
                <p>{user.content}</p>
                <div>{user.author}</div>
                <div>{user.sentiment_score}</div>
                <div>{user.date}</div>
            </li>)

        });
        return (
            <div className="service-status">
                <h2 style={{textAlign: 'center'}}>User</h2>
                <div className="overview">
                    <ul>
                        {user_lst_html}
                    </ul>
                    </div>
                <br />
            </div>
        )
    }
}

export default connect((state) => ({
        user_list: state.user.user_list,
        env: state.env.env,
    }), (dispatch) => ({
        getUserList: (param) => dispatch(getUserList(param)),
        getUser: (ticket) => dispatch(getUser(ticket)),
        createUser: (param) => dispatch(createUser(param)),
        updateUser: (ticket, param) => dispatch(updateUser(ticket, param)),
        closeUser: (ticket, param) => dispatch(closeUser(ticket, param)),
    })
)(User);