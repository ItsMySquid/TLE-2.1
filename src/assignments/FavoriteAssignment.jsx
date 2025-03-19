import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function FavoriteAssignment() {
    const navigate = useNavigate();
    const assignmentRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [message, setMessage] = useState("");
    const token = "54f3965e49e317e6b915a0b156f78ccede19910146cf4f421263e00e7de2e390";

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        async function fetchFavoriteWords() {
            try {
                const response = await fetch("http://145.24.223.48/api/v1/favorites", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });
                if (!response.ok)
                    throw new Error(`Fout bij ophalen van de favorieten: ${response.status}`);
                const data = await response.json();
                if (!data || !Array.isArray(data.data) || data.data.length === 0)
                    throw new Error("Geen geldige data ontvangen.");
                const wordsData = data.data.map(item => ({
                    title: item.sign.title,
                    video: item.sign.video,
                    sign_id: item.sign.id
                }));
                const shuffledWordsData = shuffleArray(wordsData);
                setWords(shuffledWordsData);
                setVideoUrl(shuffledWordsData[0]?.video || "");
            } catch (error) {
                console.error("Fout:", error.message);
            }
        }
        fetchFavoriteWords();
    }, []);

    useEffect(() => {
        if (words.length === 0 || currentIndex >= words.length) return;
        const currentAnswer = words[currentIndex];
        let availableWords = words.filter(word => word !== currentAnswer);
        let randomTitles = [{
            title: currentAnswer.title,
            video: currentAnswer.video,
            sign_id: currentAnswer.sign_id
        }];
        while (randomTitles.length < 4 && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const chosenWord = availableWords[randomIndex];
            randomTitles.push({
                title: chosenWord.title,
                video: chosenWord.video,
                sign_id: chosenWord.sign_id
            });
            availableWords.splice(randomIndex, 1);
        }
        const finalOptions = shuffleArray(randomTitles);
        setShuffledOptions(finalOptions);
    }, [words, currentIndex]);

    const handleNext = () => {
        if (currentIndex + 1 < words.length) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setVideoUrl(words[nextIndex]?.video || "");
            setSelectedOption(null);
            setIsCorrect(null);
            setMessage("");
        } else {
            // Als er geen volgende opdracht is, keer terug
            navigate(-1);
        }
    };

    const handleSelectOption = (option) => {
        if (isCorrect === null) {
            setSelectedOption(option);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedOption) return;
        const correct = selectedOption.title === words[currentIndex]?.title;
        setIsCorrect(correct);
        setMessage(correct ? "Correct!" : "Helaas, dat is niet het juiste antwoord.");
    };

    return (
        <section ref={assignmentRef}>
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-[#008571] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Terug
                        </button>
                        <h1 className="text-2xl font-bold my-4">Favoriete Opdracht {currentIndex + 1}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-backgroundColor-dark mx-auto my-12 max-w-2xl rounded-2xl p-6 shadow-lg">
                <div className="flex justify-center">
                    <video key={videoUrl} width="100%" className="p-4" controls>
                        {videoUrl ? (
                            <source src={videoUrl} type="video/mp4" />
                        ) : (
                            <p>Video wordt geladen...</p>
                        )}
                    </video>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectOption(option)}
                                className={` border border-black rounded-lg p-4 cursor-pointer transition duration-300
                                    ${isCorrect === null
                                    ? (selectedOption === option
                                        ? "bg-gray-300 dark:bg-gray-600 text-black dark:text-white border-white"
                                        : "border-black dark:border-white text-black dark:text-white")
                                    : (selectedOption === option
                                        ? (isCorrect
                                            ? "bg-button-positive text-white dark:text-white"
                                            : "bg-button-negative text-white dark:text-white")
                                        : "bg-white dark:bg-[#1a202c] text-black dark:text-white dark:border-white")
                                }
                                    `}
                                disabled={isCorrect !== null}
                            >
                                {option.title}
                            </button>
                        ))}
                    </div>
                    {message && (
                        <p className={`mt-4 text-lg font-semibold ${isCorrect ? "text-[#4AD996]" : "text-[#EC6265]"}`}>
                            {message}
                        </p>
                    )}

                    {isCorrect === null ? (
                        <button
                            type="submit"
                            className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? "bg-[#008571] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                            disabled={!selectedOption}
                        >
                            Checken
                        </button>
                    ) : currentIndex + 1 < words.length ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="mt-6 py-2 px-6 rounded-lg text-white bg-[#008571] cursor-pointer"
                        >
                            Volgende
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mt-6 py-2 px-6 rounded-lg text-white bg-[#008571] cursor-pointer"
                        >
                            Klaar
                        </button>
                    )}
                </form>
            </div>
        </section>
    );
}

export default FavoriteAssignment;
