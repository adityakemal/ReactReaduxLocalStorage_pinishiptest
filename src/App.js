import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import Login from './components/Login.js'
import Home from './components/Home.js'
import {connect} from "react-redux";

class App extends Component {
    state={
      auth : false
    }
    componentDidMount() {
      if (localStorage.getItem('token')) {
        this.setState({
          auth : true
        })
      }
    }

    componentDidUpdate(){
      if (this.props.post.length > JSON.parse(localStorage.getItem('data')).length) {
        localStorage.setItem('data', JSON.stringify(this.props.post))
      }
      if (this.props.post.length < JSON.parse(localStorage.getItem('data')).length) {
        for (const parse of JSON.parse(localStorage.getItem('data'))) {
          this.props.addPost(parse)
        }
      }
      console.log(this.props.post.length,'jumlah props');
      console.log(JSON.parse(localStorage.getItem('data')).length,'jumlah localstorage');
    }
    render() {
        // console.log(this.props, 'frome app js');
        // if (this.state.auth) {
            return <Home/>
        // } else {
        //     return <Login/>
        // }
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
      post: state.posts,
      auth: state.isAuth,
      username: state.username,
      password: state.pass,
    }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      addPost : (data) => { dispatch({type:'ADD_POST' , data: data})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
