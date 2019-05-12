import React from 'react';

interface ListViewProps {
    links: JSX.Element[];
}

interface ListViewState {
    // This is an stateless component 
}

export class ListView extends React.Component<ListViewProps, ListViewState> {
    public render() {
        if (this.props.links.length < 1) {
            // Incase of no Items show a message in te console 
            return <div>There are no items to show!</div>;
        } else {
            /** return a list view with specific style. This list view is an array of 
             *  JSX items that will be map to a list <li> 
            */
            return <ul className="list-view">
                {this.props.links.map(function (links, itemIndex) {
                    return <li key={itemIndex}>{links}</li>;
                })}
            </ul>;
        }
    }
}
