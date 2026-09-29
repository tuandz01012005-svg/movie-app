import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, {
  Movie,
} from './components/MovieCard';

const API_URL =
  'https://6abb5c44b2118ed7abb857ff.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [loading, setLoading] =
    useState(true);

  // false = row
  // true = tile
  const [isTile, setIsTile] =
    useState(false);

  const fetchMovies = async () => {
    try {
      const response =
        await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const data: Movie[] =
        await response.json();

      setMovies(data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Lỗi',
        'Không thể tải danh sách phim'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSelect = (id: string) => {
    const movie = movies.find(
      (item) => item.id === id
    );

    if (movie) {
      Alert.alert(movie.title);
    }
  };

  const numColumns =
    isTile ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Movie App
          </Text>

          <View
            style={styles.switchContainer}
          >
            <Text style={styles.switchText}>
              Dạng lưới
            </Text>

            <Switch
              value={isTile}
              onValueChange={setIsTile}
            />
          </View>
        </View>

        {/* CONTENT */}
        {loading ? (
          <View
            style={styles.loadingContainer}
          >
            <ActivityIndicator
              size="large"
              color="#e50914"
            />

            <Text style={styles.loadingText}>
              Đang tải dữ liệu...
            </Text>
          </View>
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            numColumns={numColumns}
            keyExtractor={(item) =>
              String(item.id)
            }
            contentContainerStyle={
              styles.list
            }
            columnWrapperStyle={
              isTile
                ? styles.columnWrapper
                : undefined
            }
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={
                  isTile
                    ? 'tile'
                    : 'row'
                }
                onSelect={handleSelect}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // ======================================
  // HEADER
  // ======================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e50914',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  switchText: {
    fontSize: 14,
    color: '#333333',
  },

  // ======================================
  // LIST
  // ======================================

  list: {
    padding: 12,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    gap: 12,
  },

  // ======================================
  // LOADING
  // ======================================

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#555555',
  },
});