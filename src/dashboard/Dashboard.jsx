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
                console.log('Full API Response:', data);

                if (Array.isArray(data)) {
                    setLessons(data);
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
    const progressBarWidth = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

    return (
        <section className="m-[5vw] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            {/* CURSUSVOORTGANG */}
            <section className="m-12">
                <div className="flex justify-between">
                    <h2 className="text-2xl mb-4">Cursusvoortgang</h2>
                    <p className="text-lg">{completedCount}/{lessons.length}</p>
                </div>
                <div className="h-2 flex bg-gray-200 dark:bg-gray-700 rounded-md">
                    <div
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-md"
                        style={{ width: `${progressBarWidth}%` }}
                    ></div>
                </div>
            </section>

            {/* LESSEN OVERZICHT */}
            <section className="flex flex-row flex-wrap justify-evenly">
                {lessons.map((lesson) => (
                    <article
                        className="w-[40vw] rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg p-6 m-3 transition duration-300"
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
                                    ? "bg-white dark:bg-gray-700 text-blue-500 dark:text-blue-400"
                                    : "bg-[#008571] dark:bg-[#00705e] text-white"
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
