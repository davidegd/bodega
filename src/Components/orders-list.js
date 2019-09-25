import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ProductList from './ProductList'
import { openProductList } from '../redux/actions/product';
import store from '../store';
import { copyOrders } from '../redux/actions/product';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));


class OrderList extends Component {
  //const classes = useStyles();
  //localStorage.setItem('test', 50);
  //let a = localStorage.getItem('test');

  constructor() {
    super();
  }

  componentDidUpdate() {
    let orders = store.getState().orders;
    console.log(store.getState());
    store.dispatch(copyOrders(orders, this.props.ordersCopy));
  };

  render() {
    return (
      <Table size="small">
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
          {this.props.ordersCopy.map(order => (
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
    );
      }
  }

  const mapStateToProps = state => ({
    orders: state.orders,
    order: state.reducer.order,
    open: state.reducer.openProductList,
    text: state.reducer.text,
    ordersCopy: state.reducer.ordersCopy
  })

  const mapDispatchToProps = (dispatch) => ({
    actionProductList: (order) => dispatch(openProductList(order))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(OrderList);