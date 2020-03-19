import React, {Component} from 'react'
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';

export default class DateTimeComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            isExpand : false,
            eventChange : props.eventChange,
            value : props.value,
            label : props.label,
            classPostFix : props.classPostFix ? props.classPostFix : ''
        }
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
        this.eventOnSave = this.eventOnSave.bind(this);
    }
    expand() {
        this.setState(...this.state, {isExpand : true})
    }
    collapse(event) {
        if (!event || !event.relatedTarget ||
            (event.relatedTarget.className.indexOf('expand-area-' + this.state.classPostFix) < 0 &&
                event.relatedTarget.className.indexOf('input-' + this.state.classPostFix) < 0) &&
                this.checkIfInContainer(event.relatedTarget, 'expand-area-' + this.state.classPostFix) != true)
            this.setState(...this.state, {isExpand : false})
    }
    checkIfInContainer(target, containerClass) {
        while(target.parentElement != null) {
            if (target.parentElement.className.indexOf(containerClass) > -1) return true;
            target = target.parentElement;
        }
        return false;
    }
    componentWillReceiveProps(props) {
        this.setState({eventChange : props.eventChange, value : props.value, label : props.label, classPostFix : props.classPostFix ? props.classPostFix : ''})
    }
    eventOnSave() {
        this.collapse()
    }
    onChange(time) {
        this.setState({value: time})
        this.state.eventChange(time)
    }
    render() {
        return (
            <div className={`datetime-component datetime-component-` + this.state.classPostFix}>
                <div className={'datetime-label'}>{this.state.label}</div>
                <input type = "text" className={"input-" + this.state.classPostFix} value = {this.state.value.format("HH:mm DD/MM/YY")} onClick={this.expand} onBlur={this.collapse}/>
                {this.state.isExpand && <div tabIndex="0" onBlur={this.collapse} className={`expand-area-date expand-area-${this.state.classPostFix} float-component`}>
                    <InputMoment
                      moment={this.state.value}
                      onChange={(time) => this.setState({value: time})}
                      onSave = {this.eventOnSave}
                      minStep={1} // default
                      hourStep={1} // default
                      prevMonthIcon="ion-ios-arrow-left" // default
                      nextMonthIcon="ion-ios-arrow-right" // default
                    />
                </div>}
            </div>)
    }
}
