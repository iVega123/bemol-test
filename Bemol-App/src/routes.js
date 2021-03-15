// core components
import Register from "views/Register.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";

var routes = [
  {
    path: "/register",
    name: "Register",
    icon: AccountCircle,
    iconColor: "ErrorLight",
    component: Register,
    layout: "/auth",
  },
  {
    divider: true,
  },
];
export default routes;
