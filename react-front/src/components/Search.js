import React, { Component } from 'react'
import fuser from '../axios'

export default class Search extends Component {
    axios = fuser()
    state = {
        results: []
    }

    render() {
        const results = this.state.results.map((ele, i) =>
            <div key={i} className="user mt-3 d-flex border  p-3">
                <div className='align-self-center'>{i + 1}.</div>
                <div className="flex-grow-1 ml-3">
                    <div>Username: {ele.userName}</div>
                    <div>Email: {ele.emailId}</div>
                    <div>Phone : {ele.phoneNo}</div>
                    <div className='d-inline-block'>Password: {ele.password}</div>
                    <div>Created On: {ele.dateTime ? ele.dateTime.slice(0,10) : 'not avaiable'}</div>
                </div>
                <div className='align-self-center'>
                    <button
                        onClick={this._delete}
                        data-email={ele.emailId}
                        className="btn btn-sm btn-danger">delete</button>
                </div>
            </div>
        )

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
                            <button
                                onClick={this._search}
                                className="btn btn-success">Search</button>
                        </div>
                    </div>
                </form>
                <div className="results-head mt-3">
                    Total results: {this.state.results.length}
                </div>
                <div className="results">
                    {results}
                </div>
            </div>
        )
    }

    _search = e => {
        e && e.preventDefault()

        this.axios.post('findUser/', { email: this.searchbox.value })
            .then(d => {
                this.setState({
                    ...this.state,
                    results: d.data
                })
                console.log(this.state.results);
            }).catch(e => console.error(e))
    }

    _delete = e => {
        e.preventDefault()
        
        this.axios.delete(`deleteUser/${e.target.dataset.email}/`)
            .then(d => {
                console.log('object');
                this._search()
                console.log(d.data);
            }).catch(e => console.error(e))
    }
}
