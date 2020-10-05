import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTitle from "../components/CategoryGridTile";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item, index) => item.id}
            renderItem={itemData => <CategoryGridTitle color={itemData.item.color} title={itemData.item.title}
                                                       onSelect={() => {
                                                           props.navigation.navigate({
                                                               routeName: 'CategoryMeals',
                                                               params: {
                                                                   categoryId: itemData.item.id
                                                               }
                                                           });
                                                       }}
            />}
            numColumns={2}/>
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;

