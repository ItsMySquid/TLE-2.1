import React from "react";

function Results() {
    const words = [
        { word: "Hoe", color: "bg-red-400" },
        { word: "Hoelang", color: "bg-green-500" },
        { word: "Hoeveel", color: "bg-green-500" },
        { word: "Waarom", color: "bg-red-400" },
        { word: "Wanneer", color: "bg-green-500" },
        { word: "Wat", color: "bg-green-500" },
        { word: "Welke", color: "bg-red-400" },
        { word: "Wie", color: "bg-red-400" },
        { word: "Waar", color: "bg-green-500" },
        { word: "Algemeen vraaggebaar", color: "bg-green-500" }
    ];

    return (
        <div>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-4">Les 1</h1>

                <div className="relative w-full bg-gray-300 rounded-full h-6 mb-6 flex items-center justify-center">
                    <div className="absolute left-1/4 transform -translate-x-1/2 h-6 bg-gray-100 rounded-full w-2/5"></div>

                    <div className="absolute inset-0 flex justify-between px-16 text-xs font-semibold text-black w-full">
                        <span className="w-2/5 text-center">Categorie 1</span>
                        <span className="w-2/5 text-center">Categorie 2</span>
                    </div>
                </div>
            </div>

            <hr className="w-screen bg-black h-px border-0"/>

            <div className="p-6 max-w-4xl mx-auto">
                {/* Word List */}
                <div className="border-gray-400 pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst - Vraagwoorden</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {words.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                            <span
                                className={`w-8 h-8 flex items-center justify-center text-white font-bold rounded-md ${item.color}`}>
                                1
                            </span>
                                <p className="text-lg font-semibold">{item.word}</p>
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

export default Results;