import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div className="row border-bottom">
                <div className="col" id="header">
                    <h1>Reddit Browser</h1>
                </div>
            </div>
        )
    }
}

export default Header
