import React, { Component } from 'react'

export default class PostListItem extends Component {

    render(){
        const {label,onDelete,onToggleLike,onToggleHeart,like,Heart} = this.props;
        let classNames = 'app-list-item d-flex justify-content-between';
        if (like){
            classNames += ' important';
        }
        if (Heart){
            console.log(Heart)
            classNames += ' like';
        }


        return (
        <div className = {classNames}>
            <span 
            className = 'app-list-item-label'
            onClick={onToggleHeart}>
                {label}
            </span>
            <div className = 'd-flex justify-content-center align-items-center'>
                <button 
                type = 'button'
                className = 'btn-star btn-sm'
                onClick={onToggleLike}>
                    <i className = 'fa fa-star'></i>
                </button>
                <button type = 'button'
                className = 'btn-trash btn-sm'
                onClick={onDelete} >
                    <i className = 'fa fa-trash-o'></i>
                </button>
                <i className = 'fa fa-heart'></i>
            </div>
        </div>
        )
    }
}
