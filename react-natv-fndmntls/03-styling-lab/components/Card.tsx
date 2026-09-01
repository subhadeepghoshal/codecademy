import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Avatar from "./Avatar";

type CardProps = {
  avatar: string;
  name: string;
};

const Card = (props: CardProps) => (
  <View style={styles.card}>
    <View style={styles.avatarRing}>
      <Avatar url={props.avatar} />
    </View>
    <Text style={styles.username}>{props.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 64,
    height: 100,
    marginHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#C2410C",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
    color: "#44403C",
    textAlign: "center",
  },
});

export default Card;
