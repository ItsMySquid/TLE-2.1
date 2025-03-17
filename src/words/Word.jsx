import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
    }, [id]);

    return (
        <section>
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={() => navigate("/Woordenboek")}
                            className="bg-headerColor-100 text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Terug
                        </button>
                        <h1 className="text-2xl font-bold">{word}</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-1/2 mx-auto pt-8 pb-6">
                {videoUrl ? (
                    <video key={videoUrl} width="100%" controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <p className="text-center text-gray-500">Video wordt geladen...</p>
                )}
            </div>
            <div className="flex justify-between items-center w-1/2 mx-auto pt-6 pb-12">
                {/* Terug knop */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-borderColor-100 text-white py-2 px-6 rounded-lg"
                >
                    Vorige
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
                    className="bg-borderColor-100 text-white py-2 px-6 rounded-lg"
                >
                    Volgende
                </button>
            </div>
        </section>
    );
}

export default Word;
