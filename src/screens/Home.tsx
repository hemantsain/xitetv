import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet } from 'react-native';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript';
import xorBy from 'lodash.xorby';
import VideoItemRow from '../components/VideoItemRow';
import { getVideosData } from '../services/VideoService';
import { Genre, Video } from '../types/VideoDataTypes';
import { contains, formatData, isTablet } from '../utils/Utility';

let allVideos: Video[] = [];
let allGenre: Genre[] = [];

export const Home: React.FC = () => {
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Item[]>([]);

  const getVideos = useCallback(async () => {
    const result = await getVideosData();
    allVideos = result?.videos;
    allGenre = formatData(result?.genres);
    setVideosData(result?.videos);
  }, []);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const handleSearch = useCallback(() => {
    if (searchQuery.length > 0) {
      const data = allVideos?.filter(item => {
        return (
          contains(item?.artist, searchQuery) ||
          contains(item?.title, searchQuery)
        );
      });
      setVideosData(data);
    } else {
      setVideosData(allVideos);
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleGenreSearch = useCallback(() => {
    if (selectedGenres.length > 0) {
      const data = allVideos?.filter(video => {
        return selectedGenres.some(item => video.genre_id === item.id);
      });
      setVideosData(data);
    } else {
      setVideosData(allVideos);
    }
  }, [selectedGenres]);

  const onMultiChange = (item: Item) => {
    return setSelectedGenres(xorBy(selectedGenres, [item], 'id'));
  };

  useEffect(() => {
    handleGenreSearch();
  }, [handleGenreSearch]);

  const renderSearchBar = (): JSX.Element => {
    return (
      <TextInput
        style={styles.searchContainerStyle}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search"
      />
    );
  };

  const renderFilter = (): JSX.Element => {
    return (
      <View style={{ margin: 14 }}>
        <SelectBox
          label="Select Genres"
          options={allGenre}
          selectedValues={selectedGenres}
          onMultiSelect={(item: Item) => onMultiChange(item)}
          onTapClose={(item: Item) => onMultiChange(item)}
          isMulti
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: Video }) => {
    return <VideoItemRow item={item} />;
  };

  const renderNoData = () => {
    return <Text style={styles.titleTextStyle}>No Data Available</Text>;
  };

  return (
    <View style={styles.rootContainer}>
      {renderSearchBar()}
      {renderFilter()}
      {videosData?.length > 0 ? (
        <FlatList
          data={videosData}
          renderItem={renderItem}
          keyExtractor={(item: Video) => item.id.toString()}
          numColumns={isTablet() ? 4 : 3}
        />
      ) : (
        renderNoData()
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#ffffff',
  },
  searchContainerStyle: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 12,
    color: '#000000',
    marginTop: 10,
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
