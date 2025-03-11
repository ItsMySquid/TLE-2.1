import { useEffect, useState } from "react";
import {Link} from "react-router";
// import { FaStar } from "react-icons/fa";


export default function List() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Vraagwoorden",
            signs: [
                { id: 1, title: "Hoe", description: "Een vraagwoord om te vragen naar de manier waarop iets gebeurt.", image: null, video: "app/public/videos/Hoe.mp4" },
                { id: 2, title: "Hoelang", description: "Een vraagwoord om te vragen naar een tijdsduur.", image: null, video: "app/public/videos/Hoelang.mp4" }
            ]
        },
        {
            id: 2,
            name: "Groeten",
            signs: [
                { id: 3, title: "Hallo", description: "Een manier om iemand te begroeten.", image: null, video: "app/public/videos/Hallo.mp4" },
                { id: 4, title: "Tot ziens", description: "Een manier om afscheid te nemen.", image: null, video: "app/public/videos/TotZiens.mp4" }
            ]
        }
    ]);


    // Database verbinding zodra ie gefixed is.
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/categories")
    //         .then(response => response.json())
    //         .then(data => setCategories(data))
    //         .catch(error => console.error("Fout bij ophalen van data:", error));
    // }, []);

    const [favorites, setFavorites] = useState([]);

    // Functie om favorieten toe te voegen/verwijderen
    const toggleFavorite = (signTitle) => {
        setFavorites(prevFavorites =>
            prevFavorites.includes(signTitle)
                ? prevFavorites.filter(title => title !== signTitle)
                : [...prevFavorites, signTitle]
        );
    };

    const filteredCategories = categories
        .map(category => {
            // ✅ Check of de categorie naam overeenkomt met de zoekopdracht
            const categoryMatches = category.name.toLowerCase().includes(searchTerm.toLowerCase());

            // ✅ Filter woorden binnen de categorie
            const filteredSigns = category.signs.filter(sign =>
                sign.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // ✅ Als de categorie een match is, toon ALLE woorden
            return categoryMatches ? { ...category, signs: category.signs } : { ...category, signs: filteredSigns };
        })
        .filter(category => category.signs.length > 0); // Verwijder lege categorieën

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

            {/* 📂 Lijst van gefilterde categorieën */}
            {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                    <div key={category.id} className="mb-6 p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        <ul className="mt-3">
                            {category.signs.map(sign => (
                                <li key={sign.id} className="flex justify-between items-center ml-4 text-lg">
                                    <Link
                                        to={`/woord/${sign.title.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-teal-700 font-semibold hover:underline"
                                    >
                                        {sign.title}
                                    </Link>
                                    <button onClick={() => toggleFavorite(sign.title)} className="ml-4">
                                        <FaStar
                                            className={favorites.includes(sign.title) ? "fill-yellow-500" : "fill-gray-400 stroke-gray-500"}
                                            size={20}
                                            style={{strokeWidth: 2}}
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
