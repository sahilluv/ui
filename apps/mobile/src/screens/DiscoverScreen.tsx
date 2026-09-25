import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ShadowHeader } from '../components/ShadowHeader';
import { SearchBar } from '../components/SearchBar';
import { MediaGrid } from '../components/MediaGrid';
import { useTheme } from '../context/ThemeContext';
import { ExploreCategory, ExploreMediaCard } from '../types';

export default function DiscoverScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: ExploreCategory[] = [
    {
      id: 'igtv',
      title: 'IGTV',
      iconName: 'tv-outline',
      gradient: ['#7928CA', '#A855F7', '#C084FC'],
    },
    {
      id: 'tienda',
      title: 'CAMPUS',
      iconName: 'school-outline',
      gradient: ['#EC4899', '#F43F5E', '#FB7185'],
    },
    {
      id: 'viajes',
      title: 'VIAJES',
      iconName: 'airplane-outline',
      gradient: ['#06B6D4', '#0EA5E9', '#3B82F6'],
    },
    {
      id: 'fitness',
      title: 'WELLNESS',
      iconName: 'fitness-outline',
      gradient: ['#F97316', '#FB923C', '#F43F5E'],
    },
  ];

  const mediaCards: ExploreMediaCard[] = [
    {
      id: 'media_1',
      height: 210,
      gradient: ['#283344', '#1A222E', '#0E131A'],
      title: 'Deep Obsidian',
    },
    {
      id: 'media_2',
      height: 140,
      gradient: ['#581C87', '#7E22CE', '#9333EA'],
      title: 'Midnight Ultraviolet',
    },
    {
      id: 'media_3',
      height: 160,
      gradient: ['#1E1B4B', '#312E81', '#4338CA'],
      title: 'Electric Indigo',
    },
    {
      id: 'media_4',
      height: 230,
      gradient: ['#0E7490', '#155E75', '#083344'],
      title: 'Teal Study #04',
    },
    {
      id: 'media_5',
      height: 150,
      gradient: ['#7A58E6', '#B77DE8', '#F5A7C4'],
      title: 'Pastel Sunrise',
    },
    {
      id: 'media_6',
      height: 180,
      gradient: ['#4E137D', '#791DA6', '#C724B1'],
      title: 'Neon Bloom',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 1. Header */}
      <ShadowHeader
        colors={colors}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onAddPress={() => navigation.navigate('Create')}
        onNotificationsPress={() => navigation.navigate('Notifications')}
        unreadCount={2}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* 2. Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          colors={colors}
        />

        {/* 3. Category Horizontal Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  setSelectedCategory(isSelected ? null : category.id)
                }
                activeOpacity={0.8}
                style={[
                  styles.categoryPill,
                  { borderColor: colors.border, backgroundColor: colors.inputBackground },
                  isSelected && { borderColor: colors.accent, borderWidth: 1.5 },
                ]}
              >
                <LinearGradient
                  colors={category.gradient}
                  style={styles.categoryIconWrap}
                >
                  <Ionicons name={category.iconName as any} size={15} color="#FFFFFF" />
                </LinearGradient>
                <Text
                  style={[
                    styles.categoryTitle,
                    { color: colors.text },
                    isSelected && { color: colors.accent, fontWeight: '800' },
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. Asymmetric Media Grid */}
        <MediaGrid
          cards={mediaCards}
          colors={colors}
          onCardPress={() => {}}
        />
      </ScrollView>
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
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 10,
    paddingTop: 12,
    paddingBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  categoryIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
