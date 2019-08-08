import React from "react";
import {
  StyleSheet,
  WebView,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableHighlight
} from "react-native";
import { deactivateKeepAwake, activateKeepAwake } from "expo-keep-awake";
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
  webView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  bottomView: { 
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: '100%',
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
  }
});

class WebLink extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    href: ""
  };

  didFocus = payload => {
    const linkHref = this.props.navigation.getParam("linkHref", null);
    this.setState({ href: linkHref });
  };

  goBack() {
    this.props.navigation.goBack();
  }

  renderWebView() {
    const { href } = this.state;

    if (href) {
      return (
        <WebView
          style={styles.webView}
          scalesPageToFit={true}
          source={{ uri: href }}
          javaScriptEnabled={true}
        />
      );
    }

    return <Text style={styles.loading}>Loading...</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this.didFocus(payload)} />
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
