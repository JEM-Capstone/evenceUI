import { AsyncStorage } from 'react-native';

const foodArray = [
  `food`,
  `sandwiches`,
  `appetizers`,
  `snacks`,
  `pizza`,
  `pizzas`,
  `tacos`,
];
const bevArray = [
  `drinks`,
  `alcohol`,
  `beverage`,
  `beverages`,
  `cocktails`,
  `beer`,
  `beers`,
  `liquor`,
];

export const findFood = searchText => {
  foodResult = foodArray.map(word => searchText.search(word));
  const filteredFood = foodResult.filter(num => num >= 0);
  return filteredFood.length;
};

export const findBev = searchText => {
  bevResult = bevArray.map(word => searchText.search(word));
  const filteredBev = bevResult.filter(num => num >= 0);
  return filteredBev.length;
};
export const findUser = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      // We have data!!
      console.log('this should be the user:', value);
      return Number(value);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
