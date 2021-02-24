import React from 'react';

const AuthHeader = (props) => {
    return (
            <button className={props.openPos ? "auth-header-button active" :"auth-header-button"} 
                type="button"
                onClick={props.toggleHandler}>
               <span style={{margin: "auto"}}> {props.title} </span> 
            </button>
    )
}

export default AuthHeader;