import React from 'react';
import './styles.css'

import Comment from '../Comment';

export default ({ data: post }) => {
    return(
        <div className="photo-content">
            <div className="perfil">
                <img height="40px" width="40px" src="https://avatars3.githubusercontent.com/u/16761542?s=60&v=4"></img>
                <div className="perfil-info">
                    <h1>{post.author.name}</h1>
                    <p>{post.date}</p>
                </div>
            </div>
            <p className="post">{post.content}</p>
            <hr />
            {post.comments.map( (comment, index) =>  (<Comment key={comment.id} data={comment}/>))}
        </div>
    )
}