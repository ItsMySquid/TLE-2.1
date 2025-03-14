import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Lesson() {
    const { id } = useParams(); // ✅ ID uit de URL halen
    const [signs, setSigns] = useState([]);
    const [categoryName, setCategoryName] = useState(""); // ✅ Nieuw: Opslaan van de categorie naam
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Gebruik useNavigate voor pagina navigatie

    useEffect(() => {
        const fetchSigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/categories/${id}`); // ✅ Dynamisch ID
                if (!response.ok) {
                    throw new Error("Failed to fetch signs");
                }

                const data = await response.json();
                setCategoryName(data.data.name || "Onbekende Categorie"); // ✅ Haal de naam van de categorie op
                setSigns(data.data.signs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSigns();
    }, [id]); // ✅ Opnieuw laden als de URL verandert

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center mb-4">
                    {/* Terugknop links van de categoryName */}
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-headerColor-100 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        Terug
                    </button>
                    {/* Center de categoryName */}
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold">{categoryName}</h1>
                    </div>
                </div>
            </div>

            <hr className="w-screen bg-black h-px border-0" />

            <div className="p-6 max-w-4xl mx-auto">
                {/* Woordenlijst */}
                <div className="border-gray-400 pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {signs.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <span className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-md bg-gray-200">
                                    {index + 1}
                                </span>
                                <p className="text-lg font-semibold">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="mt-6 flex justify-end">
                    <Link to={`/opdracht/${id}`}> {/* ✅ Opdracht-URL past zich aan */}
                        <button className="bg-headerColor-100 text-white px-4 py-2 rounded-md shadow-md">
                            Maak de opdracht
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Lesson;
