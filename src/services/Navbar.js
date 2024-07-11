import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
// import { Navbar} from "reactstrap";

const Nav = () => {
  return (
    <div>
      <>
        <Navbar className="my-2" color="dark" dark>
          <NavbarBrand href="/">
            <img
              alt="logo"
              src="../images/svg"
              style={{
                height: 40,
                width: 40,
              }}
            />
          </NavbarBrand>
        </Navbar>
        <Navbar className="my-2" color="secondary" dark>
          <NavbarBrand href="/">Reactstrap</NavbarBrand>
        </Navbar>
        <Navbar className="my-2" color="dark" dark>
          <NavbarBrand href="/">
            <img
              alt="logo"
              src="/logo-white.svg"
              style={{
                height: 40,
                width: 40,
              }}
            />
            Reactstrap
          </NavbarBrand>
        </Navbar>
      </>
    </div>
  );
};

export default Nav;
