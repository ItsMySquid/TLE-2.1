import React, { useEffect, useState } from "react";

function Lesson() {
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

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-4">Les 1</h1>
            </div>

            <hr className="w-screen bg-black h-px border-0" />

            <div className="p-6 max-w-4xl mx-auto">
                {/* Word List */}
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
                    <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800">
                        Maak de opdracht
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Lesson;