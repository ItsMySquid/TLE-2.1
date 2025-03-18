import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Lesson() {
    const { id } = useParams();
    const [signs, setSigns] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/categories/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch signs");
                }
                const data = await response.json();
                setCategoryName(data.data.name || "Onbekende Categorie");
                setSigns(data.data.signs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSigns();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }
    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white font-radikal">
            {/* Header met terugknop en titel */}
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-[#00705e] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Terug
                        </button>
                        <h1 className="text-2xl font-bold">{categoryName}</h1>
                    </div>
                </div>
            </div>

            {/* Content: Woordenlijst en opdrachtknop */}
            <div className="p-6 max-w-4xl mx-auto">
                {/* Woordenlijst */}
                <div className="pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {signs.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <span className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-md bg-gray-200 dark:bg-gray-700">
                                    {index + 1}
                                </span>
                                <p className="text-lg font-semibold">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Opdracht-knop */}
                <div className="mt-6 flex justify-end">
                    <Link to={`/opdracht/${id}`}>
                        <button className="bg-[#00705e] text-white px-4 py-2 rounded-md shadow-md">
                            Maak de opdracht
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Lesson;