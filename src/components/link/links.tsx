import React from 'react';
import { ListView } from '../listview/ListView'
import './style.css'
import { Vote } from '../vote/Vote'
import { Link } from 'react-router-dom'
import { getAuthToken } from '../with_auth/with_auth'

interface LinkProps{

}

interface LinksItem {
  userId: number,
  id: number,
  title: string,
  url: string
}

interface LinksState{
  links: LinksItem[] | null;
}

export class Links extends React.Component<LinkProps, LinksState>{
  public constructor(props: LinkProps){
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
        {/*this._renderPrivate()*/}
        
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

  /*
  private _renderPrivate(){
    const token: string | undefined = (window as any).__token;
    if(typeof token === "string"){
      return <Link className="profileButton" to="/profile">My Profile</Link>
    }
  }
  */
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
  return json as LinksItem[];
}