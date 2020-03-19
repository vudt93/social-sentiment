import React, {Component} from 'react'
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {closePost, createPost, getPost, getPostList, updatePost} from "../actions/post";

class Post extends Component {
    fetching = false;
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
        /*
        this.setCreateForm= this.setCreateForm.bind(this);
        this.setUpdateForm= this.setUpdateForm.bind(this);
        this.createPost= this.createPost.bind(this);
        this.updatePost= this.updatePost.bind(this);
        this.closePost= this.closePost.bind(this);
        this.reloadTable= this.reloadTable.bind(this);
        this.hidePostForm= this.hidePostForm.bind(this);
        this.hideClosePartialForm= this.hideClosePartialForm.bind(this);
        */

    }
    componentDidMount() {
        this.firstLoading = false;
        this.getPostList();
    }
    componentWillUnmount() {
        if (this.interval != null ) clearInterval(this.interval)
    }
    componentWillReceiveProps(props) {
        this.setState(...this.state,
            {
                post_list: props.post_list ? props.post_list : {},
                env: props.env,
            })
        if (this.state.env !== props.env) {
            this.firstLoading = true;
            this.getPostList();
        } else {
            this.firstLoading = false;
        }
    }
    getPostList() {
        this.props.getPostList()
    }
    updatePostList(service_id, status) {
        let param = {}
        param[service_id] = status
        this.props.updatePostList(param)
    }
    submitEnable(event) {
        const service_id = event.target.getAttribute('service_id')
        this.submit(this.updatePostList, service_id, true)
    }
    submitDisable(event) {
        const service_id = event.target.getAttribute('service_id')
        this.submit(this.updatePostList, service_id,false)
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
        let post_lst_html = []

        this.post_list && this.post_list.forEach(post => {
            post_lst_html.push(<li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div>{post.author}</div>
                <div>{post.sentiment_score}</div>
                <div>{post.date}</div>
            </li>)

        });
        return (
            <div className="service-status">
                <h2 style={{textAlign: 'center'}}>Post</h2>
                <div className="overview">
                    <ul>
                        {post_lst_html}
                    </ul>
                    </div>
                <br />
            </div>
        )
    }
}

export default connect((state) => ({
        post_list: state.post.post_list,
        env: state.env.env,
    }), (dispatch) => ({
        getPostList: () => dispatch(getPostList()),
        getPost: (ticket) => dispatch(getPost(ticket)),
        createPost: (param) => dispatch(createPost(param)),
        updatePost: (ticket, param) => dispatch(updatePost(ticket, param)),
        closePost: (ticket, param) => dispatch(closePost(ticket, param)),
    })
)(Post);