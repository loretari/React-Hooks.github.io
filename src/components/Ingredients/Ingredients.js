import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingeredients = () =>{
const [ userIngredients, setUserIngredients ] = useState([]);

const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: Math.random().toString(), ...ingredient }
    ])
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