import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class BlogItem extends Component {
    render() {
        const {post} = this.props
        return (
            <div className={"card"}>
                <div className="card-image  has-background-primary">
                    <figure className={"image is-4by3"}>
                        <img src={post.icon} alt="card"/>
                    </figure>
                </div>
                <div className="card-content">
                    <Link to={`/blog/${post.title}`} className={"title is-3"}>{post.title}</Link>
                    <div className="content">
                        <p>{post.introText}</p>
                    </div>
                </div>
            </div>
        );
    }
}

BlogItem.propTypes = {};

export default BlogItem;
