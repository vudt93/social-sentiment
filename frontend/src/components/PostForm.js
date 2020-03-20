import React, {Component} from 'react'
import '../assets/images/loading.gif';
import 'react-notifications/lib/notifications.css';
import {Button, Form, Jumbotron} from 'reactstrap';
import TextInput from "./common/TextInput";


export default class PostForm extends Component {
    constructor(props) {
        super(props);
        const {submitForm, data, isUpdate} = props;
        this.state = {
            id: data.id,
            title: data.title,
            content: data.content,
            author: data.author,
            sentiment_score: data.sentiment_score,
            date: data.date,
            submitForm: submitForm,
            isUpdate: isUpdate,
        };
        this.setTitle = this.setTitle.bind(this);
        this.setContent = this.setContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
    }
    componentWillReceiveProps(props) {
        const {submitForm, data, isUpdate} = props;
        this.setState({
            id: data.id,
            title: data.title,
            content: data.content,
            author: data.author,
            sentiment_score: data.sentiment_score,
            date: data.date,
            submitForm: submitForm,
            isUpdate: isUpdate,
        })
    }

    setTitle(event) {
        const value = event.target.value;
        this.setState(...this.state, {title: value})
    }

    setContent(event) {
        const value = event.target.value;
        this.setState(...this.state, {content: value})
    }

    onSubmit() {
        this.props.submitForm({
            id:  this.state.id,
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
        })
    }
    render() {
        const {} = this.props;
        return (
            <div className='react-confirm-alert-body post-form'>
                <h2></h2>
                <Jumbotron className="container">
                <Form>
                    <TextInput label="Title" type="text" onChange = {this.setTitle} placeholder="Enter title" value={this.state.title}/>
                    <TextInput label="Content" type="textarea" onChange = {this.setContent} placeholder="Enter content" value={this.state.content}/>
                    {this.state.isUpdate &&
                        <div>
                            <TextInput disabled = {true} label="Author" type="text" value={this.state.author}/>
                            <TextInput disabled = {true} label="Sentiment" type="text" value={this.state.sentiment_score}/>
                            <TextInput disabled = {true} label="Date" type="text" value={this.state.date}/>
                        </div>
                    }
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