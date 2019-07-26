import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch} from "react-router-dom";
import Login from './Login.js'
import Post from './Post.js'
import About from './About.js'
import { connect } from "react-redux";

class Home extends Component {
    state = {
        username: 'kemal',
        pass: 'kemal',
    }

    componentDidUpdate(){
        localStorage.setItem('data', localStorage.getItem('data'))
    }
    
    home = ()=>{
            if (JSON.parse(localStorage.getItem('data')).length == 0 ) {
                return <div>
                        <center>
                        Konten masi kosong isi di halaman Post..
                        </center>
                    </div>
            }
            return JSON.parse(localStorage.getItem('data')).map((res,i) =>{
                if (res.status === '1') {
                    return (
                        <div className="container" key = {i}>
                            <div >
                                <center>
                                    <h3>{ res.title}</h3>
                                </center>
                                <div className='border rounded p-2 mb-4 isi-body'>
                                    <p>{res.body}</p>
                                </div>
                            </div>

                        </div>
                        
                    )
                }
            })
      
    }
    render() {
            return (
                    <Router>
                        <ul class="nav justify-content-center">
                            <li className="nav-item">
                                <NavLink  to="/" exact activeClassName="active">Home</NavLink> 
                            </li>
                            <li className="nav-item">
                                <NavLink  to="/post" exact activeClassName="active">Posts</NavLink> 
                            </li>
                            <li className="nav-item">
                                <NavLink  to="/about" exact activeClassName="active">About</NavLink> 
                            </li>|
                            <li className="nav-item">
                                <a className="logout" onClick={()=>{localStorage.removeItem('token'); window.location.replace('/')}}>Logout</a> 
                            </li>
                        </ul>
                            <hr/>
                        <div className='mt-5'>
                            <Switch>
                                <Route path='/' exact component={this.home}/>
                                <Route path='/about' exact component={About}/> 
                                <Route path='/post' exact component={Post}/>
                                <Route path='/login' exact component={Login}/> 
                                <Route component={GakAda}/>
                            </Switch>
                        </div>
                    </Router>
            )
    }
}
const GakAda = () => {
    return <div>404 halaman tidak ada</div>
}

const mapStateToProps = (state, ownProps)=>{
//   console.log(ownProps);
  return{
      post : state.posts
  }
}
// export default App;
export default connect(mapStateToProps)(Home)
