import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://145.24.223.48/api/v1/categories', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('Full API Response:', data); // ✅ Check de exacte API structuur

                if (Array.isArray(data)) {
                    setCategories(data); // ✅ Direct de array opslaan
                } else {
                    console.error('Unexpected API response format:', data);
                }

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    // Toon alleen de eerste 3 categorieën
    const firstThreeCategories = categories.slice(0, 3);

    return (
        <section className="m-[5vw] text-black">
            {/* CATEGORIEËN OVERZICHT */}
            <section className="flex flex-row flex-wrap justify-evenly">
                {firstThreeCategories.map((category) => (
                    <article
                        className="w-[40vw] rounded-md border-2 border-black shadow-lg p-6 m-3"
                        key={category.id}
                    >
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl mb-4 font-semibold">{category.name}</h2>
                        </div>
                        <Link
                            to={`/les`} // Verandering van link naar categorieën
                            className={`flex justify-center items-center border-2 text-lg px-6 py-3 rounded-md bg-headerColor-100 text-backgroundColor-100`}
                        >
                            Bekijk Categorie
                        </Link>
                    </article>
                ))}
            </section>
        </section>
    );
}

export default Dashboard;
