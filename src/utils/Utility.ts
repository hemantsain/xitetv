import { Dimensions, PixelRatio } from 'react-native';

export const contains = (text: string, query: string): boolean => {
  if (text.toString().toLowerCase().includes(query.toString().toLowerCase())) {
    return true;
  }
  return false;
};

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};
