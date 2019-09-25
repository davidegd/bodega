import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';

import ProductList from './ProductList'
import { openProductList } from '../redux/actions/product';
import store from '../store';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}



const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

 function OrdersTable({ordersCopy, open, orders, order}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, 100 - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Ruta</TableCell>
            <TableCell>Slot</TableCell>
            <TableCell>% Alistado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {ordersCopy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
                <TableRow key={order._id}>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.region_code}</TableCell>
              <TableCell>{order.routeId}</TableCell>
              <TableCell>{order.slot}</TableCell>
              <TableCell>{((order.count / order.products.length) * 100).toFixed(0)}%</TableCell>
              <TableCell>
                <Button variant="outlined" 
                        color="secondary" 
                        onClick={() => this.props.actionProductList(order)}>ver
                       
                </Button>
              </TableCell>
            </TableRow>
            ))}
            

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {open ?
          <ProductList
            open={open}
          /> : ''
        }
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={ordersCopy.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}

const mapStateToProps = state => ({
    orders: state.orders,
    order: state.reducer.order,
    open: state.reducer.openProductList,
    ordersCopy: state.reducer.ordersCopy
  })

  const mapDispatchToProps = (dispatch) => ({
    actionProductList: (order) => dispatch(openProductList(order))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);

 {/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Ruta</TableCell>
            <TableCell>Slot</TableCell>
            <TableCell>% Alistado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.ordersCopy.map(order => 
          (
            <TableRow key={order._id}>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.region_code}</TableCell>
              <TableCell>{order.routeId}</TableCell>
              <TableCell>{order.slot}</TableCell>
              <TableCell>{((order.count / order.products.length) * 100).toFixed(0)}%</TableCell>
              <TableCell>
                <Button variant="outlined" 
                        color="secondary" 
                        onClick={() => this.props.actionProductList(order)}>
                        <AssignmentIcon />
                </Button>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
        {this.props.open ?
          <ProductList
            open={this.props.open}
          /> : ''
        }
      </Table>
     */}