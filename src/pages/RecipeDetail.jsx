import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/recipes/${id}`).then((response) => {
            setRecipe(response.data);
        });
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="p-8 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full flex"> {/* Increased max width */}
                <div className='flex flex-col'>
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-1/2 object-cover rounded-l-lg m-4"  // Adjusted height and margin
                    />
                    <h1 className="text-3xl font-bold m-4">{recipe.name}</h1> {/* Increased heading size */}
                    <div className=" m-4">
                        <p className="mb-1"><strong>Cuisine:</strong> {recipe.cuisine}</p>
                        <p className="mb-1"><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        <p className="mb-1"><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
                        <p className="mb-1"><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
                        <p className="mb-1"><strong>Servings:</strong> {recipe.servings}</p>
                        <p className="mb-1"><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
                        <p className="mb-1"><strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)</p>
                    </div>
                </div>
                <div style={{ width: "1000px" }} className="p-6 flex flex-col justify-between"> {/* Flex column for vertical alignment */}


                    <h2 className="text-xl font-bold mb-2">Ingredients</h2>
                    <ul className="list-disc list-inside mb-4">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-bold mb-2">Instructions</h2>
                    <ol className="list-decimal list-inside mb-4">
                        {recipe.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>

                    <button className=' btn bg-green-200 rounded shadow hover:bg-green-600'><Link to="/" className="text-white text-center ">Back to Recipes</Link></button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
