import { Link } from "react-router"

// Dummy data moet aangepast worden
const lessons = [
    { id: 1, title: "Les 1.1", description: "Ontdek de basisbegrippen" },
    { id: 2, title: "Les 1.2", description: "Ontdek de basisbegrippen" },
    { id: 3, title: "Les 1.3", description: "Ontdek de basisbegrippen" },
    { id: 4, title: "Les 1.4", description: "Ontdek de basisbegrippen" },
    { id: 5, title: "Les 1.5", description: "Ontdek de basisbegrippen" },
    { id: 6, title: "Les 1.6", description: "Ontdek de basisbegrippen" },
]

function Overview() {
    return (
        <div className="min-h-screen bg-white-100">
            {/* Titel en tekst */}
            <div className="text-center mt-8">
                <h2 className="text-2xl font-bold">Les overzicht</h2>
                <p className="text-gray-600">Kies een les om te beginnen met je leertraject.</p>

                <div className="w-55 h-0.5 bg-black mx-auto mt-2"></div> {/* Streepje */}
            </div>

            {/* Lesoverzicht in vakje */}
            <main className="p-8 flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {lessons.map((lesson) => (
                        <div key={lesson.id} className="bg-white border rounded-lg shadow-md w-80 text-center">
                            {/* Bovenste balkje */}
                            <div className="bg-[#00C5A5] h-2 rounded-t-lg"></div>

                            {/* Lesinhoud */}
                            <div className="flex flex-col items-center p-6">
                                {/* Emoji-container met extra padding boven en onder */}
                                <div className="bg-[#BEECF4] w-16 h-16 rounded-full flex items-center justify-center py-2">
                                    <span className="pb-1 text-2xl leading-none">📖</span>
                                </div>

                                <h3 className="font-semibold text-lg mt-3">{lesson.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{lesson.description}</p>
                            </div>

                            {/* Start knop */}
                            <Link
                                to={`/les/${lesson.id}`}
                                className="block bg-[#BEECF4] text-black py-2 rounded-b-lg hover:bg-blue-200"
                            >
                                Start les
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Overview


