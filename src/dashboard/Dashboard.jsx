import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    const [lessons, setLessons] = useState([]);
    const [userCompletedSigns, setUserCompletedSigns] = useState({});

    useEffect(() => {
        async function fetchLessons() {
            try {
                const response = await fetch('http://145.24.223.48/api/v2/lessons', {
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

        async function fetchAssignments() {
            try {
                const response = await fetch('http://145.24.223.48/api/v2/assignments', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('Assignments Data:', data);

                if (Array.isArray(data.collection)) {
                    const assignmentsMapping = data.collection.reduce((acc, assignment) => {
                        if (assignment.lesson_id) {
                            acc[assignment.id] = assignment.lesson_id;
                        }
                        return acc;
                    }, {});
                    console.log('Assignments Mapping:', assignmentsMapping);
                    return assignmentsMapping;
                } else {
                    console.error('Unexpected API response format:', data);
                    return {};
                }

            } catch (error) {
                console.error('Error fetching assignments:', error);
                return {};
            }
        }

        async function fetchUserCompletedSigns(assignmentsMapping) {
            try {
                const response = await fetch('http://145.24.223.48/api/v2/assignment_result', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('User Completed Signs Data:', data);

                if (Array.isArray(data.collection)) {
                    const completedSigns = data.collection.reduce((acc, sign) => {
                        if (sign.is_correct) {
                            const lessonId = assignmentsMapping[sign.assignment_id];
                            if (lessonId) {
                                if (!acc[lessonId]) {
                                    acc[lessonId] = 0;
                                }
                                acc[lessonId]++;
                            }
                        }
                        return acc;
                    }, {});
                    console.log('Completed Signs:', completedSigns);
                    setUserCompletedSigns(completedSigns);
                } else {
                    console.error('Unexpected API response format:', data);
                }

            } catch (error) {
                console.error('Error fetching user completed signs:', error);
            }
        }

        async function fetchData() {
            await fetchLessons();
            const assignmentsMapping = await fetchAssignments();
            await fetchUserCompletedSigns(assignmentsMapping);
        }

        fetchData();
    }, []);

    const completedCount = lessons.filter(lesson => userCompletedSigns[lesson.id] === lesson.total_signs).length;
    const progressBarWidth = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

    return (
        <section className="m-[5vw] text-gray-900 dark:text-white min-h-screen">
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
                                {userCompletedSigns[lesson.id] === lesson.total_signs && <span className="mr-1">✔</span>}
                                <h2>{userCompletedSigns[lesson.id] || 0}/{lesson.total_signs}</h2>
                            </div>
                        </div>
                        <Link
                            to={`/overzicht/${lesson.id}`}
                            className={`flex justify-center items-center border-2 text-lg px-6 py-3 rounded-md transition duration-200 ease-in-out ${
                                userCompletedSigns[lesson.id] === lesson.total_signs
                                    ? "bg-white dark:bg-gray-700 text-blue-500 dark:text-blue-400"
                                    : "bg-[#008571] dark:bg-[#00705e] text-white"
                            }`}
                        >
                            {userCompletedSigns[lesson.id] === lesson.total_signs ? "Opnieuw oefenen" : "Start les"}
                        </Link>
                    </article>
                ))}
            </section>
        </section>
    );
}

export default Dashboard;