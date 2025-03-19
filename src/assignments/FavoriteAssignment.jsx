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
    const [isCorrect, setIsCorrect] = useState(null); // Om te controleren of het antwoord goed is
    const [isChecked, setIsChecked] = useState(false); // Om te controleren of de gebruiker op "Controleren" heeft geklikt
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

                if (!response.ok) throw new Error(`Fout bij ophalen van de favorieten: ${response.status}`);

                const data = await response.json();
                console.log("API Response:", data);

                if (!Array.isArray(data) || data.length === 0) throw new Error("Geen geldige data ontvangen.");

                // Transformeer de data correct
                const wordsData = data.map(item => ({
                    title: item.sign.title, // Pak de titel uit het geneste object
                    video: item.sign.video, // Correcte URL naar de video
                    sign_id: item.sign.id
                }));

                const shuffledWordsData = shuffleArray(wordsData);
                console.log(shuffledWordsData)
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
        let availableWords = words.filter((word) => word !== currentAnswer);
        let randomTitles = [{ title: currentAnswer.title, video: currentAnswer.video, sign_id: currentAnswer.sign_id }];

        while (randomTitles.length < 4 && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const chosenWord = availableWords[randomIndex];

            randomTitles.push({ title: chosenWord.title, video: chosenWord.video, sign_id: chosenWord.sign_id });
            availableWords.splice(randomIndex, 1);
        }

        setShuffledOptions(shuffleArray(randomTitles));
    }, [words, currentIndex]);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setVideoUrl(words[nextIndex]?.video || "");
        setSelectedOption(null);
        setIsCorrect(null); // Reset de controle
        setIsChecked(false); // Reset de check status
    };

    const handleReturn = () => {
        navigate(-1); // Terug naar de vorige pagina
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleCheck = () => {
        if (selectedOption) {
            if (selectedOption.title === words[currentIndex]?.title) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }
            setIsChecked(true); // Zet de controle aan
        }
    };

    return (
        <section ref={assignmentRef}>
            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col items-center text-center mb-6">
                        <button
                            onClick={handleReturn}
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
                        <h1 className="text-2xl font-bold">Favoriete Opdracht {currentIndex + 1}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-backgroundColor-dark mx-auto my-12 max-w-2xl rounded-2xl p-6 shadow-lg">
                <div className="flex justify-center">
                    <video key={videoUrl} width="100%" className="p-4" controls>
                        {videoUrl && (
                            <source src={videoUrl} type="video/mp4" />
                        )}
                    </video>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectOption(option)}
                                className={`border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300
                                    ${selectedOption === option ? (isCorrect ? "bg-buttonColor-positive" : "bg-buttonColor-negative") : "bg-white"}`}
                            >
                                {option.title}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        {isChecked && (
                            <div className={`text-center ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                                {isCorrect ? "Correct!" : "Incorrect, probeer het opnieuw."}
                            </div>
                        )}
                    </div>
                    {isChecked && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="mt-6 py-2 px-6 rounded-lg text-white bg-borderColor-100 cursor-pointer"
                        >
                            Volgende
                        </button>
                    )}
                    {isChecked === false && (
                        <button
                            type="button"
                            onClick={handleCheck}
                            className="mt-6 py-2 px-6 rounded-lg text-white bg-borderColor-100 cursor-pointer"
                            disabled={!selectedOption}
                        >
                            Controleren
                        </button>
                    )}
                </form>
            </div>
        </section>
    );
}

export default FavoriteAssignment;
