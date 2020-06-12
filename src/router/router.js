import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import ProductList from "../components/product/ProductList";
import Login from "../components/login/Login";

export default function ApplicationRouter() {
    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Product Category App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Login</Nav.Link>
                            <Nav.Link href="/products">Products</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/products" component={ProductList} />
                </Switch>
            </div>
        </Router>
    );
}