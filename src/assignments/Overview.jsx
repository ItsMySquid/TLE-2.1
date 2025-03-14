import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

function Overview() {
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://145.24.223.48/api/v1/categories', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });

                const data = await response.json();
                console.log('Full API Response:', data);

                if (Array.isArray(data)) {
                    let selectedCategories = [];
                    if (id === '1') {
                        selectedCategories = data.slice(0, 4);
                    } else if (id === '2') {
                        selectedCategories = data.slice(4, 8);
                    } else if (id === '3') {
                        selectedCategories = data.slice(8, 13);
                    } else if (id === '4') {
                        selectedCategories = data.slice(13, 15);
                    } else if (id === '5') {
                        selectedCategories = data.slice(15, 20);
                    } else if (id === '6') {
                        selectedCategories = data.slice(20, 22);
                    } else if (id === '7') {
                        selectedCategories = data.slice(22, 25);
                    }
                    setCategories(selectedCategories);
                } else {
                    console.error('Unexpected API response format:', data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 font-radikal">
            <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-gray-800">Categorieoverzicht</h2>
                <p className="text-gray-600 mt-2 text-lg">Kies een categorie en start direct met leren!</p>
                <div className="w-16 h-1 bg-[#008F7A] mx-auto mt-4 rounded-full"></div>
            </div>

            <main className="p-8 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-80 text-center p-6"
                        >
                            <div className="bg-[#008F7A] h-2 rounded-t-xl"></div>
                            <div className="flex flex-col items-center py-4">
                                <div className="bg-[#008571] w-16 h-16 rounded-full flex items-center justify-center py-2 shadow-md">
                                    <span className="text-3xl" aria-hidden="true">📖</span>
                                    <span className="sr-only">Boek icoon</span>
                                </div>
                                <h3 className="font-semibold text-xl text-gray-800 mt-4">{category.name}</h3>
                                <p className="text-gray-500 text-sm mt-2">{category.description || ''}</p>
                            </div>
                            <Link
                                to={`/les/${category.id}`}
                                className="block bg-[#008571] text-white py-3 rounded-lg shadow-md transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#00C5A5] font-semibold text-lg mt-4"
                            >
                                Start categorie
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Overview;
