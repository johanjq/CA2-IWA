import * as React from 'react';
import ListView from '../components/listview/ListView'
import links from '../components/listview/linksData'

export class Links extends React.Component {


  public render() {
    const listComponents = links.map((item: any) => <ListView links={item}/>)
      return (
        <div>
          {listComponents}
        </div>
      );
  }
}