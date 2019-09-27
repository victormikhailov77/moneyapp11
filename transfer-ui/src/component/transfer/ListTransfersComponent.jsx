import React, {Component} from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

    componentDidUpdate() {
        this.reloadTransferList();
    }

    reloadTransferList() {
        ApiService.fetchTransfers()
            .then((res) => {
                this.setState({transfers: res.data});
            });
    }

    cancelTransfer(id) {
        ApiService.cancelTransfer(id)
            .then(res => {
                this.setState({message: 'Transfer cancelled successfully.'});
            })
    }

    executeTransfer(id) {
        ApiService.executeTransfer(id)
            .then(res => {
                this.setState({message: 'Transfer completed successfully.'});
            })
    }

    createTransfer() {
        window.localStorage.removeItem("id");
        this.props.history.push('/create-transfer');
    }

    render() {
        return (
            <div>
                <Typography variant="h5" style={style}>Transfers history</Typography>
                <Button variant="contained" color="primary" onClick={() => this.createTransfer()}> New transfer</Button>
                <Table size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Tx Id</TableCell>
                            <TableCell align="left">Source</TableCell>
                            <TableCell align="left">Destination</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="left">Currency</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Timestamp</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.transfers && this.state.transfers.map(
                                transfer =>
                                    <TableRow key={transfer.id}>
                                        <TableCell align="left" component="th" scope="row">
                                            {transfer.id}
                                        </TableCell>
                                        <TableCell align="left">{transfer.source}</TableCell>
                                        <TableCell align="left">{transfer.destination}</TableCell>
                                        <TableCell align="right">{transfer.amount}</TableCell>
                                        <TableCell>{transfer.currency}</TableCell>
                                        <TableCell align="left">{transfer.title}</TableCell>
                                        <TableCell align="left">{transfer.timestamp}</TableCell>
                                        <TableCell align="left">{transfer.status}</TableCell>
                                        <TableCell align="right">
                                            <Button size="small" disabled={transfer.status !== "PENDING"} variant="contained" color="primary"
                                                    onClick={() => this.executeTransfer(transfer.id)}>Execute</Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button size="small" disabled={transfer.status !== "PENDING"} variant="contained" color="secondary"
                                                    onClick={() => this.cancelTransfer(transfer.id)}>Cancel</Button>
                                        </TableCell>
                                    </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default ListTransfersComponent;