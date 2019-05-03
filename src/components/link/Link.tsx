import React from 'react';
import { ListView } from '../listview/ListView'
import './style.css'

interface LinkProps{

}

interface Links {
  userId: number,
  id: number,
  title: string,
  body: string
}

interface LinkState{
  links: Links[] | null;
}

export class Link extends React.Component<LinkProps, LinkState>{
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
      return <ListView
       links={this.state.links.map((link) => {
          return <div className="links">
            <h4>Title:{link.title}</h4>
            <h4>Link: {link.body}</h4>
          </div>
      })}
      />
    }
  }
}

async function getData(){
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const json = await response.json();
  return json as Links[];
}