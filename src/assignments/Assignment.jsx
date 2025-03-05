import { useState, useEffect, useRef } from "react";

function Assignment() {
    const [selectedOption, setSelectedOption] = useState("");
    const [message, setMessage] = useState("");
    const assignmentRef = useRef(null);

    useEffect(() => {
        if (assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) {
            setMessage("Kies een optie voordat je verzendt.");
            return;
        }
        const correctAnswer = "A";
        if (selectedOption === correctAnswer) {
            setMessage("Correct! Je hebt het juiste antwoord gekozen.");
        } else {
            setMessage("Helaas, dat is niet het juiste antwoord. Probeer het opnieuw.");
        }
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
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col p-4">
                        <div className="grid grid-cols-2 gap-4">
                            {["A", "B", "C", "D"].map((option, index) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleOptionChange(option)}
                                    className={`bg-white border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300 ${selectedOption === option ? 'bg-green-100' : ''}`}
                                >
                                    {option === "A" ? "Wie" : option === "B" ? "Wat" : option === "C" ? "Waar" : "Waarom"}
                                </button>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className={`mt-6 py-2 px-6 rounded-lg text-white ${selectedOption ? 'bg-teal-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!selectedOption}
                        >
                            Verzenden
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 font-bold ${message.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Assignment;
