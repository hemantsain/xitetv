import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import VideoItemRow from '../components/VideoItemRow';
import { getVideosData } from '../services/VideoService';
import { Video } from '../types/VideoDataTypes';

export const Home: React.FC = () => {
  const [videosData, setVideosData] = useState<Video[]>([]);

  const getVideos = useCallback(async () => {
    const result = await getVideosData();
    setVideosData(result?.videos);
  }, []);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const renderItem = ({ item }: { item: Video }) => {
    return <VideoItemRow item={item} />;
  };

  return (
    <View>
      <FlatList
        data={videosData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};
