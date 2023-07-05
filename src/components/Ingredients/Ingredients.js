import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';



const Ingeredients = () => {
const [ userIngredients, setUserIngredients ] = useState([]);


useEffect(() => {
    fetch('https://react-hooks-update-2fb5a-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => response.json())
            .then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData) {
                    loadedIngredients.push({
                        id: key,
                        title: responseData[key].title,
                        amount: responseData[key].amount
                    });
                }
                setUserIngredients(loadedIngredients);
            });
}, []);


useEffect(() => {
console.log('RENDERING INGREDIENTS', userIngredients)
    }, [userIngredients]);

const filterIngredientsHandler = filterIngredients => {
    setUserIngredients(filterIngredients);
}

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
                <Search onLoadIngredients={filterIngredientsHandler}/>
                {/* Need to add list here!*/}
            </section>
        </div>
    )
}

export default Ingeredients;