import { useParams, useNavigate } from "react-router";
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
    const [wordUsage, setWordUsage] = useState({});
    const [wordCount, setWordCount] = useState({});
    const previousIndexRef = useRef(null);

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        async function fetchCategoryWords() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v1/categories/${id}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                if (!response.ok) throw new Error(`Fout bij ophalen van de opdracht: ${response.status}`);
                const data = await response.json();
                if (!data?.data?.signs) throw new Error("Geen geldige data ontvangen.");

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
        let availableWords = words.filter((word) => word !== currentAnswer);
        let randomTitles = [currentAnswer];

        let updatedUsage = { ...wordUsage };
        updatedUsage[currentAnswer.title] = (updatedUsage[currentAnswer.title] || 0) + 1;

        availableWords = availableWords.filter(word => (updatedUsage[word.title] || 0) < 4);
        while (randomTitles.length < 4 && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            randomTitles.push(availableWords[randomIndex]);
            updatedUsage[availableWords[randomIndex].title] = (updatedUsage[availableWords[randomIndex].title] || 0) + 1;
            availableWords.splice(randomIndex, 1);
        }

        setShuffledOptions(shuffleArray(randomTitles));
        setWordUsage(updatedUsage);
    }, [words, currentIndex]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) return;

        const correct = selectedOption === words[currentIndex];
        setIsCorrect(correct);
        if (!correct) setMessage("Helaas, dat is niet het juiste antwoord. Probeer het later nog eens!");
    };

    const handleNext = () => {
        let nextIndex = currentIndex + 1;
        while (nextIndex < words.length && wordCount[words[nextIndex]] >= 4) nextIndex += 1;
        if (nextIndex >= words.length) nextIndex = 0;

        setWordCount((prev) => ({
            ...prev,
            [words[nextIndex].title]: (prev[words[nextIndex].title] || 0) + 1,
        }));

        previousIndexRef.current = currentIndex;
        setCurrentIndex(nextIndex);
        setVideoUrl(words[nextIndex]?.video || "");
        setSelectedOption(null);
        setIsCorrect(null);
        setMessage("");
    };

    return (
        <section ref={assignmentRef} className="bg-gray-900 text-white min-h-screen p-4">
            <div className="max-w-6xl mx-auto text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[#008571] dark:bg-[#00705e] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0 transition duration-300"
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
                <h1 className="text-2xl font-bold my-4">Opdracht {id} - {name}</h1>
            </div>

            <div className="bg-gray-800 mx-auto my-6 max-w-2xl rounded-2xl p-6 shadow-lg">
                <div className="flex justify-center">
                    <video key={videoUrl} width="100%" className="p-4" controls>
                        {videoUrl ? <source src={videoUrl} type="video/mp4"/> : <p>Video wordt geladen...</p>}
                    </video>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedOption(option)}
                                className={`border border-gray-600 rounded-lg p-4 transition duration-300
                                    ${isCorrect === null ?
                                    selectedOption === option ? "bg-gray-700" : "bg-gray-900" :
                                    selectedOption === option ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-gray-900"}`}
                                disabled={isCorrect !== null}
                            >
                                {option.title}
                            </button>
                        ))}
                    </div>
                    {message && <p className="mt-4 text-lg text-red-400">{message}</p>}
                    {isCorrect === null ? (
                        <button type="submit" className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-blue-500' : 'bg-gray-600'}`} disabled={!selectedOption}>Checken</button>
                    ) : (
                        <button type="button" onClick={handleNext} className="mt-6 py-2 px-6 rounded-lg text-white bg-blue-500">Volgende</button>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Assignment;