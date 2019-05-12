import React from 'react';
import { ListView } from '../listview/ListView'
import './style.css'
import { Vote } from '../vote/Vote'
import { Community } from '../community/Community'
import { Link } from 'react-router-dom'
import { withAuth } from '../with_auth/with_auth'

interface LinkInternalProps{
  token: string | null;
}

interface LinksInternalItem {
  userId: number,
  id: number,
  title: string,
  url: string
}

interface LinksInternalState{
  links: LinksInternalItem[] | null;
}

class LinksInternal extends React.Component<LinkInternalProps, LinksInternalState>{
  public constructor(props: LinkInternalProps){
    super(props);
    this.state = {
      links: null
    }
  }
  public componentDidMount() {
    (async () =>{
      const data = await getData();
      this.setState({links: data})
    })()
    
  }
  public render(){
    if(this.state.links === null){
      return <div>Loading...</div>
    }else{
      return <div>
        <ListView
       links={this.state.links.map((link) => {
          return <div className="links">
            <Vote/>
            <h2 className="title">{link.title}</h2>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
          </div>
      })}
      />
      </div>;
    }
  }
  
}

async function getData(){
  const response = await fetch(
    "/api/v1/links",
    {
      headers: {
        "x-auth-token": (window as any).__token
      }
    }
    );
  const json = await response.json();
  return json as LinksInternalItem[];
}
export const UserLinks = withAuth(props => (
  <LinksInternal token ={props.authToken}/>
))