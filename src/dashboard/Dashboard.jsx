import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router";

function Dashboard() {
    const [lessons, setLessons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLessons() {
            try {
                const response = await fetch('http://145.24.223.48/api/v1/lessons', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('Full API Response:', data); // ✅ Check de exacte API structuur

                if (Array.isArray(data)) {
                    setLessons(data); // ✅ Direct de array opslaan
                } else {
                    console.error('Unexpected API response format:', data);
                }

            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        }
        fetchLessons();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/woordenboek?search=${searchQuery}`);
    };

    const completedCount = lessons.filter(lesson => lesson.completed === 20).length;
    const progressBarWidth = (completedCount / lessons.length) * 100;

    return (
        <>
            <section className="m-[5vw]">
                {/* CURSUSVOORTGANG & ZOEKBALK */}
                <section className="m-12">
                    <div className="mb-6 flex justify-center">
                        <form onSubmit={handleSearch} className="w-[40vw]">
                            <input
                                type="text"
                                placeholder="Zoeken"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 border border-tekstColor-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </form>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-2xl mb-4 text-tekstColor-100">Cursusvoortgang</h2>
                        <p className="text-tekstColor-100 text-lg">{completedCount}/{lessons.length}</p>
                    </div>
                    <div className="h-2 flex bg-backgroundColor-100 rounded-md">
                        <div
                            className="h-full bg-tekstColor-100 rounded-md"
                            style={{width: `${progressBarWidth}%`}}
                        ></div>
                    </div>
                </section>

                {/* LESSEN OVERZICHT */}
                <section className="flex flex-row flex-wrap justify-evenly">
                    {lessons.map((lesson) =>
                        <article className="w-[40vw] rounded-md border-tekstColor-100 border-2 p-6 m-3" key={lesson.id}>
                            <div className="flex flex-row justify-between">
                                <h2 className="text-2xl mb-4 text-tekstColor-100 font-semibold">{lesson.name}</h2>
                                <div className="flex flex-row">
                                    {lesson.completed === 20 && <span className="mr-1">✔</span>}
                                    <h2 className="text-tekstColor-100">{lesson.assignments.length}/{lesson.assignments.length}</h2>
                                </div>
                            </div>
                            <Link
                                className={`border-2 border-tekstColor-100 justify-center flex bg-tekstColor-100 text-backgroundColor-100 text-lg px-4 py-3 rounded-md hover:bg-borderColor-100 transition duration-200 ease-in-out ${
                                    lesson.completed === 20 ? "bg-white text-tekstColor-100" : ""
                                }`}
                                to="overzicht"
                            >
                                {lesson.completed === 20 ? "Opnieuw oefenen" : "Start les"}
                            </Link>
                        </article>
                    )}
                </section>
            </section>

            {/* LESSEN OVERZICHT */}
            <section className="flex flex-row flex-wrap justify-evenly">
                {lessons.map((lesson) => (
                    <article
                        className="w-[40vw] rounded-md border-2 border-gray-300 shadow-lg p-6 m-3"
                        key={lesson.id}
                    >
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl mb-4 font-semibold">{lesson.name}</h2>
                            <div className="flex flex-row">
                                {lesson.completed === 20 && <span className="mr-1">✔</span>}
                                <h2>{lesson.assignments.length}/{lesson.assignments.length}</h2>
                            </div>
                        </div>
                        <Link
                            to={`/overzicht/${lesson.id}`}
                            className={`flex justify-center items-center border-2 text-lg px-6 py-3 rounded-md transition duration-200 ease-in-out ${
                                lesson.completed === 20
                                    ? "bg-white text-blue-500"
                                    : "bg-headerColor-100 text-white"
                            }`}
                        >
                            {lesson.completed === 20 ? "Opnieuw oefenen" : "Start les"}
                        </Link>
                    </article>
                ))}
            </section>
        </section>
    );


}

export default Dashboard;
