import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Overview() {
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("http://145.24.223.48/api/v1/categories", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                });

                const data = await response.json();
                console.log("Full API Response:", data);

                if (Array.isArray(data)) {
                    let selectedCategories = [];
                    if (id === "1") {
                        selectedCategories = data.slice(0, 4);
                    } else if (id === "2") {
                        selectedCategories = data.slice(4, 8);
                    } else if (id === "3") {
                        selectedCategories = data.slice(8, 13);
                    } else if (id === "4") {
                        selectedCategories = data.slice(13, 15);
                    } else if (id === "5") {
                        selectedCategories = data.slice(15, 20);
                    } else if (id === "6") {
                        selectedCategories = data.slice(20, 22);
                    } else if (id === "7") {
                        selectedCategories = data.slice(22, 25);
                    }
                    setCategories(selectedCategories);
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-radikal">
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={handleGoBack}
                            className="bg-[#008571] dark:bg-[#008571] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Terug
                        </button>

                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Categorieoverzicht</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                            Kies een categorie en start direct met leren!
                        </p>
                        <div className="w-16 h-1 bg-[#008571] dark:bg-[#008571] mx-auto mt-4 rounded-full"></div>
                    </div>
                </div>
            </div>

            <main className="px-4 pb-8 md:px-8 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-80 text-center p-6"
                        >
                            <div className="bg-[#008571] dark:bg-[#008571] h-2 rounded-t-xl"></div>
                            <div className="flex flex-col items-center py-3 min-h-[200px] flex-grow">
                            <div className="bg-[#008571] dark:bg-[#008571] w-16 h-16 rounded-full flex items-center justify-center py-2 shadow-md">
                                    <span className="text-3xl mb-1" aria-hidden="true">📖</span>
                                    <span className="sr-only">Boek icoon</span>
                                </div>
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mt-4">{category.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{category.description || ""}</p>
                                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                                    Aantal gebaren: {category.signs?.length || 0}
                                </p>
                            </div>
                            <Link
                                to={`/les/${category.id}`}
                                className="block bg-[#008571] text-white py-3 rounded-lg shadow-md transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#00C5A5] font-semibold text-lg mt-4"
                            >
                                Start categorie
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Overview;