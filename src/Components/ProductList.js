import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EnhancedTable from './Products';
import { closeDialog, saveDialog } from '../redux/actions/product';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenDialog(props) {
  const classes = useStyles();

  const saveOrder = (order) =>{
    const arr = order.products;
    arr.map(p => (
      console.log( p)
    ))
  }

  return (
      <Dialog fullScreen open={props.open} onClose={() => props.actionCloseDialog()   } TransitionComponent={Transition} >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={() => props.actionCloseDialog()} edge="start" color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.order.user.name}
            </Typography>
            <Button color="inherit" variant="outlined" onClick={() => props.actionSaveDialog(props.order, props.ordersCopy)}>
              Alistar Orden
            </Button>
          </Toolbar>
        </AppBar>
        <EnhancedTable products={props.order.products} order={props.order} />
      </Dialog>
  );
}

const mapStateToProps = state => ({
  products: state.reducer.products,
  order: state.reducer.order,
  ordersCopy: state.reducer.ordersCopy,
})
  
  const mapDispatchToProps = (dispatch) => ({
    actionCloseDialog: () => dispatch(closeDialog()),
    actionSaveDialog: (order, ordersCopy) => dispatch(saveDialog(order, ordersCopy))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(FullScreenDialog);