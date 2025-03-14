import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function Assignment() {
    const params = useParams();
    const id = params.id;
    const [videoUrl, setVideoUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false); // Nieuw: Toon foutbericht
    const assignmentRef = useRef(null);

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        async function fetchCategoryWords() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/categories/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error(`Fout bij ophalen van de opdracht: ${response.status}`);
                    return;
                }

                const data = await response.json();

                if (!data || !data.data || !Array.isArray(data.data.signs)) {
                    console.error("⚠️ Fout: `data.title` is niet beschikbaar");
                    return;
                }

                const titles = data.data.signs.map(sign => sign.title);
                const videoLinks = data.data.signs.map(sign => sign.video);

                setWords(titles);
                setVideos(videoLinks);

                setVideoUrl(videoLinks[0] || "");
            } catch (error) {
                console.error(`Er is een fout opgetreden bij het ophalen van de opdracht: ${error}`);
            }
        }

        fetchCategoryWords();
    }, [id]);

    useEffect(() => {
        if (!words || !Array.isArray(words) || words.length === 0 || currentIndex >= words.length) return;

        const currentAnswer = words[currentIndex];
        let availableWords = words.filter((word) => word !== currentAnswer);
        let randomTitles = new Set();

        while (randomTitles.size < 3 && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            randomTitles.add(availableWords[randomIndex]);
            availableWords.splice(randomIndex, 1);
        }

        const finalOptions = shuffleArray([currentAnswer, ...randomTitles]);
        setShuffledOptions(finalOptions);
    }, [words, currentIndex]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) return;

        const correct = selectedOption === words[currentIndex];
        setIsCorrect(correct);

        if (!correct) {
            setShowErrorMessage(true); // Toon foutmelding als het antwoord fout is
        }
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % videos.length;

        setCurrentIndex(nextIndex);
        setVideoUrl(videos[nextIndex]);

        setSelectedOption(null);
        setIsCorrect(null);
        setShowErrorMessage(false); // Verberg foutmelding bij verder gaan
    };

    const handleReturn = () => {
        window.location.reload(); // hier de return dat die terug gaat naar lessons
    };

    return (
        <>
            <section ref={assignmentRef}>
                <h1 className="text-xl flex justify-center py-4 border-b border-black">
                    Les {id} - Opdracht
                </h1>
                <div className="bg-backgroundColor-100 mx-auto my-12 max-w-2xl rounded-2xl p-6">
                    <div className="flex justify-center">
                        <video key={videoUrl} width="100%" className="p-4" controls>
                            {videoUrl ? (
                                <source src={videoUrl} type="video/mp4" />
                            ) : (
                                <p>Video wordt geladen...</p>
                            )}
                        </video>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col p-4" ref={assignmentRef}>
                        <div className="grid grid-cols-2 gap-4">
                            {shuffledOptions.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedOption(option)}
                                    className={`border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300
                                    ${isCorrect === null
                                        ? selectedOption === option
                                            ? "bg-headerColor-100 text-white"
                                            : "bg-white text-black"
                                        : selectedOption === option
                                            ? isCorrect
                                                ? "bg-green-500 text-white" // goed antwoord
                                                : "bg-red-500 text-white"   // fout antwoord
                                            : "bg-white text-black"
                                    }`}
                                    disabled={isCorrect !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {isCorrect === null ? (
                            <button
                                type="submit"
                                className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-borderColor-100 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!selectedOption}
                            >
                                Checken
                            </button>
                        ) : currentIndex + 1 < words.length ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="mt-6 py-2 px-6 rounded-lg text-white bg-borderColor-100 cursor-pointer"
                            >
                                Volgende
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleReturn}
                                className="mt-6 py-2 px-6 rounded-lg text-white bg-borderColor-100 cursor-pointer"
                            >
                                Klaar
                            </button>
                        )}
                    </form>

                    {/* Foutmelding als het antwoord fout is */}
                    {showErrorMessage && !isCorrect && (
                        <p className="mt-4 text-center text-red-600 font-semibold">
                            Oeps! Je antwoord was niet correct. Je kunt je fouten later opnieuw oefenen.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Assignment;
