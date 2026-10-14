import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, AppState } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NativeButton from "./components/NativeButton"

type Weather = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  unit: string;
};

type PlatformFeatures = {
  displayName: string;
  defaultUnit: string;
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [favorites, setFavorites] = useState(["New York", "London", "Tokyo"]);
  const [appState, setAppState] = useState(AppState.currentState);


  useEffect(() => {
    const subscription = AppState.addEventListener("change", setAppState);
    return () => subscription?.remove();
  }, []);

  const searchWeather = (targetCity?: string) => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const platformFeatures = getPlatformFeatures();

    const cityToUse = targetCity ?? (city || "Current Location");

    setWeather({
      city: cityToUse,
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 40) + 30,
      unit: platformFeatures.defaultUnit === "Fahrenheit" ? "F" : "C",
    });
  };

  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      setFavorites([...favorites, city]);
      setCity("");
    }
  };

  const getPlatformTitle = () => {
    return Platform.select({
      ios: "Weather for iOS",
      android: "Weather for Android",
      default: "Weather on the Web",
    });
  };

  const getPlatformPlaceholder = () => {
    return Platform.select({
      ios: "Search for a city",
      android: "Enter city name",
      default: "Type a city to search",
    });
  };

  const getPlatformSectionTitle = () => {
    return Platform.select({
      ios: "Favorite Cities",
      android: "Saved Cities",
      default: "My Cities",
    });
  };

  const getPlatformFeatures = (): PlatformFeatures => {
    return Platform.select({
      ios: {
        displayName: "Apple Weather",
        defaultUnit: "Fahrenheit",
      },
      android: {
        displayName: "Material Weather",
        defaultUnit: "Celsius",
      },
      default: {
        displayName: "Web Weather",
        defaultUnit: "Celsius",
      },
    });
  };

  const platformFeatures = getPlatformFeatures();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{getPlatformTitle()}</Text>

            <Text style={styles.platformInfo}>
              Platform: {Platform.OS} {Platform.Version} - {appState}
            </Text>

            {/* Platform-specific features display */}
            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>
                {platformFeatures.displayName}
              </Text>
            </View>

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder={getPlatformPlaceholder()}
                value={city}
                onChangeText={setCity}
                returnKeyType={Platform.select({
                  ios: "search",
                  default: "done",
                })}
                onSubmitEditing={() => searchWeather()}
              />
              <NativeButton
                title="Get Weather"
                onPress={() => searchWeather()}
              />
            </View>

            {weather ? (
              <View style={styles.weatherCard}>
                <Text style={styles.cityName}>{weather.city}</Text>
                <Text style={styles.temperature}>
                  {weather.temperature}
                  {weather.unit}
                </Text>
                <Text style={styles.condition}>{weather.condition}</Text>
                <Text style={styles.humidity}>
                  Humidity: {weather.humidity}%
                </Text>

                <NativeButton
                  title="Add to Favorites"
                  onPress={addToFavorites}
                  style={styles.favoriteButton}
                />
              </View>
            ) : null}

            <View style={styles.favoritesSection}>
              <Text style={styles.sectionTitle}>
                {getPlatformSectionTitle()}
              </Text>
              {favorites.map((favoriteCity, index) => (
                <NativeButton
                  key={index}
                  title={favoriteCity}
                  onPress={() => {
                    setCity(favoriteCity);
                    searchWeather(favoriteCity); // <--- Pass the city directly!
                  }}
                  style={styles.favoriteItem}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: "#F2F2F7",
      android: "#E8EAF6",
      default: "#F5F5F5",
    }),
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#333",
  },
  platformInfo: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  featuresSection: {
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featuresSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 13,
    color: "#555",
    marginBottom: 3,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",

    fontSize: 16,
    marginBottom: 15,
    borderColor: "#ddd",
  },
  weatherCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,

    alignItems: "center",
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 5,
  },
  condition: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  humidity: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: "#FF6B6B",
  },
  favoritesSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  favoriteItem: {
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
  },
});
