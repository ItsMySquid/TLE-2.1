import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // ⭐ FontAwesome ster importeren

export default function Favorites() {
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetchFavorites();
    }, []);

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
            setFavoriteWords(favoriteList);
        } catch (error) {
            console.error("Error bij ophalen favorieten:", error);
        }
    }

    async function removeFavorite(signId) {
        if (!token) return;

        try {
            const response = await fetch(`http://145.24.223.48/api/v1/favorites/${signId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Fout bij verwijderen favoriet: ${response.status}`);
            }

            // ✅ Direct updaten zonder herladen
            setFavoriteWords(prevFavorites => prevFavorites.filter(fav => fav.sign.id !== signId));
        } catch (error) {
            console.error("Error bij verwijderen favoriet:", error);
        }
    }


    const filteredFavorites = favoriteWords.filter(fav =>
        fav.sign.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Mijn favorieten</h1>
            <p className="text-gray-600 mb-6">Bekijk en beheer je favoriete video's</p>

            {/* Zoekbalk */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Zoek een favoriet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-2/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500
    dark:bg-gray-200 dark:text-black"
                />
            </div>

            {/* Favorieten Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map(fav => (
                        <div key={fav.id} className="border p-6 rounded-lg shadow-lg flex flex-col items-center relative bg-white">
                            <p className="text-2xl font-semibold pt-5">{fav.sign.title}</p>

                            {/* ⭐ Klikbare ster voor verwijderen */}
                            <FaStar
                                className="absolute top-3 right-3 text-yellow-500 text-3xl cursor-pointer hover:text-gray-400 transition-colors"
                                onClick={() => removeFavorite(fav.sign.id)} // Gebruik fav.sign.id
                            />

                            <div className="mt-5 flex gap-3">
                                <Link to={`/les/${fav.sign.category_id}`} className="bg-teal-500 text-white px-5 py-2 rounded-full w-32 text-center">
                                    Categorie
                                </Link>
                                <Link to={`/woord/${fav.sign.id}`} className="bg-teal-500 text-white px-5 py-2 rounded-full w-32 text-center">
                                    Video
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3 text-center">Geen favorieten gevonden.</p>
                )}
            </div>
        </div>
    );
}
