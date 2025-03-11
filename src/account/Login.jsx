import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Gebruikersnaam:", username);
        console.log("Wachtwoord:", password);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Inlogscherm Koptekst */}
            <h2 className="text-2xl font-semibold text-center m-6">Inlogscherm</h2>
            {/* Zwarte lijn over de hele breedte */}
            <hr className="w-full border-black mb-6"/>

            <div className="bg-white px-8 py-20 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div>
                        <label className="block text-gray-700">Gebruikersnaam</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Wachtwoord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-64 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                        >
                            Inloggen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
