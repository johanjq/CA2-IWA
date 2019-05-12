import React from "react";
import { withRouter } from "react-router-dom";
import { setAuthToken, getAuthToken } from "../with_auth/with_auth";
import * as H from 'history';

interface LinkCreationInternalProps {
  id: number | null;
}

interface LinkCreationInternalState {
    title: string;
    url: string;
    jwt: string | null;
    error: string | null;
}

class LinkCreationInternal extends React.Component<LinkCreationInternalProps,LinkCreationInternalState> {
    public constructor(props: LinkCreationInternalProps){
        super(props);
        this.state = {
            title: "",
            url: "",
            jwt: "",
            error: null
        };
    }

    public componentWillMount(){
      const token = getAuthToken();
      this.setState({jwt: token})
    }


  public componentDidMount() {
    if (this.props.id) {
      //if we have an id we need to fetch the link with that id
      //because in the editor we want to show whats the current title and url
      //so we can update it:
      //fetch call with http get using the id
      //after fetch call use setState to set the value i have fetched
    }
  }
  public render() {
    if(this.state.jwt === null){
      return <div>Loading</div>;
    }
    if (this.props.id) {
      return <div>ID:{this.props.id}</div>;
    } else {
      return (
        <div>
          Title:
          <input type="text" onKeyUp={(e) => this._updateTitle((e as any).target.value)}/>
          Url:
          <input type="text" onKeyUp={(e) => this._updateURL((e as any).target.value)}/>
          <button onClick={() => this._createOrUpdateLink()}>Submit</button>
        </div>
      );
    }
  }
  private _updateTitle(title: string) {
    this.setState({ title: title });
}
// Update the state (password) on keyup
private _updateURL(url: string) {
    this.setState({ url: url });
}
  private _createOrUpdateLink() {
    (async () => {
      try {
        //call server
        const create = await createLink(this.state.title, this.state.url, this.state.jwt)
        //reset error
        this.setState({error : null})
        //save token in window object
        setAuthToken(create)
      } catch (err) {
          this.setState({error: err.error})
      }
    })();
  }
}
async function createLink(title: string, url: string, jwt: string | null) {
  if(jwt === null){
    throw new Error("JWT must be informed");
  }
    const data = {
        title: title,
        url: url
    };
    const response = await fetch(
        "/api/v1/links",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

export const LinkCreation = withRouter(props => (
  <LinkCreationInternal id={props.match.params.id} />
));
