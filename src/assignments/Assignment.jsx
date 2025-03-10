import { useState, useEffect, useRef } from "react";

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function Assignment({ id }) {
    const [videoUrl, setVideoUrl] = useState("");
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const assignmentRef = useRef(null);

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        async function fetchCategoryWords() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Fout bij ophalen van de opdracht: ${response.status}`);
                }

                const data = await response.json();

                setWords(data.title);
                setVideoUrl(data.video)
            } catch (error) {
                throw new Error(`Er is een fout opgetreden bij het ophalen van de opdracht: ${error}`);
            }
        }
        fetchCategoryWords();
    }, [id]);

    useEffect(() => {
        if (words.length === 0 || currentIndex >= words.length) return;

        const currentAnswer = words[currentIndex];

        const otherWords = words.filter((word, index) => index !== currentIndex);
        const randomTitles = shuffleArray(otherWords).slice(0, 3);

        const finalOptions = shuffleArray([currentAnswer, ...randomTitles]);
        setShuffledOptions(finalOptions);

    }, [words, currentIndex]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) return;

        setIsCorrect(selectedOption === words[currentIndex]);
    };

    const handleNext = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    };

    return (
        <>
            <section ref={assignmentRef}>
                <h1 className="text-xl flex justify-center py-4 border-b border-black">
                    Les {id} - Opdracht
                </h1>
                <div className="bg-blue-100 mx-auto my-12 max-w-2xl rounded-2xl p-6">
                    <div className="flex justify-center">
                        {videoUrl ? (
                            <video width="100%" className="p-4" controls>
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                        ) : (
                            <p>Video wordt geladen...</p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col p-4" ref={assignmentRef}>
                        <div className="grid grid-cols-2 gap-4">
                            {shuffledOptions.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedOption(option)}
                                    className={`border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300
                                    ${
                                        isCorrect === null
                                            ? selectedOption === option
                                                ? "bg-headerColor-100 text-white"
                                                : "bg-white text-black"
                                            : selectedOption === option
                                                ? isCorrect
                                                    ? "bg-green-500 text-white" // goed antwoord
                                                    : "bg-red-500 text-white"   // fout antwoord
                                                : "bg-white text-black"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {isCorrect === null ? (
                            <button
                                type="submit"
                                className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-teal-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!selectedOption}
                            >
                                Checken
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="mt-6 py-2 px-6 rounded-lg text-white bg-teal-700 cursor-pointer"
                            >
                                Volgende
                            </button>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Assignment;
