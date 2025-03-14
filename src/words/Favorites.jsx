import React from "react";

function Favorites() {
    const favoriteWords = [
        "Hoe", "Hoelang", "Hoeveel", "Waarom", "Wanneer", "Antwoorden", "Doen", "Geven", "Jammer", "Opgelucht"
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Mijn favorieten</h1>
            <p className="text-gray-600 mb-4">Bekijk en beheer je favoriete video's</p>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Zoeken"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Favorite Items Grid */}
            <div className="grid grid-cols-4 gap-4">
                {favoriteWords.map((word, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-md flex flex-col items-center relative">
                        <p className="text-lg font-semibold">{word}</p>
                        <span className="absolute top-2 right-2 text-yellow-500 text-xl">⭐</span>
                        <div className="mt-4 flex gap-2">
                            <button className="bg-blue-300 px-4 py-1 rounded-full w-20 text-center">Thema</button>
                            <button className="bg-blue-300 px-4 py-1 rounded-full w-20 text-center">Les</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
