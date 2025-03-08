import { useState, useEffect, useRef } from "react";
// een [] met alle opties uit de les catagorie waar je dan met de next button zo het lijste af gaat met je antwoord geven en opslaan

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function Assignment() {
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const assignmentRef = useRef(null);

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        const options = ["A", "B", "C", "D"];
        setShuffledOptions(shuffleArray(options));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) return;

        const correctAnswer = "A"; // goede antwoord van video uit API
        setIsCorrect(selectedOption === correctAnswer);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <section ref={assignmentRef}>
                <h1 className="text-xl flex justify-center py-4 border-b border-black">
                    Les 1.1 - Opdracht
                </h1>
                <div className="bg-blue-100 mx-auto my-12 max-w-2xl rounded-2xl p-6">
                    <div className="flex justify-center">
                        <video width="100%" className="p-4" controls>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" /* video uit de API */ />
                        </video>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col p-4" ref={assignmentRef}>
                        <div className="grid grid-cols-2 gap-4">
                            {shuffledOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleOptionChange(option)}
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
                                    {option === "A" ? "Wie" : option === "B" ? "Wat" : option === "C" ? "Waar" :  "Waarom"}
                                </button> //option zijn kuezes uit de api
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
                                onClick={() => window.location.reload()} //naar volgende uit de []
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
