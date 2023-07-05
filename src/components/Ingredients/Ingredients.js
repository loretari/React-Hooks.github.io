import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';



const Ingeredients = () => {
const [ userIngredients, setUserIngredients ] = useState([]);




useEffect(() => {
console.log('RENDERING INGREDIENTS', userIngredients)
    }, [userIngredients]);

const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients)
}, []);

const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-2fb5a-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'applications/json' }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        setUserIngredients(prevIngredients => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient }
        ]);
    })



};
    const removeIngredientHandler = ingredientId => {
        setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
        );
    };


    return (
        <div className= 'App'>
            <IngredientForm onAddIngredient = {addIngredientHandler}/>
            <section>
                <Search onLoadIngredients={filterIngredientsHandler}/>
                {/* Need to add list here!*/}
            </section>

            <IngredientList ingredients = { userIngredients} onRemoveItem ={ removeIngredientHandler}/>


        </div>
    )
}

export default Ingeredients;