import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx'
import {client} from '../client';


class BlogPost extends Component {

    state = {
        post: ""
    }

    constructor(props){
        super(props)
        this.runCodePrettify()
    }

    componentDidMount(){
        this.fetchPosts().then(this.setPosts).catch(console.error)
        this.runCodePrettify()
    }

    fetchPosts = () => client.getEntries({
        content_type:'blog',
        'fields.title' : this.props.match.params.blogPath
    })

    setPosts = response => {
        this.setState({
            post: response.items[0].fields,
        })
    }

    runCodePrettify() {
        console.log("NOT RUNNING ON TIME")
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;

        script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert&lang=swift&lang=js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }

    render() {
        const {title,icon,date,content} = this.state.post
        return (
            <div >
                <img src={icon} alt={title}/>
                <h1 className="title is-2">{title}</h1>
                <br/>
                <p>{date}</p>
                <br/>


                <Markdown  children={`${content}`}
                            options={{overrides: {
                                    pre:{
                                        props:{
                                            className:"prettyprint lang-js"
                                        }
                                    }
                                }
                            }}

                    />
                <br/>
            </div>
        );
    }
}

BlogPost.propTypes = {};

export default BlogPost;
