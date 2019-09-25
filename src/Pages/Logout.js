import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
    constructor(props){
        super(props)
        
        localStorage.removeItem("token");        
        localStorage.setItem("loggedAsAdmin", false);
        localStorage.setItem("loggedAsUser", false);
    }
    
    render() {
        localStorage.removeItem("token");        
        localStorage.setItem("loggedAsAdmin", false);
        localStorage.setItem("loggedAsUser", false);
        return (<Redirect to="/" />)
    }
}
