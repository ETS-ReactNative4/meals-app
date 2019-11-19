import React from 'react';
import { Platform } from 'react-native';
import {  createStackNavigator } from 'react-navigation-stack';
import {  createBottomTabNavigator } from 'react-navigation-tabs';
import {  createAppContainer  } from 'react-navigation';
import {  createDrawerNavigator  } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import FilterScreen from '../screens/FilterScreen';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoriesMealScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });

const FiltersNavigator = createStackNavigator({
      Filters: FilterScreen
});

const MainNavigator =   createDrawerNavigator({
    MealsFavs: MealsFavTabNavigator,
    Filters:FilterScreen
});

export default createAppContainer(MainNavigator);
