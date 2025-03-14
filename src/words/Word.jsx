import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Word() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState("");
    const [word, setWord] = useState("");
    const [favoriet, setFavoriet] = useState(false);

    useEffect(() => {
        async function fetchWord() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/signs/${id}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                if (!response.ok) {
                    console.error(`Fout bij ophalen van het woord: ${response.status}`);
                    return;
                }

                const data = await response.json();
                console.log(data);

                setWord(data.data.title);
                setVideoUrl(data.data.video || "");
            } catch (error) {
                console.error(`Er is een fout opgetreden bij het ophalen van het woord: ${error}`);
            }
        }
        fetchWord();
    }, [id]); // ✅ Zorgt ervoor dat de data opnieuw wordt opgehaald bij verandering van id

    return (
        <section>
            <h1 className="text-xl text-center py-4 border-b border-black">{word}</h1>
            <div className="flex justify-center w-3/5 mx-auto pt-8 pb-6">
                {videoUrl ? (
                    <video key={videoUrl} width="100%" controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <p className="text-center text-gray-500">Video wordt geladen...</p>
                )}
            </div>
            <div className="flex justify-between items-center w-3/5 mx-auto pt-6 pb-12">
                {/* Terug knop */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg"
                >
                    Terug
                </button>

                {/* Favorieten knop */}
                <button
                    onClick={() => setFavoriet(!favoriet)}
                    className={`text-4xl ${favoriet ? 'text-yellow-500' : 'text-black'} bg-none border-none cursor-pointer`}
                >
                    {favoriet ? "★" : "☆"}
                </button>

                {/* Volgende knop */}
                <button
                    onClick={() => navigate(`/woord/${parseInt(id) + 1}`)}
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg"
                >
                    Volgende
                </button>
            </div>
        </section>
    );
}

export default Word;
