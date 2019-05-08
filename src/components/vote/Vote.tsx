import React from "react";
import './style.css' 

interface VoteProps {
}

interface VoteState {
  vote: number;
}

export class Vote extends React.Component<VoteProps, VoteState> {
  public constructor(props: VoteProps) {
    super(props);
    this.state = {
      vote: 0
    };
  }
  upVote = () => {
      this.setState(prevState => {
          return {
              vote: prevState.vote + 1
          }
      })
  }
  downVote = () => {
    this.setState(prevState => {
        return {
            vote: prevState.vote - 1
        }
    })
}

  render() {
    return (
      <div className="vote">
        <button className="upButton" onClick={this.upVote}>⬆</button>
        <h4>{this.state.vote}</h4>
        <button className="downButton" onClick={this.downVote}>⬇</button>
      </div>
    );
  }
}
