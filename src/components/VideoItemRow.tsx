import React, { memo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Video } from '../types/VideoDataTypes';

type VideoItemRowProps = {
  item: Video;
};

const VideoItemRow: React.FC<VideoItemRowProps> = (
  props: VideoItemRowProps,
) => {
  const { image_url, title, artist } = props?.item;

  return (
    <View style={styles.innerContainer}>
      <Image style={styles.avatarStyle} source={{ uri: image_url }} />
      <Text style={styles.titleTextStyle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.artistTextStyle} numberOfLines={1}>
        {artist}
      </Text>
    </View>
  );
};
export default memo(VideoItemRow);

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    margin: 10,
  },
  avatarStyle: {
    height: 100,
  },
  rightContainer: {
    marginHorizontal: 12,
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  artistTextStyle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
