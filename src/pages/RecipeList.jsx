import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../features/recipeSlice';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.recipes);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 5;

    useEffect(() => {
        dispatch(fetchRecipes(searchTerm));
    }, [dispatch, searchTerm]);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    console.log(data);

    const totalPages = Math.ceil(data.length / recipesPerPage);
    const paginatedData = data.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
            <input
                type="text"
                placeholder="Search by Cuisine"
                value={searchTerm}
                onChange={handleSearch}
                className="border rounded-lg px-4 py-2 mb-4 w-80"
            />
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Cuisine</th>
                        <th className="border px-4 py-2 text-left">Rating</th>
                        <th className="border px-4 py-2 text-left">Meal Type</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((recipe) => (
                        <tr key={recipe.id} className="hover:bg-gray-100 transition duration-200">
                            <td className="border px-4 py-2">{recipe.name}</td>
                            <td className="border px-4 py-2">{recipe.cuisine}</td>
                            <td className="border px-4 py-2">{recipe.rating} ⭐ ({recipe.reviewCount} reviews)</td>
                            <td className="border px-4 py-2">{recipe.mealType.join(', ')}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:text-blue-700">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded-lg transition duration-200 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
