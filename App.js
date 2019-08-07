import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "./app/views/Home";
import WebLink from "./app/views/WebLink";

const MyRoutes = createStackNavigator(
  {
    HomeRT: {
      screen: Home
    },
    WebLinkRT: {
      screen: WebLink
    }
  },
  {
    initialRouteName: "HomeRT"
  }
);

export default createAppContainer(MyRoutes);
