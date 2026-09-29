import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.8}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: movie.poster,
          }}
          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}
        />

        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              ⭐ {movie.rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}
      >
        <Text
          style={[
            styles.movieTitle,
            isTile && styles.movieTitleTile,
          ]}
          numberOfLines={
            isTile ? 1 : undefined
          }
        >
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.detail}>
            Thể loại: {movie.genre}
          </Text>
        )}

        {!isTile && (
          <Text style={styles.detail}>
            Năm: {movie.year}
          </Text>
        )}

        <Text style={styles.rating}>
          ⭐ {movie.rating.toFixed(1)}
        </Text>

        <Text style={styles.status}>
          {movie.isShowing
            ? 'Đang chiếu ✅'
            : 'Ngừng chiếu ❌'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  // ======================================
  // ROW
  // ======================================

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
    flex: 1,
    minWidth: 0,
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#dddddd',
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  // ======================================
  // TILE
  // ======================================

  cardTile: {
    flexDirection: 'column',
    flexBasis: 0,
    padding: 8,
    marginBottom: 0,
  },

  posterContainer: {
    position: 'relative',
  },

  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
  },

  infoTile: {
    marginLeft: 0,
    marginTop: 8,
  },

  // ======================================
  // TEXT
  // ======================================

  movieTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222222',
  },

  movieTitleTile: {
    fontSize: 15,
  },

  detail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },

  rating: {
    fontSize: 14,
    color: '#e6a700',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  status: {
    fontSize: 13,
    color: '#444444',
  },

  // ======================================
  // RATING BADGE
  // ======================================

  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor:
      'rgba(0, 0, 0, 0.75)',
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  ratingBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});