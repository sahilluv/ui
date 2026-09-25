import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ShadowHeader } from '../components/ShadowHeader';
import { StoryRow } from '../components/StoryRow';
import { PostCard } from '../components/PostCard';
import { ShareSheet } from '../components/ShareSheet';
import { useTheme } from '../context/ThemeContext';
import { apiClient } from '../api/client';
import { Post } from '../types/api';
import { StoryItem } from '../types';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const { colors, isDark, toggleTheme } = useTheme();

  // Real backend feed state
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSharePostId, setSelectedSharePostId] = useState<string | null>(null);
  const isLoadingMoreRef = useRef(false);

  // Isolated demo stories for the visual concept header
  const stories: StoryItem[] = [
    {
      id: 'user_story',
      username: 'Tu historia',
      gradientColors: ['#FF0A78', '#991BEA', '#7928CA'],
      isCurrentUser: true,
    },
    {
      id: 'story_1',
      username: 'Ezequias',
      gradientColors: ['#FF6B4A', '#FF3366', '#C026D3'],
    },
    {
      id: 'story_2',
      username: 'Alice_002',
      gradientColors: ['#C026D3', '#7928CA', '#3B82F6'],
    },
    {
      id: 'story_3',
      username: 'Paulette_R',
      gradientColors: ['#FF2D55', '#B026FF', '#4F46E5'],
    },
    {
      id: 'story_4',
      username: 'Carlos_v',
      gradientColors: ['#06B6D4', '#3B82F6', '#6366F1'],
    },
  ];

  // Fetch real feed from API
  const loadFeed = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
      setNextCursor(null);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await apiClient.getFeed({ limit: 20 });
      setPosts(response.items);
      setNextCursor(response.nextCursor);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Unable to load your feed.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const loadMorePosts = async () => {
    if (!nextCursor || isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;

    try {
      const response = await apiClient.getFeed({ limit: 20, cursor: nextCursor });
      setPosts((prev) => [...prev, ...response.items]);
      setNextCursor(response.nextCursor);
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      isLoadingMoreRef.current = false;
    }
  };

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  // Refresh if redirected back with postCreated param
  useEffect(() => {
    if (route.params?.postCreated) {
      navigation.setParams({ postCreated: undefined });
      loadFeed(true);
    }
  }, [route.params?.postCreated, loadFeed, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 1. Concept Shadow Header with Cursive Wordmark & Action Icons */}
      <ShadowHeader
        colors={colors}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onAddPress={() => navigation.navigate('Create')}
        onNotificationsPress={() => navigation.navigate('Notifications')}
        unreadCount={2}
      />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const distanceFromBottom =
            nativeEvent.contentSize.height -
            (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y);
          if (distanceFromBottom <= 300) {
            void loadMorePosts();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadFeed(true)}
            tintColor={colors.accent}
          />
        }
      >
        {/* 2. Concept Story Row */}
        <StoryRow
          stories={stories}
          colors={colors}
          onStoryPress={() => {}}
        />

        {/* 3. Real Feed Posts in Concept Card Styling */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="small" color={colors.accent} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, { color: colors.secondaryText }]}>{error}</Text>
          </View>
        ) : posts.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
              No posts in your campus circle yet. Be the first to share!
            </Text>
          </View>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              colors={colors}
              onSharePress={(id) => setSelectedSharePostId(id)}
              onUserPress={() => navigation.navigate('Profile')}
            />
          ))
        )}
      </ScrollView>

      {/* Share Sheet Modal */}
      {selectedSharePostId && (
        <ShareSheet
          visible={!!selectedSharePostId}
          onClose={() => setSelectedSharePostId(null)}
          colors={colors}
          postTitle="Shadow Campus Post"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollBody: {
    paddingBottom: 40,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 13,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
