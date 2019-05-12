import React from 'react';
import './style.css'
import { NavLink } from 'react-router-dom'


interface CommunityProps{

}

interface CommunityState{
    count: string | null; 
}

export class Community extends React.Component<CommunityProps, CommunityState>{
    public constructor(props: CommunityProps){
        super(props);
        this.state = {
            count: null
        }
    }
    public componentWillMount(){
        (async () => {
            const token: string | undefined = (window as any).__token;
            if(token){
                const count = await getUserCount();
                this.setState({count: count.count})
            }
            
        })();
    }
    render(){
        return(
            <div className="community">
                <h4 className="editor">r/cct</h4>
                <h4 className="totalUsers">Users:{this.state.count}</h4>
                <NavLink to="/link_editor">
                    <button className="createPost">create post</button>
                </NavLink>
                
            </div>
        )
    }
    
}
async function getUserCount() {
    const response = await fetch(
        '/api/v1/users/count',
    );
    const json = await response.json();
    return json;
}