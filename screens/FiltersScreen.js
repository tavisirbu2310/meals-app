import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Switch} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from '../constants/colors';
import {Platform} from "react-native-web";
import {useDispatch} from "react-redux";

import {setFilters} from "../store/actions/meals";


const FilterSwitch = props => {
    return(
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.isGlutenFree} onValueChange={newValue=>props.onSwitch(newValue)}
                trackColor={{true:Colors.primaryColor}}
                thumbColor={Platform.OS === 'android'?Colors.primaryColor:''}/>
        </View>
    )
}

const FiltersScreen = props => {

    const [isGlutenFree,setIsGlutenFree] = useState(false);
    const [isLactoseFree,setIsLactoseFree] = useState(false);
    const [isVegan,setIsVegan] = useState(false);
    const [isVegetarian,setIsVegetarian] = useState(false);

    const {navigation} = props;

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }

        dispatch(setFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch]);

    useEffect(() => {
        navigation.setParams({
            save:saveFilters
        });
    },[saveFilters])

    return(
        <View style={styles.screen}>
            <Text style={styles.title}> Available Filters / Restrictions </Text>
            <FilterSwitch label='Gluten-free' isGlutenFree={isGlutenFree} onSwitch={setIsGlutenFree}/>
            <FilterSwitch label='Lactose-free' isGlutenFree={isLactoseFree} onSwitch={setIsLactoseFree}/>
            <FilterSwitch label='Vegan' isGlutenFree={isVegan} onSwitch={setIsVegan}/>
            <FilterSwitch label='Vegetarian' isGlutenFree={isVegetarian} onSwitch={setIsVegetarian}/>

        </View>
    );
};


FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='ios-save' onPress={navData.navigation.getParam('save')}/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width:'80%',
        marginVertical:10
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    }
});

export default FiltersScreen;

