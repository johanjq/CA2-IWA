import * as React from 'react';
import './linksData'


interface ListViewProps {
  links: JSX.Element[];
}

interface ListViewState {

}

export class ListView extends React.Component<ListViewProps, ListViewState>{
  constructor(props: ListViewProps){
    super(props);
  }
  render(){
    if(this.props.links.length < 1){
      return <div>There are no Links!</div>
    }else{
      return <ul>
        {this.props.links.map((item) => {
          return <li>{item}</li>;
        })}
    </ul>;
    }
    
  }
}