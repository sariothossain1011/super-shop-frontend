import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helper/SessionHelper";
import { useCart } from "../context/CartContext";
import { Badge } from "antd";
const MasterLayout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();

  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    removeToken();
    navigate("/login");
  };

  return (
    <Fragment>
      <div>
        <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand className=" text-white fs-4" href="/">
            SUPPER SHOP
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="text-white fs-6" />
          {/* <FaBars onClick={toggle} className="text-white fs-2" /> */}

          <Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto text-center " navbar>
              <NavItem>
                <NavLink className="fs-5 px-4" href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="fs-5 px-4" href="/">
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink className="fs-5 px-4" href="/cart">
                  Carts
                </NavLink> */}
                <Badge
                  count={cart?.length >= 1 ? cart.length : 0}
                  offset={[-5, 11]}
                  showZero={true}
                >
                  <NavLink className="fs-5 px-4" href="/cart">
                  Cart
                </NavLink>
                </Badge>
              </NavItem>
              {!auth?.token ? (
                <Fragment>
                  <NavItem>
                    <NavLink className="fs-5 px-4" href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="fs-5 px-4" href="/registration">
                      Registration
                    </NavLink>
                  </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem>
                    <NavLink className="fs-5 px-4" href="/order">
                      Order
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fs-5 px-4"
                      href="/login"
                      onClick={logout}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </Fragment>
  );
};

export default MasterLayout;
