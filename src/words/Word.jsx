import {useParams} from "react-router";
import {useEffect, useState} from "react";

function Word() {
    const params = useParams()
    const id = params.id;
    const [videoUrl, setVideoUrl] = useState("");
    const [word, setWord] = useState([]);
    const [favoriet, setFavoriet] = useState(false);

    useEffect(() => {
        async function fetchWord() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/signs/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error(`Fout bij ophalen van het word: ${response.status}`);
                    return
                }

                const data = await response.json();
                console.log(data)

                setWord(data.data.title);  // Set the title directly
                setVideoUrl(data.data.video || "");  // Set the video URL if available

            } catch (error) {
                console.error(`Er is een fout opgetreden bij het ophalen van de opdracht: ${error}`);
            }
        }
        fetchWord();
    }, [id])

    return (
        <section>
            <h1 className="text-xl text-center py-4 border-b border-black">{word}</h1>
            <div className="flex justify-center w-3/5 mx-auto py-8">
                {videoUrl ? (
                    <video width="100%" controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <p className="text-center text-gray-500">Video wordt geladen...</p>
                )}
            </div>
            <div className="flex justify-between items-center w-3/5 mx-auto pt-8 pb-16">
                <div className="flex flex-col justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-teal-600 text-white py-2 px-6 rounded-lg"
                    >
                        Verder
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={() => setFavoriet(!favoriet)}
                        className={`text-4xl ${favoriet ? 'text-yellow-500' : 'text-black'} bg-none border-none cursor-pointer`}
                    >
                        {favoriet ? "★" : "☆"}
                    </button>
                </div>
            </div>
        </section>
    );
}


export default Word;