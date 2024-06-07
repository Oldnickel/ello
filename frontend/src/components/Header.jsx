import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";

const Logo = styled("img")({
  height: "50px",
});

function Header() {
  return (
    <AppBar
      sx={{ px: "10px", py: "10px" }}
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo
          src="https://books.ello.com/static/media/logoEllo.2b20bb072a0c339867f3cb02fe3515b6.svg"
          alt="Logo"
        />
        <Button color="primary" sx={{ fontWeight: "bold" }}>
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
