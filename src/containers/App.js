import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication'; 

class App extends React.Component {

    constructor(props) { 
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Logout', 2000);

                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    componentDidMount() {
        let getCookie = name => {
            let value = `; ${document.cookie}`;
            let parts = value.split(`; ${name}=`);
            if (parts.length == 2) {
                return parts.pop().split(";").shift();
            }
        };

        // 1. get loginData
        let loginData = getCookie('key');


        // 2. Check Login Data
        if (typeof loginData === "undefined") return;

        // 3. decode base64 $ parse json
        loginData = atob(loginData);
        loginData = JSON.parse(loginData);

        // 4. Check IsLoggedIn
        if (!loginData.isLoggedIn) return;

        // 5. Check Session vaild
        this.props.getStatusRequest().then(() => {
            
            if (!this.props.status.valid) {

                loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                let $toastContent = $('<span style="color: #FFB4BA">Your Session is Expired. Please Re-Login</span>');
                Materialize.toast($toastContent, 2000);
            }
        })
    }

    render() {

    	let re = /(login|register)/;
    	let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
        		{ isAuth ? undefined : <Header isLogIn={this.props.status.isLoggedIn}
                                                onLogout={this.handleLogout}/> }
            	{ this.props.children }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);