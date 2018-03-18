import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {

    	const loginBtn = (
			<li>
                <Link to="/login"><i className="material-icons">vpn_key</i></Link>
            </li>
    	);

    	const logoutBtn = (
    		<li>
                <a onClick={this.props.onLogout}><i className="material-icons">lock_open</i></a>
            </li>
    	);

        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><Link to="/search"><i className="material-icons">search</i></Link></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { !this.props.isLogIn ? loginBtn : logoutBtn}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.defaultProps = {
	isLogIn: false
};

export default Header;