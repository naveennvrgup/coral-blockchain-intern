import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div className="">
                <form>
                    <div className="input-group">
                        <input 
                        type="text" 
                        ref={ele => this.searchbox = ele} 
                        placeholder='enter part of email address to search the user'
                        className="form-control" />
                        <div className="input-group-append">
                            <button className="btn btn-success">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
