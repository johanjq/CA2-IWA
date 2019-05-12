import React from "react";
import { ListView } from "../listview/ListView";
import "./style.css";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";
import { LinkDetails, LinkPreviewDetails } from '../LinkDetails'
import { Community } from '../community/Community'

interface LinksProps {
    
}

interface LinksState {
    links: LinkPreviewDetails[] | null; // an array of links to be retrieved
    query: string; // the query for the search box
}

export class Links extends React.Component<LinksProps, LinksState> {
    // we will use the constructor to set the initial state for links and query 
    public constructor(props: LinksProps) {
        super(props);
        this.state = {
            links: null, // initial value is null
            query: "" // query is initially empty  
        };
    }

    public componentWillMount() {
        (async () => {
            const data = await getData();
            this.setState({ links: data });
        })();
    }

    public render() {
        // While we are cathcing the data we do this 
        // that happens after componentWillMount
        if (this.state.links === null) {
            return <div>Loading...</div>;
        } else {
            // apply the filter 
            const filteredLinks = this.state.links.filter((link) => {
                return link.title.indexOf(this.state.query) !== -1;
            });

            return <div>
                {/*FILTER*/}
                <input
                    className="search"
                    placeholder="Search"
                    type="text"
                    onKeyUp={(e) => this._onSearch(e.currentTarget.value)}
                />
                {/*LIST VIEW OF CONTENTS*/}
                {this._renderPrivate()}
                <ListView
                    links={
                        filteredLinks.map((link, linkIndex) => {
                            return (
                                <Link to={`/link_details/${link.id}`}>
                                    <LinkDetails key={linkIndex} {...link} />
                                </Link>
                            );
                        })
                    }
                />
            </div>;
        }
    }
    
    private _onSearch(query: string) {
        this.setState({ query: query });
    }
    private _renderPrivate() {
      const token: string | undefined = (window as any).__token;
      if (typeof token === "string") {
        return <Community />;
      }
    }
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinkPreviewDetails[];
}