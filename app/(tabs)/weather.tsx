import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

interface WeatherData {
  name: string;
  main?: {
    temp: number;
  };
}

interface City {
  name: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { name: "New Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Moscow", lat: 55.7558, lon: 37.6173 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Dubai", lat: 25.2048, lon: 55.2708 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Berlin", lat: 52.5200, lon: 13.4050 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Athens", lat: 37.9838, lon: 23.7275 },
    { name: "Vienna", lat: 48.2082, lon: 16.3738 },
    { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
    { name: "Helsinki", lat: 60.1699, lon: 24.9384 },
    { name: "Oslo", lat: 59.9139, lon: 10.7522 },
    { name: "Copenhagen", lat: 55.6761, lon: 12.5683 },
    { name: "Rangoon", lat: 16.8661, lon: 96.1951 },
];

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = 'a40a172756cdba3448ee4d35f2f177a0';
      const promises = cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);
      setWeatherData(results);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching weather data: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {weatherData.map((data, index) => (
        <View key={index} style={styles.weatherContainer}>
          <Text style={styles.cityName}>City: {data.name}</Text>
          <Text>Temperature: {data.main?.temp}°C</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Weather;
