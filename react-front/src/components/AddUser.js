import React, { Component } from 'react'
import fuser from '../axios';

class AddUser extends Component {
    axios = fuser()
    state = {
    }

    render() {
        return (
            <div>
                <h1 className="text-center my-5">Coral Blockchain | Internship Challenge</h1>
                <div className="success text-center my-3">{this.state.success}</div>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label>Username:</label>
                            <input className="form-control" type="text" ref={ele=>this.username=ele} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input className="form-control" type="password" ref={ele=>this.password=ele} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input className="form-control" type="email" ref={ele=>this.email=ele} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input className="form-control" type="text" ref={ele=>this.phone=ele} />
                        </div>
                        <div className="text-center">
                            <button 
                            onClick={this._addUser}
                            className="btn btn-primary submit-user-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    _addUser = e =>{
        e.preventDefault()

        const data = {
            userName : this.username.value,
            emailId : this.email.value,
            phoneNo : this.phone.value,
            password : this.password.value
        }

        this.axios.post('/addUser/',data)
            .then(d=>{
                this.setState({
                    ...this.state,
                    success: `user ${d.data.emailId} is successfully registered`
                })
                console.log(d.data);
            }).catch(e=>console.error(e))
    }

}

export default AddUser