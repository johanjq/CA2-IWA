import * as React from 'react';
import './linksData'
import './style.css'

const ListView = (props) => {
      return (
        <div className="links">
          <h2>{props.links.title}</h2>
          <a href={props.links.url}>{props.links.url}</a>
        </div>     
      );
  
}
export default ListView