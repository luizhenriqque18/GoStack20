import React from 'react'
import './styles.css';

export default ({data: comment}) => {
    return(
       <div className="comment">
           <img width="30px" height="30px" src="https://avatars3.githubusercontent.com/u/16761542?s=60&v=4"/>
            <p>
                <b>{comment.author.name} </b> 
                {comment.content}
            </p>
       </div>
    )
}