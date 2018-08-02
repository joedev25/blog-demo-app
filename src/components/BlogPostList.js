import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BlogItem from "./BlogItem";
import ReactPaginate from "react-paginate";
import * as contentful from "contentful";
import prettify from 'code-prettify'
import axios from 'axios'

const limit = 2

class BlogPostList extends Component {

    state = {
        posts: [],
        searchTerm:''
    }
    client = contentful.createClient({
        space: 'egc7kd5cqvli',
        accessToken: '4eccc85cdef8f8da042fc784dcf4ee3127cb13bc7ea3de5980d1638388a190c7'
    })

    componentDidMount() {
        this.fetchPosts(0,'').then(this.setPosts)
            .catch(console.error)
    }

    fetchPosts = (current,term) => this.client.getEntries({
        content_type: "blog",
        order: '-sys.createdAt',
        limit: limit,
        skip: current * limit,
        select: 'sys.id,fields.icon,fields.title,fields.introText,fields.date,fields.path',
        'query':term
    })

    setPosts = response => {
        {
            console.log(response)
        }
        this.setState({
            posts: response.items,
            pageCount: Math.ceil(response.total / limit)
        })
    }

    onPageChange(data) {
        this.fetchPosts(data.selected,this.state.searchTerm).then(this.setPosts)
    }

    performSearch(e){
        this.setState({
            searchTerm:e.target.value
        })
        this.fetchPosts(0,e.target.value).then(this.setPosts)
    }

    handleSubscribe(e){
        e.preventDefault()
        const payload = {
            listIds:[6],
            email:e.target[0].value
        }

        const instance = axios.create({
            baseURL: 'https://api.sendinblue.com/v3',
            // timeout: 1000,
            headers: {'api-key': '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'}
        });

        instance.post("/contacts",payload).then(data=>console.log(data))
            .catch(console.error)
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <input type="search"
                           onChange={this.performSearch.bind(this)}
                           placeholder={"Search..."} />
                </header>
                <br/>
                <div className="blog">
                    {this.state.posts.map((post, i) => <BlogItem key={i} post={post.fields}/>)}
                </div>
                <br/>
                <ReactPaginate
                    pageCount={this.state.pageCount}
                    onPageChange={this.onPageChange.bind(this)}
                    breakClassName={"break-me"}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    pageLinkClassName={"links"}
                    previousClassName={"prevClass"}
                    nextClassName={"nextClass"}
                    previousLinkClassName={"prevLinkClass"}
                    nextLinkClassName={"nextLinkClass"}/>

                <form onSubmit={this.handleSubscribe}>
                    <input type="email"/>
                    <input type="submit" value={"Subscribe"}/>
                </form>
            </div>
        );
    }
}

BlogPostList.propTypes = {};

export default BlogPostList;
