import { useState } from "react";

function Assignment() {
    const [selectedOption, setSelectedOption] = useState("");
    const [message, setMessage] = useState("");

    // Functie die wordt aangeroepen bij het indienen van het formulier
    const handleSubmit = (event) => {
        event.preventDefault();

        // Controleer of er een keuze is gemaakt
        if (!selectedOption) {
            setMessage("Kies een optie voordat je verzendt.");
            return;
        }

        // Hier kun je het juiste antwoord vergelijken, stel A is het juiste antwoord
        const correctAnswer = "A";

        // Feedback op basis van het geselecteerde antwoord
        if (selectedOption === correctAnswer) {
            setMessage("Correct! Je hebt het juiste antwoord gekozen.");
        } else {
            setMessage("Helaas, dat is niet het juiste antwoord. Probeer het opnieuw.");
        }
    };

    // Functie om de geselecteerde optie bij te werken
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <section>
                <h1 style={{ fontSize: "1.5rem", display: "flex", justifyContent: "center", padding: "2vw", borderBottom: "#000000 solid 1px" }}>
                    Les 1.1 - Opdracht
                </h1>
                <div style={{ backgroundColor: "#E8F1F5", margin: "3vw 30vw", borderRadius: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <video width="100%" style={{ padding: "4vw 4vw 0 4vw" }} controls>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <form onSubmit={handleSubmit} method="post" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "0 4vw 4vw 4vw" }}>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {/* Optie A */}
                            <button
                                type="button"
                                onClick={() => handleOptionChange("A")}
                                style={{
                                    display: "flex", flexDirection: "row", flex: "1", backgroundColor: selectedOption === "A" ? "#D1E8E2" : "#ffffff",
                                    borderRadius: "10px", margin: "1vw 1vw 1vw 0", cursor: "pointer", padding: "1vw", border: "1px solid #ccc",
                                    transition: "background-color 0.3s"
                                }}>
                                <span>Wie</span>
                            </button>

                            {/* Optie B */}
                            <button
                                type="button"
                                onClick={() => handleOptionChange("B")}
                                style={{
                                    display: "flex", flexDirection: "row", flex: "1", backgroundColor: selectedOption === "B" ? "#D1E8E2" : "#ffffff",
                                    borderRadius: "10px", margin: "1vw 0 1vw 1vw", cursor: "pointer", padding: "1vw", border: "1px solid #ccc",
                                    transition: "background-color 0.3s"
                                }}>
                                <span>Wat</span>
                            </button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {/* Optie C */}
                            <button
                                type="button"
                                onClick={() => handleOptionChange("C")}
                                style={{
                                    display: "flex", flexDirection: "row", flex: "1", backgroundColor: selectedOption === "C" ? "#D1E8E2" : "#ffffff",
                                    borderRadius: "10px", margin: "1vw 1vw 1vw 0", cursor: "pointer", padding: "1vw", border: "1px solid #ccc",
                                    transition: "background-color 0.3s"
                                }}>
                                <span>Waar</span>
                            </button>

                            {/* Optie D */}
                            <button
                                type="button"
                                onClick={() => handleOptionChange("D")}
                                style={{
                                    display: "flex", flexDirection: "row", flex: "1", backgroundColor: selectedOption === "D" ? "#D1E8E2" : "#ffffff",
                                    borderRadius: "10px", margin: "1vw 0 1vw 1vw", cursor: "pointer", padding: "1vw", border: "1px solid #ccc",
                                    transition: "background-color 0.3s"
                                }}>
                                <span>Waarom</span>
                            </button>
                        </div>

                        {/* Submit Knop */}
                        <button
                            type="submit"
                            style={{
                                backgroundColor: selectedOption ? "#2D8474" : "#ccc",
                                color: "#ffffff",
                                padding: "1vw 3vw",
                                borderRadius: "10px",
                                marginTop: "2vw",
                                cursor: selectedOption ? "pointer" : "not-allowed"
                            }}
                            disabled={!selectedOption} // De knop is alleen actief als er een optie is geselecteerd
                        >
                            Verzenden
                        </button>
                    </form>

                    {/* Feedback bericht */}
                    {message && (
                        <p style={{
                            marginTop: "2vw",
                            fontWeight: "bold",
                            color: message.includes("Correct") ? "green" : "red"
                        }}>
                            {message}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Assignment;
