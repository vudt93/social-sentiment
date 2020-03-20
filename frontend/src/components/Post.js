import React, {Component} from 'react'
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {createPost, deletePost, getPost, getPostList, updatePost} from "../actions/post";
import PostForm from "./PostForm";
import {createNotification} from "../helper";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";

class Post extends Component {
    fetching = false;
    is_get_post = false;
    firstLoading = true;
    interval = null;
    constructor(props) {
        super();
        this.state = {
            post_list: null,
            isShowPostForm: false,
            env: props.env,
        }
        this.getPostList= this.getPostList.bind(this);

        this.setCreateForm= this.setCreateForm.bind(this);
        this.setUpdateForm= this.setUpdateForm.bind(this);
        this.createPost= this.createPost.bind(this);
        this.updatePost= this.updatePost.bind(this);
        this.deletePost= this.deletePost.bind(this);
        this.reloadPost= this.reloadPost.bind(this);
        this.hidePostForm= this.hidePostForm.bind(this);


    }
    componentDidMount() {
        this.firstLoading = false;
        this.getPostList();
    }
    componentWillUnmount() {
        if (this.interval != null ) clearInterval(this.interval)
    }
    componentWillReceiveProps(props) {
        this.setState(...this.state, {
                post_list: props.post_list ? props.post_list : {},
                env: props.env,
            })
        if (this.state.env !== props.env) {
            this.firstLoading = true;
            this.getPostList();
        } else {
            this.firstLoading = false;
            if (props.type == 'CHANGE_SUCCESS') {
                createNotification('SUCCESS', props.message)();
                this.hidePostForm();
                setTimeout(() => this.getPostList(), 2000)

            }
            if (this.is_get_post) {
                createNotification(props.type, props.message)();
                this.is_get_post = false;
            }
        }
    }
    getPostList() {
        this.props.getPostList()
        this.is_get_post = true;
    }
    setCreateForm(param) {
        this.setState(...this.state, {isShowPostForm: true, submitPost: this.createPost,
                                             update_post_data: param, isUpdate: false})
    }
    setUpdateForm(param) {
        this.setState(...this.state, {isShowPostForm: true, submitPost: this.updatePost,
                                             update_post_data: param, isUpdate: true})
    }
    createPost(param) {
        this.props.createPost(param)
    }
    updatePost(param) {
        this.props.updatePost(param.id, param)
    }
    deletePost(param) {
        this.props.deletePost(param.id)
    }
    reloadPost() {
        this.getPostList();
    }
    hidePostForm() {
        this.setState({isShowPostForm: false})
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
        const post_list = this.state.post_list
        let post_lst_html = []

        post_list && post_list.forEach((post, i) => {
            post_lst_html.push(<li key = {`${i}-post`}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div>Author: {post.author}</div>
                <div>Sentiment: {post.sentiment_score}</div>
                <div>Date: {post.date}</div>
                <div>
                    <span key = {`${i}-Edit`} className={`td-lv1`}><span className={`link mediumblue-color`} onClick = {() => this.setUpdateForm(post)}>Edit</span></span>
                    <span key = {`${i}-Close`} className={`td-lv1`}><span className={`link dark-red-color`} onClick = {() => this.deletePost(post)}>Delete</span></span>
                </div>
            </li>)

        });
        return (
            <div className="post-list">
                <h2 style={{textAlign: 'center'}}>Post</h2>
                <div className="overview">
                    <ul>
                        {post_lst_html}
                    </ul>
                    <div className={'btn-area'}>
                        <button className='create-post-btn btn btn-primary' type="button" color="primary" size="lg" onClick={this.reloadPost}>
                            Reload
                        </button>
                        <button className='create-order-btn btn btn-primary' type="button" color="primary" size="lg" onClick={() => this.setCreateForm({})}>
                            Create
                        </button>
                    </div>
                    <div className = "row">                        
                        {this.state.isShowPostForm && <PostForm submitForm={this.state.submitPost} data={this.state.update_post_data}
                                   isUpdate={this.state.isUpdate} setHide={this.hidePostForm}/>}
                    </div>
                </div>
                <br />
                <NotificationContainer/>
            </div>
        )
    }
}

export default connect((state) => ({
        post_list: state.post.post_list,
        type: state.post.type,
        message: state.post.message,
        env: state.env.env,
    }), (dispatch) => ({
        getPostList: () => dispatch(getPostList()),
        getPost: (ticket) => dispatch(getPost(ticket)),
        createPost: (param) => dispatch(createPost(param)),
        updatePost: (ticket, param) => dispatch(updatePost(ticket, param)),
        deletePost: (ticket, param) => dispatch(deletePost(ticket, param)),
    })
)(Post);