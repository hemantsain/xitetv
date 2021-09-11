import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript';
import xorBy from 'lodash.xorby';
import VideoItemRow from '../components/VideoItemRow';
import { getVideosData } from '../services/VideoService';
import { Genre, Video } from '../types/VideoDataTypes';
import { contains } from '../utils/Utility';

let allVideos: Video[] = [];
let allGenre: Genre[] = [];

export const Home: React.FC = () => {
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Item[]>([]);

  const formatData = (data: Genre[]): Genre[] => {
    let formattedArray: Genre[] = [];
    data.map((_item: Genre) => {
      formattedArray.push({
        ..._item,
        item: _item.name,
      });
    });
    return formattedArray;
  };

  const getVideos = useCallback(async () => {
    const result = await getVideosData();
    allVideos = result?.videos;
    allGenre = formatData(result?.genres);
    setVideosData(result?.videos);
  }, []);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const handleSearch = (text: string) => {
    if (text.length > 0) {
      const data = videosData.filter(item => {
        return contains(item?.artist, text) || contains(item?.title, text);
      });
      setVideosData(data);
    } else {
      setVideosData(allVideos);
    }
    setSearchQuery(text);
  };

  const renderSearchBar = (): JSX.Element => {
    return (
      <TextInput
        style={styles.searchContainerStyle}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={text => handleSearch(text)}
        placeholder="Search"
      />
    );
  };

  const onMultiChange = (item: Item) => {
    return setSelectedFilters(xorBy(selectedFilters, [item], 'id'));
  };

  const renderFilter = (): JSX.Element => {
    return (
      <View style={{ margin: 14 }}>
        <SelectBox
          label="Select multiple"
          options={allGenre}
          selectedValues={selectedFilters}
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

  return (
    <View>
      {renderSearchBar()}
      {renderFilter()}
      <FlatList
        data={videosData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainerStyle: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 12,
    color: '#000000',
  },
});
