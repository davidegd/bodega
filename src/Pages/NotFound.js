import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import FatalErrorImg from '../images/404.png'

const NotFound = (props) => {
       return(
        <div className={props.classes.textCenter}>
            <h1> Página no Encontrada</h1>
            <img alt="Error 404" src={FatalErrorImg} /><br />
            <Link to="/" ><h3>IR AL INICIO</h3></Link>
        </div>
    )
}
export default withStyles({
    textCenter:{
        textAlign:'center',
        margin: 0,
    }
})(NotFound)