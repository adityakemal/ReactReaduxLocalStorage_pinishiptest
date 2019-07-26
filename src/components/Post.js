import React, {Component} from 'react'
import { connect } from "react-redux";
import Login from './Login.js'


class Post extends Component {
    state = {
        status : '0',
        body : '',
        title : ''
    }
    componentDidMount(){
        if (!localStorage.getItem('token')) {
            // localStorage.clear()
            // alert('you need login to access this page')
            window.location.replace("/login")
        }
    }
    
    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    toggleChange = (e)=>{
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.props.editPost(e.target.value, e.target.checked)
        localStorage.setItem('data', JSON.stringify(this.props.dataPost))
        // console.log(e.target.value);
        // console.log(e.target.checked);
    }

    handleAdd=(e)=>{
        e.preventDefault()
        this.props.addPost({id : JSON.parse(localStorage.getItem('data')).length + 1, status: this.state.status, title : this.state.title.toUpperCase(), body: this.state.body})
        this.setState({
            title : '',
            body : ''
        })
    }

    listData = ()=>{
        return JSON.parse(localStorage.getItem('data')).map((res,i)=>{
                return (
                <div className='border rounded p-3 mb-2' key = {i}>
                    
                    <div class="checkbox">
                    <label >
                        <h6>
                            <input type="checkbox" 
                            value={res.id}
                            defaultChecked={res.status === '0'? false : true}
                            onChange={this.toggleChange}/> 
                                &nbsp;&nbsp;{res.title}
                        </h6>
                    </label>
                    </div>
                    <p className='isi-body border rounded p-3'>{res.body}</p>
                </div>
                )
        })
        
    }
    
    render() {
        if (localStorage.getItem('token')) {
            return (
                <div>
                <div className='container'>
                    <form onSubmit={this.handleAdd}>
                        <div class="form-group">
                            <label for="usr">Title:</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </div>
                        <div class="form-group">
                            <label for="comment">Content:</label>
                            <textarea className="form-control" rows="5" name="body" value={this.state.body} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={this.state.title === '' || this.state.body === ''}>Tambah</button>
                    </form>
                    <hr/>
                    {this.listData()}
                </div>
            </div>
            )
            
        }else{
            return <Login/>
        }
    }
}

const mapStateToProps = (state, ownProps)=>{
    // console.log(ownProps);
    return{
        dataPost : state.posts,
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
        editPost : (id, val) => { dispatch({type:'EDIT_POST' , id : id, val : val})},
        addPost : (data) => { dispatch({type:'ADD_POST' , data: data})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)