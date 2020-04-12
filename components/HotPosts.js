import React, { Component } from 'react';
import Post from './Post';
import AnimatedTransition from './AnimatedTransition';

export class HotPosts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: false,
            selectedPost: false,
        };
    }

    getPosts(url) {
        fetch(require("path").join('https://www.reddit.com/', url, 'hot.json?raw_json=1'))
        .then(res => res.json())
        .then(json => this.updateState(json));
    }

    updateState(json) {
        let posts = [];
        for (const index in json.data.children) {
            posts.push(json.data.children[index].data)
        }
        this.setState({posts: posts, selectedPost: false});
    }

    componentDidUpdate(prevProps) {
        // When this component receives a new
        // url property from the parent component,
        // update the list of posts if that url
        // is different from the current url;
        // if the url is false (meaning that the user
        // has deselected one of the subreddits), then
        // remove all the posts

        if (prevProps.url != this.props.url) {
            if (this.props.url) {
                this.getPosts(this.props.url);
            } else {
                this.setState({posts: false, selectedPost: false})
            }
        }
      }

    selectItem(selectedPost) {
        // When an item is selected, 
        if (this.state.selectedPost) {
            if (this.state.selectedPost == selectedPost) {
                this.setState({selectedPost: false});
            } else {
                this.setState({selectedPost: selectedPost});
            }
        } else {
            this.setState({selectedPost: selectedPost});
        }
    }

    render() {
        // Generate the list of hot posts

        var items;

        if (this.state.posts) {
            items = this.state.posts.map((post) =>
                <AnimatedTransition key={post.title}>
                    <li className={this.state.selectedPost.title == post.title ? "row selected rounded-left" : "row unselected"}>
                        <a href="#" onClick={() => this.selectItem(post)}>
                            {post.title}
                        </a>
                    </li>
                </AnimatedTransition>
            );
        } else {
            items = '';
        }

        // When the list of hot posts is rendered,
        // it passes a property to the Post component
        // containing the information of the post that
        // is currently selected

        return ([
            <div className="col border-right panel" id="hotposts" key="first">
                <h3>Hot Posts</h3>
                <ul>
                    {items}
                </ul>
            </div>,
            <Post post={this.state.selectedPost} key="second"/>
        ])
    }
}

export default HotPosts
