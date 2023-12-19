import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Linking } from 'react-native';

interface NewsArticle {
    title: string;
    author: string;
    publishedAt: string;
    url: string;
    source: {
      name: string;
    };
  }
  
const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const API_KEY = 'fffd798fef00421fb60079dcaa28ce62';
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
      const data = await response.json();

      if (response.ok) {
        setArticles(data.articles);
      } else {
        setError(data.message || 'Error fetching news data');
      }
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
        <Text>Error fetching news data: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
    {articles.map((article, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By: {article.author || 'Unknown'}</Text>
        <Text style={styles.date}>Published: {new Date(article.publishedAt).toLocaleDateString()}</Text>
        <View style={styles.sourceTag}>
          <Text>{article.source.name}</Text>
        </View>
        <Text style={styles.url} onPress={() => Linking.openURL(article.url)}>Read more</Text>
      </View>
    ))}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  articleContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    fontStyle: 'italic',
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    padding: 10,
  },
  sourceTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  date: {
    color: '#666',
    marginBottom: 10,
  },
});

export default News;
