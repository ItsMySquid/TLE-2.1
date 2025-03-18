import React, { useEffect, useState } from "react";

function Results() {
    const [signs, setSigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSigns = async () => {
            try {
                const response = await fetch("http://145.24.223.48/api/v1/categories/1");
                if (!response.ok) {
                    throw new Error("Failed to fetch signs");
                }
                const data = await response.json();
                setSigns(data.data.signs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSigns();
    }, []);

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Les 1</h1>

                {loading && <p className="text-center text-lg">Loading...</p>}
                {error && <p className="text-center text-lg text-red-600">Error: {error}</p>}

                {!loading && !error && (
                    <div className="border-gray-400 pt-4">
                        <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {signs.map((item, index) => (
                                <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <span className="w-8 h-8 flex items-center justify-center text-black font-bold rounded-md bg-gray-300 dark:bg-gray-700">
                                        {index + 1}
                                    </span>
                                    <p className="text-lg font-semibold">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-[#008571] dark:bg-[#008571] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
                    >

                        Maak de opdracht
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Results;