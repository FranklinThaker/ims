import React from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
const Auth = new AuthService();
class UserNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.Auth = new AuthService();
        this.state = {
            display: false,
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/');
    }

    render() {

        return (
            <>
                <div class="navbarForHome">
                    <label class="floatLeft" for="navBtn" style={{ marginBottom: "0px" }}><span></span></label>

                    <Link class="active" to="/user/home"><i class="fa fa-fw fa-home"></i> Home</Link>
                    <Link to="#"><i class="fa fa-fw fa-envelope"></i> Contact</Link>
                    <Link to="#" onClick={this.handleLogout.bind(this)}><i class="fa fa-fw fa-user"></i> Login</Link>
                    <div class="dropdown">
                        <button class="dropbtn" onClick={() => this.setState({ display: !this.state.display })} >Dropdown
                     <i class="fa fa-caret-down"></i>
                        </button>
                        <div className={this.state.display ? 'dropdown-content' : 'hide'}>
                            <Button className="btn-danger" color='danger' onClick={this.handleLogout.bind(this)} >Logout</Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default UserNavbar;