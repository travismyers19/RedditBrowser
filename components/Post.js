import React, { Component } from 'react';
import AnimatedTransition from './AnimatedTransition';

export class Post extends Component {
    getImage(post) {
        if (post.preview && post.preview.images.length > 0) {
            let index = 2;
            if (post.preview.images[0].resolutions.length < 3) {
                index = post.preview.images[0].resolutions.length - 1;
            }
            return (
                <img src={post.preview.images[0].resolutions[index].url} />
            );
        }
        return '';
    }

    render() {
        var post;
        if (this.props.post) {
            post = [this.props.post.title].map((key) =>
                <AnimatedTransition key={key}>
                    <div>
                        <h4>{this.props.post.title}</h4>
                        <h5>Author:  {this.props.post.author}</h5>
                        {this.getImage(this.props.post)}
                        <div id="post-text">
                            {this.props.post.selftext}
                        </div>
                    </div>
                </AnimatedTransition>
            );
        } else {
            post = '';
        }
        return (
            <div className="col-6 panel" id="post">
                {post}
            </div>
        )
    }
}

export default Post
