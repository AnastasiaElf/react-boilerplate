import React, { Component } from 'react';
import {
    Route,
    NavLink as RRDLink,
    Switch,
    Link
} from "react-router-dom";
import {
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import './App.scss';
import _ from 'lodash';
import LanguageSelector from './common/languageSelector/LanguageSelector.container';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location) => {
            this.setState({ isOpen: false });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <div className="App">
                <Navbar className="app-navbar" expand="md" dark>
                    <NavbarBrand className="app-navbar-brand" tag={Link} to="/home">LOGO</NavbarBrand>
                    <Nav className="ml-auto language-select-left">
                        <LanguageSelector />
                    </Nav>
                    <NavbarToggler onClick={this.toggle} />
                    {this.renderNavs()}
                </Navbar>
                <Switch key="router-switch">
                    <Route exact path="/home" render={this.renderView('home')} />
                    <Route exact path="/account" render={this.renderView('account')} />
                    <Route path="/" render={this.renderView()} />
                </Switch>
            </div>
        );
    }

    renderNavs = () => {
        return (
            <Collapse className="collapse-navbar" isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {this.getNavItems()}
                </Nav>
                <Nav className="ml-auto language-select-right">
                    <LanguageSelector />
                </Nav>
            </Collapse>
        );
    };

    getNavItems = () => {
        return [
            <NavItem key='home'>
                <NavLink tag={RRDLink} to="/home">
                    {_.get(this.props.translation, "main.home_page_label")}
                </NavLink>
            </NavItem>,
            <NavItem key='account'>
                <NavLink tag={RRDLink} to="/account">
                    {_.get(this.props.translation, "main.account_label")}
                </NavLink>
            </NavItem>
        ]
    };

    renderView = view => () => {
        switch (view) {
            case "home":
                return <div className="content-container">
                    {_.get(this.props.translation, "main.home_page_label")}
                </div>;
            case "account":
                return <div className="content-container">
                    {_.get(this.props.translation, "main.account_label")}
                </div>;
            default:
                return <div className="content-container">
                    {_.get(this.props.translation, "main.page_not_found_label")}
                </div>;
        }
    };
}

App.propTypes = {
    translation: PropTypes.object.isRequired
};

export default App;
