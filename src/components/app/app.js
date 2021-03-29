import React, { Component } from 'react'
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form/post-add-form';

import './app.css';
import '../app-header/app-header.css'
import '../post-add-form/post-add-form.css'
import '../post-list/post-list.css'
import '../post-list-item/post-list-item.sass'
import '../post-status-filter/post-status-filter.css'
import '../search-panel/search-panel.css'
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [
                {label: 'Сегодня отличная погода', like: false,Heart:false, id:1},
                {label: 'Хочу в кафе', like: false,Heart:false, id:2},
                {label: 'Не так всё и плохо', like: false,Heart:false, id :3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleChange = this.onToggleChange.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleHeart = this.onToggleHeart.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        
        this.maxId = 4;
        this.count = ['!','@','#',0,3,"$",")",2,77,15]
    }
    
    deleteItem(id){
        this.setState(({data})=> {
            const index = data.findIndex(elem => elem.id===id);
            const before = data.slice(0,index);
            const after = data.slice(index+1);
            const newArr = [...before,...after];
            return{
                data:newArr
            }
        })
    }
    addItem(body){
        let a = this.count[Math.floor(Math.random() * this.count.length)]
        let b = this.count[Math.floor(Math.random() * this.count.length)]
        const newItem = {
            label: body,
            like: false,
            id: `${this.maxId++}${a}${b}$`
        }
        this.setState(({data})=>{
            const newArr = [...data,newItem];
            console.log(newItem);
            return{
                data:newArr
            }
        })
    }

    onToggleChange(id, item){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id ===id);
            const old = data[index];
            const newArr = {...old, [item]: !old[item]}
            const newArray=[...data.slice(0,index),newArr, ...data.slice(index+1)];
            return{
                data:newArray
            }
        })
    }

    onToggleLike(id){
        this.onToggleChange(id, 'like' )
    }
    onToggleHeart(id){
        this.onToggleChange(id, 'Heart')
    }

    searchPost(item,term){
        if(term.length===0){
            return item
        }
        return item.filter((item)=>{
            return item.label.indexOf(term) > -1
        })
    }
    filterPost(items,filter){
        if(filter==="like"){
            return items.filter(item=>item.Heart)
        } else{
            return items
        }
    }


    onUpdateSearch(term){
        this.setState({term:term})
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    render(){
        const{data,term,filter}=this.state;
        const liked = data.filter(item => item.Heart).length;
        const allPosts =data.length;
        const visiblePosts = this.filterPost(this.searchPost(data,term), filter);

        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className = 'search-panel d-flex'>
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                posts = {visiblePosts}
                onDelete={(this.deleteItem)}
                onToggleLike={this.onToggleLike}
                onToggleHeart={this.onToggleHeart}
                />
                <PostAddForm
                onAdd={this.addItem}/>
            </AppBlock>         
        )

    }
    
}
