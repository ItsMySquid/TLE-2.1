import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const { id } = useParams(); // Les ID ophalen uit de URL
    const navigate = useNavigate();

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
                    // Toon categorieën afhankelijk van de les-ID
                    let selectedCategories = [];
                    if (id === '1') {
                        selectedCategories = data.slice(0, 4); // Categorieën 1 t/m 4
                    } else if (id === '2') {
                        selectedCategories = data.slice(4, 8); // Categorieën 5 t/m 8
                    } else if (id === '3') {
                        selectedCategories = data.slice(8, 13); // Categorieën 9 t/m 13
                    } else if (id === '4') {
                        selectedCategories = data.slice(13, 15); // Categorieën 14 en 15
                    } else if (id === '5') {
                        selectedCategories = data.slice(15, 20); // Categorieën 16 t/m 20
                    } else if (id === '6') {
                        selectedCategories = data.slice(20, 22); // Categorieën 21 en 22
                    } else if (id === '7') {
                        selectedCategories = data.slice(22, 25); // Categorieën 23 t/m 25
                    }
                    setCategories(selectedCategories); // De geselecteerde categorieën opslaan
                } else {
                    console.error('Unexpected API response format:', data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, [id]); // Laad opnieuw wanneer lesId verandert

    return (
        <section className="m-[5vw] text-black">
            <div className="flex gap-20 justify-center items-start">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-headerColor-100 text-white px-4 py-2 rounded-md shadow-md"
                >
                    Terug
                </button>

                <section className="flex flex-row flex-wrap gap-6">
                    {categories.map((category) => (
                        <article
                            className="relative w-[35vw] rounded-md border-2 border-black shadow-lg p-6"
                            key={category.id}
                        >
                            <div className="absolute top-2 right-2 bg-gray-200 px-3 py-1 rounded-full text-sm">
                                0 / {category.signs?.length || 0}
                            </div>

                            <div className="flex flex-row justify-between">
                                <h2 className="text-2xl mb-4 font-semibold">{category.name}</h2>
                            </div>
                            <Link
                                to={`/les/${category.id}`}
                                className="flex justify-center items-center border-2 text-lg px-6 py-3 rounded-md bg-headerColor-100 text-backgroundColor-100"
                            >
                                Bekijk Categorie
                            </Link>
                        </article>
                    ))}
                </section>
            </div>
        </section>
    );
}

export default Dashboard;
