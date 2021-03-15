import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";

// core components
import componentStyles from "assets/theme/components/auth-navbar.js";

const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "responsive-menu-id";
  const ListObject = (
    <Box
      display="flex"
      alignItems="center"
      width="auto"
      component={List}
      className={classes.flexDirectionColumn}
    >
    </Box>
  );
  return (
    <>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            marginTop=".75rem"
            component={Box}
            maxWidth="xl"
          >
            <Box
              alt="..."
              height="70px"
              component="img"
              className={classes.headerImg}
              src={require("assets/img/brand/Logo.png").default}
            />
            <Hidden mdUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleMenuOpen}
                aria-controls={menuId}
                aria-haspopup="true"
              >
                <Box
                  component={MenuIcon}
                  color={theme.palette.white.main}
                  width="2rem!important"
                  height="2rem!important"
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                classes={{ paper: classes.menuPaper }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingLeft="1.25rem"
                  paddingRight="1.25rem"
                  paddingBottom="1rem"
                  className={classes.outlineNone}
                >
                  <Box
                    alt="..."
                    height="36px"
                    component="img"
                    className={classes.headerImg}
                    src={require("assets/img/brand/Logo.png").default}
                  />
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleMenuClose}
                    aria-controls={menuId}
                    aria-haspopup="true"
                  >
                    <Box
                      component={Clear}
                      width="2rem!important"
                      height="2rem!important"
                    />
                  </IconButton>
                </Box>
                <Box
                  component={Divider}
                  marginBottom="1rem!important"
                  marginLeft="1.25rem!important"
                  marginRight="1.25rem!important"
                />
                {ListObject}
              </Menu>
            </Hidden>
            <Hidden smDown implementation="css">
              {ListObject}
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
