import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { deactivateKeepAwake, activateKeepAwake } from "expo-keep-awake";
import uselessLinks from "../links";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    textShadowColor: "#999",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
    margin: "auto",
    color: "#333",
    fontWeight: "bold"
  },
  header1: {
    fontSize: 68
  },
  header2: {
    marginBottom: 7,
    fontSize: 30
  },
  header3: {
    fontSize: 78
  },
  header4: {
    fontSize: 72
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 30
  },
  pleaseButton: {
    backgroundColor: "rgb(255, 20, 147)"
  },
  pleaseTxt: {
    color: "#fff",
    fontSize: 45
  }
});

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  openUselessWebsite() {
    const link = uselessLinks[Math.floor(Math.random() * uselessLinks.length)];

    console.log(link);
    this.props.navigation.navigate("WebLinkRT", {
      linkHref: link
    });
  }

  componentDidMount() {
    activateKeepAwake();
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header1, styles.header]}>TAKE ME</Text>
        <Text style={[styles.header2, styles.header]}>TO ANOTHER</Text>
        <Text style={[styles.header3, styles.header]}>USELESS</Text>
        <Text style={[styles.header4, styles.header]}>WEBSITE</Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.pleaseButton]}
          onPress={() => this.openUselessWebsite()}
        >
          <Text style={styles.pleaseTxt}>PLEASE</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Home;
