import React from 'react';

// Interface linkdetails that contains all the golbal variables used to render the component 

export interface LinkPreviewDetails {
    id: number; // ID of the link 
    userId: number; // User whose link belong to 
    email: string; // user email
    title: string; // link title 
    url: string; // url that redirect to the link site 
    dateTime: string, 
    commentCount: number | null; // number of comments for the link 
    voteCount: number | null; // number of votes for the link 
}

interface LinkDetailsProps extends LinkPreviewDetails {
    // ...
}

interface LinkDetailsState {
    //
}

// Render the class 
export class LinkDetails extends React.Component<LinkDetailsProps, LinkDetailsState> {
    public render() {
        return (
            <table className="link-details">
                <tbody>
                    <tr>
                        { /*define the right left container of the view*/} 
                        <td className="left">
                            <div className="vote-btn">↑</div>
                            <div>{this.props.voteCount ? this.props.voteCount : 0}</div>
                            <div className="vote-btn">↓</div>
                        </td>

                        {/* Right container of the view */}
                        <td className="right">
                            <div className="audit">{this._renderTimeSinceDate(this.props.dateTime)} ago by {this.props.email}</div>
                            <h2 className="title">{this.props.title}</h2>
                            <div className="url">{this.props.url}</div>
                            <div className="comment-count">{this.props.commentCount} Comments</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    // This method will calculate the difference in date between the posted 
    // date till now and use the info to display in the link component

    // Method Provided by Remos Jansen in CCT lectures
    // It takes as parameter JSON date of type string that look like "2019-05-01 01:00:18.579 " 
    private _renderTimeSinceDate(jsonDate: string) {
        const time = Date.parse(jsonDate); // parse the dateto time stamp 
        const now = new Date().getTime(); // get the current time 
        const difference = (now - time) / 1000; // get the difference betwwen times
        const seconds = Math.ceil(difference); // get the seccond that the difference represents
        const minutes = Math.ceil(seconds / 60); // minutes 
        const hours = Math.ceil(minutes / 60); // hours 
        const days = Math.ceil(hours / 24); // days 
        
        // finally we return the corresponding value 
        if (seconds < 60) {
            return `${seconds} seconds`;
        } else if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (hours < 24) {
            return `${hours} hours`;
        } else {
            return `${days} days`;
        }
    }
}
