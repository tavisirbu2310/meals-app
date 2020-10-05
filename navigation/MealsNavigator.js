import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";

import {createAppContainer} from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealsScreen";
import MealDetailedScreen from "../screens/MealDetailedScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import {Text,Platform} from "react-native";
import Colors from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '#fff'
    },
    headerTitleStyle:{
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
    headerTitle: 'Screen'
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealScreen
    },
    MealDetail: MealDetailedScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions,
    // mode:'modal',
    // initialRouteName:'MealDetail'
});

const FavNavigator = createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailedScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor:Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android'?<Text style={{fontFamily:'open-sans-bold'}}>Meals</Text>:'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor:Colors.accentColor,
            tabBarLabel: Platform.OS === 'android'?<Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text>:'Favorites'
        }
    }
}


const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig,
        {
            activeColor: '#fff',
            shifting:true,
            barStyle:{
                backgroundColor: Colors.primaryColor
            }
        }) :
    createBottomTabNavigator(tabScreenConfig,
        {
            tabBarOptions: {
                labelStyle:{
                  fontFamily:'open-sans-bold'
                },
                activeTintColor: Colors.accentColor
            }
        });

const FiltersNavigator = createStackNavigator({
    Filters:FiltersScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen:MealsFavTabNavigator,
        navigationOptions:{
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
},{
    contentOptions:{
        activeTintColor: Colors.accentColor,
        labelStyle:{
            fontFamily:'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);
