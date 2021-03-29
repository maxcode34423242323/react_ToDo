import React from 'react'
import PostListItem from '../post-list-item';
import ListGroup from 'react-bootstrap/ListGroup'

const PostList = ({posts,onDelete,onToggleHeart,onToggleLike})=>{
    const elements = posts.filter((item)=>{
        return typeof(item)==='object' && item.label !=='';
    }).map((item)=>{
        const {id,...itemProps}=item;
        return (
            <li key={id} className = 'list-group-item'>
                <PostListItem {...itemProps}
                onDelete={()=> onDelete(id)}
                onToggleLike={()=> onToggleLike(id)}
                onToggleHeart={() => onToggleHeart(id)}/>
            </li>
        )
    })
    return (
       <ListGroup className= 'app-list'>
           {elements}
       </ListGroup> 
    )
}

export default PostList;