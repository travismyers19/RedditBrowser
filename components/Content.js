import React, { Component } from 'react';
import HotPosts from './HotPosts';
import AnimatedTransition from './AnimatedTransition'

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            subreddits: false,
            urls: false,
            selected: false,
        };
    }

    componentDidMount() {
        fetch('https://www.reddit.com/subreddits/popular.json')
          .then(res => res.json())
          .then(json => this.initializeState(json));
    }

    initializeState(json) {
        let subreddits = [];
        let urls       = [];
        for (const index in json.data.children) {
            subreddits.push(json.data.children[index].data.display_name)
                  urls.push(json.data.children[index].data.url)
        }
        this.setState({subreddits: subreddits, urls: urls});
    }

    selectItem(selected) {
        // When an item is clicked, if it is currently
        // selected then it is unselected so that no
        // item is selected; otherwise, it becomes
        // selected
        
        if (this.state.selected) {
            if (this.state.selected == selected) {
                this.setState({selected: false});
            } else{
                this.setState({selected: selected});
            }
        } else {
            this.setState({selected: selected});
        }
    }

    render() {
        // Generate list of subreddits, showing
        // 'Loading' if they haven't loaded from
        // the json http request yet

        var items;

        if (this.state.subreddits) {
            items = this.state.subreddits.map((subreddit) =>
                <AnimatedTransition key={subreddit}>
                    <li className={this.state.selected == subreddit ? "row selected rounded-left" : "row unselected"}>
                        <a href="#" onClick={() => this.selectItem(subreddit)}>
                            {subreddit}
                        </a>
                    </li>
                </AnimatedTransition>
            );
        } else {
            items = 'Loading...';
        }

        // When the list of subreddits is rendered, it
        // passes a url property to the Hot Posts component
        // indicating the url of the selected subreddit, which will
        // then be used to load the list of hot posts within that subreddit

        return (
            <div className="row" id="content">
                <div className="col border-right panel in" id="subreddits">
                    <h3>Popular Subreddits</h3>
                    <ul>
                        {items}
                    </ul>
                </div>
                <HotPosts url={this.state.selected ? this.state.urls[this.state.subreddits.indexOf(this.state.selected)] : false}/>
            </div>
        )
    }
}

export default Content
