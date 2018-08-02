import React from 'react'
import {Link} from "react-router-dom";

export const Home = () => {
    return <Link  to={'/blog'} ><h1 className={"title is-2"}>Blog</h1></Link>
}