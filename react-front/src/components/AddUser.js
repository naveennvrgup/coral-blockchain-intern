import React, { Component } from 'react'

class AddUser extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center my-5">Coral Blockchain | Internship Challenge</h1>
                <div className="container">
                    <form>
                        <div class="form-group">
                            <label for="">Username:</label>
                            <input class="form-control" type="text" id="username" />
                        </div>
                        <div class="form-group">
                            <label for="">Password:</label>
                            <input class="form-control" type="password" id="password" />
                        </div>
                        <div class="form-group">
                            <label for="">Email:</label>
                            <input class="form-control" type="email" id="email" />
                        </div>
                        <div class="form-group">
                            <label for="">Phone:</label>
                            <input class="form-control" type="text" id="phone" />
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary submit-user-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddUser