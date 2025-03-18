import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function List() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]); // Favorieten bijhouden

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("http://145.24.223.48/api/v2/categories", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setCategories(Array.isArray(responseData) ? responseData : []);
                console.log(responseData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);

    // Haal de opgeslagen favorieten op bij het laden van de pagina
    useEffect(() => {
        async function fetchFavorites() {
            if (!token) return;

            try {
                const response = await fetch("http://145.24.223.48/api/v1/favorites", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Fout bij ophalen favorieten: ${response.status}`);
                }

                const favoriteList = await response.json();
                const favoriteTitles = favoriteList.map(fav => fav.sign_id); // Opslaan als ID's
                setFavorites(favoriteTitles);
            } catch (error) {
                console.error("Error bij ophalen favorieten:", error);
            }
        }

        fetchFavorites();
    }, [token]);

    // Toggle favorieten (aanpassen van favorieten bij klikken)
    const toggleFavorite = async (sign) => {
        if (!token) {
            console.error("Geen token gevonden. Gebruiker moet ingelogd zijn.");
            return;
        }

        try {
            const responseCheck = await fetch("http://145.24.223.48/api/v1/favorites", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!responseCheck.ok) {
                throw new Error(`Fout bij ophalen favorieten: ${responseCheck.status}`);
            }

            const favoriteList = await responseCheck.json();
            const existingFavorite = favoriteList.find(fav => fav.sign_id === sign.id);

            if (existingFavorite) {
                // DELETE als het al een favoriet is
                const responseDelete = await fetch(`http://145.24.223.48/api/v1/favorites/${sign.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!responseDelete.ok) {
                    throw new Error(`Fout bij verwijderen favoriet: ${responseDelete.status}`);
                }

                setFavorites(prev => prev.filter(id => id !== sign.id));
            } else {
                // POST als het nog geen favoriet is
                const responsePost = await fetch("http://145.24.223.48/api/v1/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ sign_id: sign.id }),
                });

                if (!responsePost.ok) {
                    throw new Error(`Fout bij opslaan favoriet: ${responsePost.status}`);
                }

                setFavorites(prev => [...prev, sign.id]);
            }
        } catch (error) {
            console.error("Error bij verwerken favoriet:", error);
        }
    };

    // Filteren op zoekopdracht
    const filteredCategories = categories
        .map(category => {
            // Filter op naam van categorie
            const categoryMatches = category.name?.toLowerCase().includes(searchTerm.toLowerCase());

            // Filter de signs als ze bestaan
            const filteredSigns = category.signs?.filter(sign =>
                sign.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];

            return categoryMatches ? { ...category, signs: filteredSigns } : { ...category, signs: [] };
        })
        .filter(category => category.signs.length > 0 || category.lessons.length > 0); // We tonen de categorie als er signs of lessons zijn

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
                        {/* Toon de categorie en lessons naast elkaar */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{category.name}</h2>

                            {/* Toon de lessons als een sub-naam, als die er zijn */}
                            {category.lessons?.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    {category.lessons.map((lesson, index) => (
                                        <Link
                                            key={index}
                                            to={`../les/${lesson.id}`}  // Link naar de pagina van de les met het ID
                                            className="text-lg text-teal-600 hover:underline"
                                        >
                                            {lesson.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Rest van de code... */}



                        {/* Toon de signs */}
                        {category.signs?.length > 0 && (
                            <ul className="mt-3">
                                {category.signs.map(sign => (
                                    <li key={sign.id} className="flex justify-between items-center ml-4 text-lg">
                                        <Link
                                            to={`/woord/${sign.id}`}
                                            className="text-teal-700 font-semibold hover:underline"
                                        >
                                            {sign.title}
                                        </Link>
                                        <button onClick={() => toggleFavorite(sign)} className="ml-4">
                                            <FaStar
                                                className={favorites.includes(sign.id) ? "fill-yellow-500" : "fill-gray-400 stroke-gray-500"}
                                                size={20}
                                                style={{ strokeWidth: 2 }}
                                            />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Geen resultaten gevonden.</p>
            )}
        </section>
    );
}
