import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';




const Ingeredients = () => {
const [ userIngredients, setUserIngredients ] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();



useEffect(() => {
console.log('RENDERING INGREDIENTS', userIngredients)
    }, [userIngredients]);

const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients)
}, []);

const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-2fb5a-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'applications/json' }
    })
        .then(response => {
            setIsLoading(false);
        return response.json();
    }).then(responseData => {
        setUserIngredients(prevIngredients => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient }
        ]);
    })
};
    const removeIngredientHandler = ingredientId => {
     setIsLoading(true);
        fetch
        (`https://react-hooks-update-2fb5a-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
            {
            method: 'DELETE'
        }).then(response => {
            setIsLoading(false);
            setUserIngredients(prevIngredients =>
                prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
            );
        }).catch(error => {
            setError('Something went wrong!');
            setIsLoading(false);
        });


    };

    const clearError = () => {
        setError(null);

    }

    return (
        <div className= 'App'>
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm
             onAddIngredient = {addIngredientHandler}
            loading={isLoading}
            />

            <section>
                <Search onLoadIngredients={filterIngredientsHandler}/>
                {/* Need to add list here!*/}
                <IngredientList
                ingredients = { userIngredients}
                onRemoveItem ={ removeIngredientHandler}
                />
        </section>

        </div>
    )
}

export default Ingeredients;