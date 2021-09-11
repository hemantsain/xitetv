import { GET_VIDEOS_API } from '../../env.json';

export const getVideosData = async () => {
  try {
    const response = await fetch(`${GET_VIDEOS_API}`, {
      method: 'GET',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
