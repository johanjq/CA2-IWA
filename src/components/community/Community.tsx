import React from 'react';
import './style.css'
import { NavLink } from 'react-router-dom'

export class Community extends React.Component{
    render(){
        return(
            <div className="community">
                <h4 className="editor">r/cct</h4>
                <h4 className="totalUsers">Users:</h4>
                <NavLink to="/link_editor">
                    <button className="createPost">create post</button>
                </NavLink>
                
            </div>
        )
    }
    
}
async function getAllUsers(id: number, jwt: string) {
    const response = await fetch(
        '/api/v1/users/',
        {
            method: "GET",
            headers: {
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}