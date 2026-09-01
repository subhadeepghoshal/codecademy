import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Card from "./components/Card";
import Post from "./components/Post";
import data from "./data/data";
import type { User, Post as PostType, Featured } from "./data/data";

const HomeScreen = () => (
  <ScrollView>
    <Text style={styles.sectionTitle}>Stories</Text>
    <ScrollView horizontal>
      {(data.users as User[]).map((user) => (
        <Card key={user.id} avatar={user.avatar} name={user.name} />
      ))}
    </ScrollView>
    <Text style={[styles.heading, styles.featuredHeading]}>Featured</Text>
    {(data.featured as Featured[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}

    <Text style={styles.heading}>My Feed</Text>
    {(data.posts as PostType[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}
  </ScrollView>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1E8",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  featuredHeading: {
    fontSize: 24,
    color: "#C2410C",
  },
})

export default App;
