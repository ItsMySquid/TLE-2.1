import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Correcte import
import { FaStar } from "react-icons/fa";

export default function List() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function fetchWords() {
            try {
                const response = await fetch("http://145.24.223.48/api/v1/categories", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                // console.log("Full API Response:", responseData); // 🔍 Check hoe de API eruitziet

                // Controleer of responseData een array is
                const extractedData = Array.isArray(responseData) ? responseData : [];
                // console.log("Extracted Data Before Setting State:", extractedData);

                setCategories(extractedData);
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        }

        fetchWords();
    }, []);





    // ⭐ Toggle favorieten
    const toggleFavorite = (signTitle) => {
        setFavorites((prev) =>
            prev.includes(signTitle)
                ? prev.filter((title) => title !== signTitle)
                : [...prev, signTitle]
        );
    };
    console.log(categories);
    // 🔍 Filteren op zoekopdracht
    const filteredCategories = categories
        .map(category => {
            const categoryMatches = category.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const filteredSigns = category.signs?.filter(sign =>
                sign.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];

            return categoryMatches ? { ...category, signs: category.signs || [] } : { ...category, signs: filteredSigns };
        })
        .filter(category => category.signs.length > 0);


    return (
        <section className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Woordenboek</h1>

            <input
                type="text"
                placeholder="Zoek een categorie of woord..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                    <div key={category.id} className="mb-6 p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        <ul className="mt-3">
                            {category.signs.map(sign => (
                                <li key={sign.id} className="flex justify-between items-center ml-4 text-lg">
                                    <Link
                                        to={`/woord/${sign.id}`}
                                        className="text-teal-700 font-semibold hover:underline"
                                    >
                                        {sign.title}
                                    </Link>
                                    <button onClick={() => toggleFavorite(sign.title)} className="ml-4">
                                        <FaStar
                                            className={favorites.includes(sign.title) ? "fill-yellow-500" : "fill-gray-400 stroke-gray-500"}
                                            size={20}
                                            style={{ strokeWidth: 2 }}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Geen resultaten gevonden.</p>
            )}
        </section>
    );
}
