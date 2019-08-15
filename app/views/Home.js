import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { deactivateKeepAwake, activateKeepAwake } from "expo-keep-awake";
import { FontAwesome } from "@expo/vector-icons";
import uselessLinks from "../links";
import { NavigationEvents } from "react-navigation";

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
  bottomRow: {
    flexDirection: "row"
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
  },
  rightArrow: {
    marginTop: 15,
    marginRight: 15
  },
  leftArrow: {
    marginTop: 15,
    marginLeft: 15
  }
});

const expiryDate = new Date(2019, 7, 20, 12, 0);

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  state = {
    copiedLinks: [...uselessLinks],
    expired: false
  };

  openUselessWebsite() {
    let { copiedLinks } = this.state;

    if (copiedLinks.length === 0) {
      copiedLinks = [...uselessLinks];
    }

    const link = copiedLinks[Math.floor(Math.random() * copiedLinks.length)];

    copiedLinks.splice(copiedLinks.findIndex(e => e === link), 1);
    this.setState({ copiedLinks });

    this.props.navigation.navigate("WebLinkRT", {
      linkHref: link
    });
  }

  async componentDidMount() {
    activateKeepAwake();
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  didFocus = () => {
    const currentDate = new Date();

    if (currentDate.getTime() > expiryDate.getTime()) {
      this.setState({ expired: true });
    } else {
      this.setState({ expired: false });
    }
  };

  render() {
    const { expired } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this.didFocus(payload)} />
        {expired === false ? (
          [
            <Text style={[styles.header1, styles.header]}>TAKE ME</Text>,
            <Text style={[styles.header2, styles.header]}>TO ANOTHER</Text>,
            <Text style={[styles.header3, styles.header]}>USELESS</Text>,
            <Text style={[styles.header4, styles.header]}>WEBSITE</Text>,
            <View style={styles.bottomRow}>
              <FontAwesome
                style={styles.rightArrow}
                size={52}
                name="long-arrow-right"
              />
              <TouchableHighlight
                style={[styles.buttonContainer, styles.pleaseButton]}
                onPress={() => this.openUselessWebsite()}
              >
                <Text style={styles.pleaseTxt}>PLEASE</Text>
              </TouchableHighlight>
              <FontAwesome
                style={styles.leftArrow}
                size={52}
                name="long-arrow-left"
              />
            </View>
          ]
        ) : (
          <Text style={[styles.header1, styles.header]}>APP HAS EXPIRED</Text>
        )}
      </View>
    );
  }
}

export default Home;
