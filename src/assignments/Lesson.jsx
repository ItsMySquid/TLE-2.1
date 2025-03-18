import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Lesson() {
    const { id } = useParams();
    const [signs, setSigns] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [results, setResults] = useState({});
    const [lessons, setLessons] = useState(null);  // null omdat we geen les-ID hebben bij de start
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // 🔹 Haal user_id op uit localStorage

    useEffect(() => {
        const fetchSigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.48/api/v2/categories/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch signs");
                }
                const data = await response.json();

                console.log("Full Data:", data);

                setCategoryName(data.data.name || "Onbekende Categorie");
                setSigns(data.data.signs || []);
                setLessons(data.data.lessons[0]?.id || null);  // Sla de ID van de eerste les op
                console.log("First Lesson ID:", data.data.lessons[0]?.id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchResults = async () => {
            try {
                const response = await fetch(`http://145.24.223.48/api/v2/assignment_result`);
                if (!response.ok) {
                    throw new Error("Failed to fetch assignment results");
                }
                const data = await response.json();

                // console.log("API Response:", data);

                if (!data || !Array.isArray(data.collection)) {
                    throw new Error("Invalid data structure received");
                }

                const userResults = data.collection.filter(result => result.user_id === userId);

                const resultMap = {};
                userResults.forEach(result => {
                    resultMap[result.sign_id] = result.is_correct;
                });

                setResults(resultMap);
                console.log(resultMap);
            } catch (err) {
                console.error("Error loading results:", err.message);
            }
        };

        fetchSigns();
        fetchResults();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }
    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-radikal dark:bg-gray-900 text-black dark:text-white font-radikal">
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={() => navigate(`/overzicht/${lessons || id}`)} // Gebruik de lessons ID voor de navigatie
                            className="bg-[#00705e] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
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

            <div className="p-6 max-w-4xl mx-auto">
                <div className="border-gray-400 pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {signs.map((item, index) => {
                            const isCorrect = results[item.id] === undefined ? null : results[item.id];

                            return (
                                <div key={item.id} className="flex items-center space-x-3">
                                    <span
                                        className={`w-8 h-8 flex items-center justify-center text-white font-bold rounded-md dark:bg-gray-700 ${
                                            isCorrect === 1
                                                ? "bg-green-500"
                                                : isCorrect === 0
                                                    ? "bg-red-500"
                                                    : "bg-gray-200"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <p className="text-lg font-semibold">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

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
