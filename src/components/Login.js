import React, {Component} from 'react'
import {connect} from "react-redux";



class Login extends Component {
    state = {
        // data : this.props.token
    }

    componentDidMount(){
        if (localStorage.getItem('token')) {
            // localStorage.clear()
            window.location.replace("/post")
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit =(e)=>{
        if (this.props.username == this.state.username && this.props.password == this.state.password) {
            var arr = {post :[]}
            localStorage.setItem('token', true )               
        }else{
            alert('password / username anda salah')  
        }
        window.location.reload()
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className="row justify-content-md-center mt-5">
                        <div className="col col-md-5">
                        <h1 className='mt-5 mb-3'>Login</h1>
                       
                            <div className="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" className="form-control" name ='username' onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" name='password' onChange={this.handleChange} id="exampleInputPassword1" placeholder="Password" />
                            </div>
       
                            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                     
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      post: state.posts,
      username: state.username,
      password: state.pass,
    }
}


// posisi jagankebalik cuk
export default connect(mapStateToProps,)(Login)