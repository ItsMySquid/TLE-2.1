import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    const [lessons, setLessons] = useState([]);

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


    const completedCount = lessons.filter(lesson => lesson.completed === 20).length;
    const progressBarWidth = (completedCount / lessons.length) * 100;

    return (
        <section className="m-[5vw] text-black">
            {/* CURSUSVOORTGANG */}
            <section className="m-12">
                <div className="flex justify-between">
                    <h2 className="text-2xl mb-4">Cursusvoortgang</h2>
                    <p className="text-lg">{completedCount}/{lessons.length}</p>
                </div>
                <div className="h-2 flex bg-gray-200 rounded-md">
                    <div
                        className="h-full bg-blue-500 rounded-md"
                        style={{ width: `${progressBarWidth}%` }}
                    ></div>
                </div>
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
                            to={`/overzicht`}
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
