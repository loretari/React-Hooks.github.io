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
}

    return (
        <div className= 'App'>
            <IngredientForm onAddIngredient = {addIngredientHandler}/>
            <IngredientList ingredients = { userIngredients} onRemoveItem ={ () => {}}/>

            <section>
                <Search/>
                {/* Need to add list here!*/}
            </section>
        </div>
    )
}

export default Ingeredients;