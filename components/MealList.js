import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import MealItem from "./MealItem";
import {useSelector} from "react-redux";

const MealList = props => {

    let favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {

        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={()=>{
                    props.navigation.navigate({
                        routeName:'MealDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: favoriteMeals.some(meal => meal.id === itemData.item.id)
                        }
                    })
                }}/>
        )
    }

    return(
        <View style={styles.list}>
            <FlatList
                style={{width:'100%',padding:15}}
                data={props.listData}
                keyExtractor={item => item.id}
                renderItem={renderMealItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList