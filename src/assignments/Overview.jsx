import React from "react";

function Overview() {
    const words = [
        { title: "Hoe", categoryId: 1 },
        { title: "Hoelang", categoryId: 1 },
        { title: "Hoeveel", categoryId: 1 },
        { title: "Waarom", categoryId: 1 },
        { title: "Wanneer", categoryId: 1 },
        { title: "Wat", categoryId: 1 },
        { title: "Welke", categoryId: 1 },
        { title: "Wie", categoryId: 1 },
        { title: "Waar", categoryId: 1 },
        { title: "Algemeen vraaggebaar", categoryId: 1 },
        { title: "Horen", categoryId: 5 },
        { title: "Zien", categoryId: 5 },
        { title: "Voelen", categoryId: 5 },
        { title: "Ruiken", categoryId: 5 },
        { title: "Proeven", categoryId: 5 },
        { title: "Denken", categoryId: 5 },
        { title: "Leren", categoryId: 5 },
        { title: "Lezen", categoryId: 5 },
        { title: "Schrijven", categoryId: 5 },
        { title: "Spreken", categoryId: 5 }
    ];

    const uniqueCategories = [...new Set(words.map(word => word.categoryId))];
    const randomCategoryId = uniqueCategories[Math.floor(Math.random() * uniqueCategories.length)];

    const filteredWords = words.filter(word => word.categoryId === randomCategoryId);
    const randomWords = filteredWords.sort(() => 0.5 - Math.random()).slice(0, 10);

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

            <hr className="w-screen bg-black h-px border-0"/>

            <div className="p-6 max-w-4xl mx-auto">
                {/* Word List */}
                <div className="border-gray-400 pt-4">
                    <h2 className="text-lg font-bold mb-4">Woordenlijst</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {randomWords.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <span
                                    className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-md bg-gray-200">
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
