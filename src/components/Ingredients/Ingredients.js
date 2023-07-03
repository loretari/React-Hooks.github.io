import React from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingeredients() {
    return (
        <div>
            <IngredientForm/>

            <section>
                <Search/>
                {/* Need to add list here!*/}
            </section>
        </div>
    )
}

export default Ingeredients;