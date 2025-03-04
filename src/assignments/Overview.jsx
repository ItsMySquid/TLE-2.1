import React from "react";

const Overview = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Lesson Title */}
            <h1 className="text-2xl font-bold text-center mb-4">Les 1</h1>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-300 rounded-full h-6 mb-6">
                <div className="absolute top-0 left-0 h-6 bg-gray-100 rounded-full w-1/3"></div>
                <div className="absolute inset-0 flex justify-between px-4 text-xs font-semibold text-black">
                    <span>Categorie 1</span>
                    <span>Categorie 2</span>
                </div>
            </div>

            {/* Word List */}
            <div className="border-t border-gray-400 pt-4">
                <h2 className="text-lg font-bold mb-4">Woordenlijst - categorie 1</h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { color: "bg-red-400", text: "1" },
                        { color: "bg-green-500", text: "1" },
                        { color: "bg-green-500", text: "1" },
                        { color: "bg-red-400", text: "1" },
                        { color: "bg-green-500", text: "1" },
                        { color: "bg-green-500", text: "1" },
                        { color: "bg-red-400", text: "1" },
                        { color: "bg-red-400", text: "1" },
                        { color: "bg-green-500", text: "1" },
                        { color: "bg-green-500", text: "1" },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <span className={`w-8 h-8 flex items-center justify-center text-white font-bold rounded-md ${item.color}`}>
                                {item.text}
                            </span>
                            <p className="text-lg font-semibold">Woord</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Retry Button */}
            <div className="mt-6 flex justify-end">
                <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800">
                    Probeer opnieuw
                </button>
            </div>
        </div>
    );
};

export default Overview;
