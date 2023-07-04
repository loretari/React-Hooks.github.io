import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


const Ingeredients = () =>{
const [ userIngredients, setUserIngredients ] = useState([]);

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
            <IngredientList ingredients = { userIngredients} onRemoveItem ={ removeIngredientHandler}/>

            <section>
                <Search/>
                {/* Need to add list here!*/}
            </section>
        </div>
    )
}

export default Ingeredients;