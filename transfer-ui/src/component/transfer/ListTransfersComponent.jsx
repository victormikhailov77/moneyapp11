import React, {Component} from 'react'
import ApiService from "../../service/ApiService";
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import {TableRow} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles(theme => ({
    head: {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

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

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.id !== prevProps.id) {
    //         this.reloadTransferList();
    //     }
    // }

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
                            <StyledTableCell>Tx Id</StyledTableCell>
                            <StyledTableCell>Source</StyledTableCell>
                            <StyledTableCell>Destination</StyledTableCell>
                            <StyledTableCell align={"right"}>Amount</StyledTableCell>
                            <StyledTableCell>Currency</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Timestamp</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.transfers && this.state.transfers.map(
                                transfer =>
                                    <StyledTableRow key={transfer.id}>
                                        <StyledTableCell align="left" component="th" scope="row">
                                            {transfer.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{transfer.source}</StyledTableCell>
                                        <StyledTableCell align="left">{transfer.destination}</StyledTableCell>
                                        <StyledTableCell align="right">{transfer.amount}</StyledTableCell>
                                        <StyledTableCell>{transfer.currency}</StyledTableCell>
                                        <StyledTableCell align="left">{transfer.title}</StyledTableCell>
                                        <StyledTableCell align="left">{transfer.timestamp}</StyledTableCell>
                                        <StyledTableCell align="left">{transfer.status}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button size="small" disabled={transfer.status !== "PENDING"}
                                                    variant="contained" color="primary"
                                                    onClick={() => this.executeTransfer(transfer.id)}>Execute</Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button size="small" disabled={transfer.status !== "PENDING"}
                                                    variant="contained" color="secondary"
                                                    onClick={() => this.cancelTransfer(transfer.id)}>Cancel</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
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