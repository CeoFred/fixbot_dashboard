import Dashboard from "views/Dashboard.jsx";
import Logout from "views/Logout.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/auth/logout",
    name: "Logout",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-simple-remove",
    component: Logout,
    layout: "/admin"
  }
];
export default routes;
