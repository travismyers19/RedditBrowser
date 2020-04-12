import React, { Component, Fragment } from 'react';

export class AnimatedTransition extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            opacity: 0,
        };
    }

    updateOpacity() {
        if (this.state.opacity >= 1) {
            this.state.opacity = 1;
            clearInterval(this.timerID);
        } else {
            this.setState({opacity: this.state.opacity + 0.01});
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.updateOpacity(),
          0.01
        );
    }

    render() {
        return (
            <Fragment>
                {React.cloneElement(this.props.children, { style: {opacity: this.state.opacity} })}
            </Fragment>
        )
    }
}

export default AnimatedTransition
