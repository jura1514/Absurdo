import React from "react";
import { StyleSheet, WebView } from "react-native";
import { deactivateKeepAwake, activateKeepAwake } from "expo-keep-awake";

const styles = StyleSheet.create({});

class WebLink extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    href: ""
  };

  componentDidMount() {
    activateKeepAwake();
    this.didFocus();
    // this.didFocusListener = this.props.navigation.addListener("didFocus", () =>
    //   this.didFocus()
    // );
  }

  componentWillUnmount() {
    // this.didFocusListener.remove();
  }

  didFocus() {
    const linkHref = this.props.navigation.getParam("linkHref", null);
    this.setState({ href: linkHref });
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  render() {
    return <WebView source={{ uri: this.state.href }} />;
  }
}

export default WebLink;
