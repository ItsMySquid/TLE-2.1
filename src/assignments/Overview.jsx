import { Link } from "react-router";

// Dummy data moet aangepast worden
const lessons = [
    { id: 1, title: "Les 1.1", description: "Ontdek de basisbegrippen" },
    { id: 2, title: "Les 1.2", description: "Verdiep je in kernconcepten" },
    { id: 3, title: "Les 1.3", description: "Leer praktische toepassingen" },
    { id: 4, title: "Les 1.4", description: "Verken geavanceerde onderwerpen" },
    { id: 5, title: "Les 1.5", description: "Oefen en test je kennis" },
    { id: 6, title: "Les 1.6", description: "Samenvatting en afsluiting" },
];

function Overview() {
    return (
        <div className="min-h-screen bg-gray-50 font-radikal">
            {/* Titel en tekst */}
            <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-gray-800">Lesoverzicht</h2>
                <p className="text-gray-600 mt-2 text-lg">Kies een les en start direct met leren!</p>

                {/* Streepje */}
                <div className="w-16 h-1 bg-[#008F7A] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Lesoverzicht in vakjes */}
            <main className="p-8 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-80 text-center p-6"
                        >
                            {/* Bovenste balkje */}
                            <div className="bg-[#008F7A] h-2 rounded-t-xl"></div>

                            {/* Lesinhoud */}
                            <div className="flex flex-col items-center py-4">
                                {/* Emoji */}
                                <div className="bg-[#008571] w-16 h-16 rounded-full flex items-center justify-center py-2 shadow-md">
                                    <span className="text-3xl" aria-hidden="true">📖</span>
                                    <span className="sr-only">Boek icoon</span>
                                </div>

                                <h3 className="font-semibold text-xl text-gray-800 mt-4">{lesson.title}</h3>
                                <p className="text-gray-500 text-sm mt-2">{lesson.description}</p>
                            </div>

                            <Link
                                to={`/les/${lesson.id}`}
                                className="block bg-[#008571] text-white py-3 rounded-lg shadow-md transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#00C5A5] font-semibold text-lg mt-4"
                            >
                                Start les
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Overview;
