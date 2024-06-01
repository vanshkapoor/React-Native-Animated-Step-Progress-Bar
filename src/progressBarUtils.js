/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

export const getBarItemsWidth = totalItems => {
  const width = Dimensions.get('window').width;
  return width / (totalItems >= 4 ? 4 : totalItems);
};
