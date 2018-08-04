import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import BlogPost from "./BlogPost";
import BlogPostList from "./BlogPostList";
import {Home} from "./Home";


class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/'} component={Home} exact/>
                <Route path={"/blog"} component={BlogPostList} exact/>
                <Route path={"/blog/:blogPath"} component={BlogPost} exact/>
            </Switch>
        );
    }
}

Router.propTypes = {};

export default Router;
