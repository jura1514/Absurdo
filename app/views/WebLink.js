import React from "react";
import {
  StyleSheet,
  WebView,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
  TextInput
} from "react-native";
import {
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  loading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  webViewContainer: {
    flex: 1,
    overflow: "hidden"
  },
  webView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%"
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  bottomBtn: {
    backgroundColor: "rgb(255, 20, 147)",
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
    marginLeft: 20
  },
  backTxt: {
    color: "#fff",
    fontSize: 35
  },
  browserAddressBar: {
    height: 35,
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
    flex: 1,
    borderWidth: 0,
    paddingLeft: 15
  },
  browserBar: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    margin: 10
  },
  disabled: {
    opacity: 0.3
  }
});

class WebLink extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    href: ""
  };

  didFocus = () => {
    const linkHref = this.props.navigation.getParam("linkHref", null);
    this.setState({ href: linkHref });
  };

  goBack() {
    this.props.navigation.goBack();
  }

  renderWebViewAddressBar() {
    const { href } = this.state;

    if (href) {
      return (
        <View style={styles.browserBar}>
          <Foundation style={styles.icon} size={30} name="web" />

          <MaterialIcons
            style={[styles.icon, styles.disabled]}
            size={30}
            name="arrow-back"
          />
          <MaterialIcons
            style={[styles.icon, styles.disabled]}
            size={30}
            name="arrow-forward"
          />
          <MaterialIcons style={styles.icon} name="refresh" size={30} />

          <TextInput
            style={styles.browserAddressBar}
            value={href}
            editable={false}
          />
          <MaterialCommunityIcons
            style={styles.icon}
            name="dots-vertical"
            size={30}
          />
        </View>
      );
    }
  }

  renderWebView() {
    const { href } = this.state;

    if (href) {
      return (
        <View style={styles.webViewContainer}>
          <WebView
            style={styles.webView}
            scalesPageToFit={true}
            source={{ uri: href }}
            javaScriptEnabled={true}
            renderLoading={() => (
              <ActivityIndicator size="large" color="#333" />
            )}
          />
        </View>
      );
    } else {
      return <ActivityIndicator size="large" color="#333" />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this.didFocus(payload)} />
        {this.renderWebViewAddressBar()}
        {this.renderWebView()}
        <View style={styles.bottomView}>
          <TouchableHighlight
            style={styles.bottomBtn}
            onPress={() => this.goBack()}
          >
            <Text style={styles.backTxt}>BACK</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default WebLink;
