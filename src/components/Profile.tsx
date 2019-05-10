import React from 'react';

interface User {
    email: string;
    id: number;
    pic: any;
}

interface ProfileProps {}

interface ProfileState {
    user: null | User,

}

export class Profile extends React.Component<ProfileProps, ProfileState>{
    public constructor(props: ProfileProps){
        super(props)
        this.state = {
            user: null
        }
    }
    public componentWillMount() {
        (async () => {
            const token: string | undefined = (window as any).__token;
            if(token){
            const user = await getUser(token);
            this.setState({ user: user })
        }
        })();
    }

    public render(){
        if(this.state.user === null){
            return <div>Loading...</div>
        }
        else{
            return <div>
            {this.state.user.email.substring(0, this.state.user.email.indexOf('@'))}
            {this.state.user.id}
            <img src={this.state.user.pic} alt=""/>
            </div>
        }
    }
}

async function getUser(token: string) {
    const response = await fetch(
        "/api/v1/auth/profile",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        }
    );
    const json = await response.json();
    return json;
}



