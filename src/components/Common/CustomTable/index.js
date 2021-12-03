import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './style.scss'
import { BiUpArrowAlt } from 'react-icons/bi';
import { BiDownArrowAlt } from 'react-icons/bi'
import { Pagination } from '@material-ui/lab';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const CustomTable = ({ children, columns = [], onSort, tableLength = 0, handlePagination, showPagination = false, loader = false, hideSortLable = true }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [showtext, seticonchange] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('glid');

    const [label, setLabel] = React.useState(false)
    const createSortHandler = (property) => (event) => {

        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        onSort(property)

    };
    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        handlePagination(newPage)
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    };










    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>



                <Table stickyHeader aria-label="sticky table table-container" >
                    {loader && <div className="table__center">
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </div>}


                    {tableLength === 0 && !loader && <div className="table__center font-weight-bold "> No Data </div>}

                    <TableHead onRequestSort={handleRequestSort}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                    className={column.label === ''?"p-0":"cursor-pointer"}

                                >
                                    {column.label}

                                    {column.required && <span className="field__required">*</span>}

                                    {hideSortLable && <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    ></TableSortLabel>}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>


                        {children}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {showPagination && <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={tableLength}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />} */}

            {showPagination && <Pagination count={tableLength} page={page} color="primary" onChange={handleChangePage} />}

        </Paper>
    );
}


export default CustomTable;