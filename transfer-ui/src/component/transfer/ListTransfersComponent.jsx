import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListTransfersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transfers: [],
            message: null
        }
        this.cancelTransfer = this.cancelTransfer.bind(this);
        this.executeTransfer = this.executeTransfer.bind(this);
        this.createTransfer = this.createTransfer.bind(this);
        this.reloadTransferList = this.reloadTransferList.bind(this);
    }

    componentDidMount() {
        this.reloadTransferList();
    }

    reloadTransferList() {
        ApiService.fetchTransfers()
            .then((res) => {
                    this.setState({transfers: res.data.result})
            });
    }

    cancelTransfer(id) {
        ApiService.cancelTransfer(id)
           .then(res => {
               this.setState({message : 'Transfer cancelled successfully.'});
           })
    }

    executeTransfer(id) {
        ApiService.executeTransfer(id)
            .then(res => {
                this.setState({message : 'Transfer completed successfully.'});
            })
    }

    createTransfer() {
        window.localStorage.removeItem("id");
        this.props.history.push('/create-transfer');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Transfer Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.createTransfer()}> Add User</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Title</th>
                            <th>Timestamp</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.transfers.map(
                        transfer =>
                                    <tr key={transfer.id}>
                                        <td>{transfer.source}</td>
                                        <td>{transfer.destination}</td>
                                        <td>{transfer.amount}</td>
                                        <td>{transfer.currency}</td>
                                        <td>{transfer.title}</td>
                                        <td>{transfer.timestamp}</td>
                                        <td>{transfer.status}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.executeTransfer(transfer.id)} style={{marginLeft: '20px'}}> Complete</button>
                                            <button className="btn btn-success" onClick={() => this.cancelTransfer(transfer.id)}> Cancel</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListTransfersComponent;