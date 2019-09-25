import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment'; 


export const mainListItems = (
  <div>

    {localStorage.getItem("loggedAsUser") ? 
    ((<Link to="Logout" button style={{ textDecoration: 'none', color: 'inherit'}}> 
      <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Bodega" />
    </ListItem>
    </Link>)) : ''}

    <Link to="Logout" button style={{ textDecoration: 'none', color: 'inherit'}}><ListItem >
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
    </ListItem></Link>
  </div>
);

export const secondaryListItems = (
  <div>
  
    <Link to="dashboard" button style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>

    <Link to="bodega" button style={{ textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Bodega" />
    </ListItem>
    </Link>  

    <Link to="Logout" button style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItem >
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
     </ListItem>
    </Link>
  </div>
);