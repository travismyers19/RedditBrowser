import React, { Component } from 'react';
import reactDOM from 'react-dom'

import Header from './Header';
import Content from './Content';

export class App extends Component {
    // The general composition of the app is as follows:
    // "Content" renders the list of popular subreddits
    // and passes properties to the "HotPosts" component,
    // which then renders the list of hot posts and then
    // passes properties to the "Post" component
    
    render() {
        return (
            <div className="container" id="root">
                <Header />
                <Content />
            </div>
        )
    }
}

export default App

reactDOM.render(<App />, document.getElementById('app'))
