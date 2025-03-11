import React, { useEffect, useState } from "react";

function Overview() {
    const [words, setWords] = useState([]);
    const [randomWords, setRandomWords] = useState([]);
    const [randomCategoryId, setRandomCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch("http://145.24.223.48/api/v1/signs");
                if (!response.ok) {
                    throw new Error("Failed to fetch words");
                }

                const data = await response.json();
                const wordsList = data.data;

                // Fetch details for each word
                const detailedWords = await Promise.all(
                    wordsList.map(async (word) => {
                        const detailsResponse = await fetch(word._links.self);
                        if (!detailsResponse.ok) return null;

                        const details = await detailsResponse.json();
                        return { id: word.id, title: word.title, categoryId: details.categoryId };
                    })
                );

                // Filter out null values (failed requests)
                const validWords = detailedWords.filter(word => word !== null);

                setWords(validWords);

                if (validWords.length > 0) {
                    // Get unique category IDs
                    const uniqueCategories = [...new Set(validWords.map(word => word.categoryId))];
                    const selectedCategoryId = uniqueCategories[Math.floor(Math.random() * uniqueCategories.length)];
                    setRandomCategoryId(selectedCategoryId);

                    // Filter and shuffle words from the selected category
                    const filteredWords = validWords.filter(word => word.categoryId === selectedCategoryId);
                    const shuffledWords = filteredWords.sort(() => 0.5 - Math.random()).slice(0, 10);
                    setRandomWords(shuffledWords);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
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

                <div className="relative w-full bg-gray-300 rounded-full h-6 mb-6 flex items-center justify-center">
                    <div className="absolute left-1/4 transform -translate-x-1/2 h-6 bg-gray-100 rounded-full w-2/5"></div>

                    <div className="absolute inset-0 flex justify-between px-16 text-xs font-semibold text-black w-full">
                        <span className="w-2/5 text-center">Categorie {randomCategoryId}</span>
                    </div>
                </div>
            </div>

            <hr className="w-screen bg-black h-px border-0" />

            <div className="p-6 max-w-4xl mx-auto">
                {/* Word List */}
                <div className="border-gray-400 pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {randomWords.map((item, index) => (
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

export default Overview;