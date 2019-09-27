import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class CreateTransferComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            source: '',
            destination: '',
            amount: '',
            currency: '',
            title: ''
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {source: this.state.source, destination: this.state.destination, amount: this.state.amount, currency: this.state.currency, title: this.state.title };
        ApiService.createTransfer(user)
            .then(res => {
                this.setState({messtitle : 'Transfer created successfully.'});
                this.props.history.push('/transfers');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Create money transfer</h2>
                <form>
                <div className="form-group">
                    <label>Source account:</label>
                    <input type="text" placeholder="source" name="source" className="form-control" value={this.state.source} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Destination account:</label>
                    <input type="text" placeholder="destination" name="destination" className="form-control" value={this.state.destination} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Amount:</label>
                    <input type="number" placeholder="Amount" name="amount" className="form-control" value={this.state.amount} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Currency:</label>
                    <input type="text" placeholder="Currency" name="currency" className="form-control" value={this.state.currency} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" placeholder="Title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveUser}>Save</button>
            </form>
    </div>
        );
    }
}

export default CreateTransferComponent;