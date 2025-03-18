import {useParams, useNavigate} from "react-router"
import React, { useState, useEffect, useRef } from "react";

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function Assignment() {
    const { id } = useParams()
    const navigate = useNavigate();
    const assignmentRef = useRef(null);
    const [message, setMessage] = useState(null)

    const [videoUrl, setVideoUrl] = useState("");
    const [words, setWords] = useState([]);
    const [name, setName] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [wordUsage, setWordUsage] = useState({});
    const [wordCount, setWordCount] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        async function fetchCategoryWords() {
            try {
                const response = await fetch(`http://145.24.223.48/api/v2/categories/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) throw new Error(`Fout bij ophalen van de opdracht: ${response.status}`);

                const data = await response.json();
                console.log("API Response:", data);

                if (!data?.data?.signs) throw new Error("Geen geldige data ontvangen.");

                const wordsData = data.data.signs.map(sign => ({
                    title: sign.title,
                    video: sign.video,
                    sign_id: sign.id
                }));
                const nameCategorie = data.data.name;
                const shuffledWordsData = shuffleArray(wordsData);

                setWords(shuffledWordsData);
                setName(nameCategorie)
                setVideoUrl(shuffledWordsData[0]?.video || "");
            } catch (error) {
                console.error("Fout:", error.message);
            }
        }
        fetchCategoryWords();
    }, [id]);

    async function postResult(isCorrect, selectedSignId) {
        try {
            const response = await fetch(`http://145.24.223.48/api/v2/assignment_result`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    sign_id: selectedSignId,
                    is_correct: isCorrect
                }),
            });
            if (!response.ok) throw new Error(`Fout bij ophalen van de opdracht: ${response.status}`);
            console.log("Resultaat opgeslagen:", await response.json());
        } catch (error) {
            console.error("Fout bij het opslaan van het resultaat:", error.message);
        }
    }

    useEffect(() => {
        if (words.length === 0 || currentIndex >= words.length) return;

        const currentAnswer = words[currentIndex];
        let availableWords = words.filter((word) => word !== currentAnswer);
        let randomTitles = [{ title: currentAnswer.title, video: currentAnswer.video, sign_id: currentAnswer.sign_id }];

        let updatedUsage = { ...wordUsage };
        updatedUsage[currentAnswer.title] = (updatedUsage[currentAnswer.title] || 0) + 1;

        availableWords = availableWords.filter(word => (updatedUsage[word.title] || 0) < 4);

        while (randomTitles.length < 4 && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const chosenWord = availableWords[randomIndex];

            randomTitles.push({ title: chosenWord.title, video: chosenWord.video, sign_id: chosenWord.sign_id });
            updatedUsage[chosenWord.title] = (updatedUsage[chosenWord.title] || 0) + 1;

            availableWords.splice(randomIndex, 1);
        }

        if (randomTitles.length < 4) {
            const remainingWords = words.filter((word) => !randomTitles.includes(word));
            remainingWords.forEach(word => {
                if (randomTitles.length < 4) {
                    randomTitles.push(word);
                }
            });
        }

        const finalOptions = shuffleArray(randomTitles);
        setShuffledOptions(finalOptions);
        setWordUsage(updatedUsage);

        console.log('Shuffled Options:', finalOptions);  // Debugging om te zien wat er wordt gegenereerd

    }, [words, currentIndex]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedOption) return;

        const isCorrect = selectedOption.title === words[currentIndex].title;
        setIsCorrect(isCorrect);

        if (!isCorrect) {
            setMessage(`Helaas, dat is niet het juiste antwoord. Probeer het later nog eens!`)
        }

        const selectedSignId = words[currentIndex].sign_id;
        if (selectedSignId) {
            // console.log(selectedSignId, isCorrect)
            await postResult(isCorrect, selectedSignId);
        } else {
            console.error("Kan resultaat niet opslaan: sign_id ontbreekt voor geselecteerd antwoord", selectedOption);
        }
    };

    const handleNext = () => {
        let nextIndex = currentIndex + 1;

        while (nextIndex < words.length && wordCount[words[nextIndex]] >= 4) {
            nextIndex += 1;
        }

        if (nextIndex >= words.length) {
            nextIndex = 0;
        }

        setWordCount((prev) => ({
            ...prev,
            [words[nextIndex].title]: (prev[words[nextIndex].title] || 0) + 1,
        }));

        setCurrentIndex(nextIndex);
        setVideoUrl(words[nextIndex]?.video || "");

        setSelectedOption(null);
        setIsCorrect(null);
        setMessage("");
    };

    const handleReturn = () => {
        navigate(`/les/${id}`);
    };

    return (
        <>
            <section ref={assignmentRef}>
                <div className="p-4 md:p-8 flex flex-col items-center">
                    <div className="max-w-6xl w-full">
                        <div className="flex flex-col items-center text-center mb-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-[#008571] text-white px-4 py-2 rounded-md shadow-md flex items-center self-start ml-0"
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
                            <h1 className="text-2xl font-bold">Opdracht {id} - {name}</h1>
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
                                                ? "bg-backgroundColor-moreDark text-white"
                                                : "bg-white text-black"
                                            : selectedOption === option
                                                ? isCorrect
                                                    ? "bg-buttonColor-positive text-black" // goed antwoord
                                                    : "bg-buttonColor-negative text-black"   // fout antwoord
                                                : "bg-white text-black"
                                    }`}
                                    disabled={isCorrect !== null}
                                >
                                    {option.title}
                                </button>
                            ))}
                        </div>
                        <div>
                            {message && (
                                <p className="mt-4 text-lg font-semibold text-buttonColor-negative">
                                    {message}
                                </p>
                            )}
                        </div>
                        {isCorrect === null ? (
                            <button
                                type="submit"
                                className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-[#008571] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
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
                </div>
            </section>
        </>
    );
}

export default Assignment;