import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function Assignment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const assignmentRef = useRef(null);
    const [message, setMessage] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [words, setWords] = useState([]);
    const [name, setName] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        async function fetchCategoryWords() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/categories/${id}`);
                if (!response.ok) throw new Error("Fout bij ophalen van de opdracht");
                const data = await response.json();
                const wordsData = data.data.signs.map(sign => ({ title: sign.title, video: sign.video }));
                setWords(shuffleArray(wordsData));
                setName(data.data.name);
                setVideoUrl(wordsData[0]?.video || "");
            } catch (error) {
                console.error("Fout:", error.message);
            }
        }
        fetchCategoryWords();
    }, [id]);

    useEffect(() => {
        if (words.length === 0 || currentIndex >= words.length) return;
        const currentAnswer = words[currentIndex];
        let options = shuffleArray([...words.filter(word => word !== currentAnswer).slice(0, 3), currentAnswer]);
        setShuffledOptions(options);
    }, [words, currentIndex]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) return;
        setIsCorrect(selectedOption === words[currentIndex]);
        if (selectedOption !== words[currentIndex]) {
            setMessage("Helaas, dat is niet het juiste antwoord. Probeer het later nog eens!");
        }
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev + 1);
        setVideoUrl(words[currentIndex + 1]?.video || "");
        setSelectedOption(null);
        setIsCorrect(null);
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-radikal">
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button onClick={() => navigate(-1)} className="bg-[#008571] dark:bg-[#00705e] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Terug
                        </button>
                        <h1 className="text-2xl font-bold">Opdracht {id} - {name}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 mx-auto my-12 max-w-2xl rounded-2xl p-6 shadow-lg">
                <div className="flex justify-center">
                    <video key={videoUrl} width="100%" className="p-4" controls>
                        {videoUrl ? <source src={videoUrl} type="video/mp4" /> : <p>Video wordt geladen...</p>}
                    </video>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedOption(option)}
                                className={`border border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer transition duration-300 ${isCorrect === null ? (selectedOption === option ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white") : (selectedOption === option ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-white dark:bg-gray-800 text-black dark:text-white")}`}
                                disabled={isCorrect !== null}
                            >
                                {option.title}
                            </button>
                        ))}
                    </div>
                    {message && <p className="mt-4 text-lg font-semibold text-red-500">{message}</p>}
                    {isCorrect === null ? (
                        <button type="submit" className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-[#008571] dark:bg-[#00705e] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!selectedOption}>
                            Checken
                        </button>
                    ) : currentIndex + 1 < words.length ? (
                        <button type="button" onClick={handleNext} className="mt-6 py-2 px-6 rounded-lg text-white bg-[#008571] dark:bg-[#00705e] cursor-pointer">
                            Volgende
                        </button>
                    ) : (
                        <button type="button" onClick={() => navigate("/Resultaten")} className="mt-6 py-2 px-6 rounded-lg text-white bg-[#008571] dark:bg-[#00705e] cursor-pointer">
                            Klaar
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Assignment;
