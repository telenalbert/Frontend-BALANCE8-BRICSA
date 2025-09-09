import React from "react";
import { Input, Button } from "antd";
import './AuthLogin.css'

const AuthLogin = ()=> {
    return (
        <div className="PageWrapper">
        <div className="LoginContainer">
            <div className="LoginInputs">
                <Input
                placeholder="Usuario AD"
                className="Input"
                ></Input>
                <Input
                placeholder="Contraseña"
                className="Input"
                ></Input>
                <Button
                className="Button"> Ingresar </Button>
            </div>
        </div>
        </div>
        
    )
}; 
export default AuthLogin