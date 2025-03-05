import { useState } from "react";

function Word() {
    const [favoriet, setFavoriet] = useState(false);

    return (
        <>
            <section>
                <h1 style={{fontSize: "1.5rem", display: "flex", justifyContent: "center", padding: "4vw", borderBottom: "#000000 solid 1px"}}>woord van gebaar</h1>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <video width="60%" controls>
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    </video>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", width: "60%", margin: "2vw auto"}}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <button onClick={() => window.history.back()} style={{backgroundColor: "#2D8474", color: "#ffffff", padding: "1vw 3vw", borderRadius: "10px"}}>verder</button>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <button onClick={() => setFavoriet(!favoriet)} style={{color: favoriet ? "#FFD700" : "#000000", fontSize: "3rem", background: "none", border: "none", cursor: "pointer", lineHeight: "1"}}>
                            {favoriet ? "★" : "☆"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Word;