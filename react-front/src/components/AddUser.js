import React, { Component } from 'react'
import fuser from '../axios';

class AddUser extends Component {
    axios = fuser()
    state = {
        msg: '',
        error: []
    }

    render() {
        const successAlert = this.state.msg &&
            <div className="alert d-flex justify-content-between alert-success" role="alert">
                <div>{this.state.msg}</div>
                <div className="align-self-center">
                    <button onClick={this._dismissSA} className="btn btn-sm btn-success">
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>

        const warningAlert = this.state.error.length > 0 &&
            <div className="alert d-flex justify-content-between alert-danger" role="alert">
                <div>
                    {this.state.error.map((ele, id) =>
                        <div key={id}>{ele}</div>
                    )}
                </div>
                <div className="align-self-center">
                    <button onClick={this._dismissWA} className="btn btn-sm btn-danger">
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>


        return (
            <div>
                {successAlert}
                {warningAlert}
                <div className="">
                    <form>
                        <div className="form-group">
                            <label>Username:</label>
                            <input className="form-control" type="text" ref={ele => this.username = ele} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input className="form-control" type="password" ref={ele => this.password = ele} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input className="form-control" type="email" ref={ele => this.email = ele} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input className="form-control" type="text" ref={ele => this.phone = ele} />
                        </div>
                        <div className="text-center">
                            <button
                                onClick={this._addUser}
                                className="btn btn-success submit-user-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    _dismissSA = e => {
        e && e.preventDefault()

        this.setState({
            ...this.state,
            msg: ''
        })
    }

    _dismissWA = e => {
        e && e.preventDefault()

        this.setState({
            ...this.state,
            error: []
        })
    }

    _addUser = e => {
        e.preventDefault()

        const data = {
            userName: this.username.value,
            emailId: this.email.value,
            phoneNo: this.phone.value,
            password: this.password.value
        }

        // validation
        let tempErr = []
        let emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        if (!data.userName) {
            tempErr.push('Please enter a valid username')
        }
        if (data.password.length < 6) {
            tempErr.push('Password should be atleast 6 characters long')
        }
        if (!emailRegex.test(data.emailId)) {
            tempErr.push('Please enter a valid email id')
        }
        if (data.phoneNo.length !== 10) {
            tempErr.push('Please enter a valid phone')
        }
        if (tempErr.length > 0) {
            this.setState({
                ...this.state,
                error: tempErr,
                msg: ''
            })
            return
        }

        // empty the values if there is no error
        this.username.value = ''
        this.email.value = ''
        this.phone.value = ''
        this.password.value = ''

        this.axios.post('addUser/', data)
            .then(d => {
                this.setState({
                    ...this.state,
                    msg: d.data.msg,
                    error: []
                })
                console.log(d.data);
            }).catch(e => console.error(e))
    }

}

export default AddUser