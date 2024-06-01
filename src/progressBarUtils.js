/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

export const getBarItemsWidth = totalItems => {
  const width = Dimensions.get('window').width;
  return width / (totalItems >= 4 ? 4 : totalItems);
};

export const createProgressBarItems = (barItems, activeIndex) => {
  return barItems.map((barItem, index) => {
    return {
      index: barItem.index,
      title: barItem.title,
      status: index<activeIndex? "completed": index == activeIndex? "active": "pending",
    }
  })
}

export const getScrollAmount = (width, activeIndex) => {
  return width * activeIndex;
} 