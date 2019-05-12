import * as React from "react";
import * as joi from "joi";
import { withRouter } from "react-router-dom";
import * as H from 'history';
import { setAuthToken } from "../with_auth/with_auth" 
import "./style.css";
 
const credentialSchema = {
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).required()
};

interface SignUpProps {
    history: H.History;
}

interface SignUpState {
    email: string;
    password: string;
    error: string | null;
}

export class SignUpInternal extends React.Component<SignUpProps, SignUpState> {
    public constructor(props: SignUpProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        };
    }
    public render() {
        return (
            <div className="signin">
                <h3>Sign Up</h3>
                <input
                    type="text"
                    placeholder="Email"
                    onKeyUp={(e) => this._updateEmail((e as any).target.value)}
                />
                <input className="password"
                    type="password"
                    placeholder="Password"
                    onKeyUp={(e) => this._updatePassword((e as any).target.value)}
                />
                {this._renderServerErrors()}
                {this._renderValidationErrors()}
                <button onClick={() => this._handleSubmit()}>Sign Up</button>
            </div>
        );
    }
    private _renderServerErrors() {
        if (this.state.error === null) {
            return <div></div>;
        } else {
            return <div>{this.state.error}</div>;
        }
    }
    // Display errors or OK on screen
    private _renderValidationErrors() {
        const validationResult = joi.validate({
            email: this.state.email,
            password: this.state.password
        }, credentialSchema);
        if (validationResult.error) {
            return <div>
                {validationResult.error.details.map(d => <div className="wrongMessage">{d.message}</div>)}
            </div>;
        } else {
            return <div className="okMessage">OK!</div>;
        }
    }
    // Update the state (email) on keyup
    private _updateEmail(email: string) {
        this.setState({ email: email });
    }
    // Update the state (password) on keyup
    private _updatePassword(password: string) {
        this.setState({ password: password });
    }
    // Send HTTP request on click
    private _handleSubmit() {
        (async () => {
            try {
                const signup = await createUser(this.state.email, this.state.password);
                // Reset error
                this.setState({ error: null });
                // Save token in window object
                //(window as any).__token = token;
                setAuthToken(signup);
                // Redirect to home page
                this.props.history.push("/sign_in");
            } catch(err) {
                this.setState({ error: err.error });
            }
        })();
    }
}

// withRouter pass some props that contain the history to the
// <LoginInternal> component and returns a new component named
// <Login>
export const SignUp = withRouter(props => <SignUpInternal {...props}/>);


async function createUser(email: string, password: string) {
    const data = {
        email: email,
        password: password
    };
    const response = await fetch(
        "/api/v1/users", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}
