import {Link} from "react-router";
import React from "react";

function Dashboard() {

    const lessen = [
        { name: "Les 1", completed: 2 },
        { name: "Les 2", completed: 14 },
        { name: "Les 3", completed: 18 },
        { name: "Les 4", completed: 8 },
        { name: "Les 5", completed: 0 },
        { name: "Les 6", completed: 7 },
        { name: "Les 7", completed: 20 },
        { name: "Les 8", completed: 12 }
    ];

    const completedCount = lessen.filter(les => les.completed === 20).length;
    const progressBarWidth = (completedCount / lessen.length) * 100;

    return (

        <>
            <section className="m-8">
                {/* CURSUSVOORTGANG & ZOEKBALK */}
                <section className="m-12">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Zoeken"
                            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-xl mb-4 text-tekstColor-100">Cursusvoortgang</h2>
                        <p className="text-tekstColor-100">0/8</p>
                    </div>
                    <div className="h-2 flex bg-backgroundColor-100 rounded-md"></div>
                </section>
                {/* LESSEN OVERZICHT */}
                <section className="flex flex-row flex-wrap justify-evenly">
                    {lessen.map((les) =>
                        <article className="basis-[43vw] rounded-md border-tekstColor-100 border-2 p-4 m-4">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-2xl mb-4 text-tekstColor-100">{les.name}</h2>
                                <h2 className="text-tekstColor-100">{les.completed}/20</h2>
                            </div>
                            <a
                                className={`border-2 border-tekstColor-100 justify-center flex bg-tekstColor-100 text-backgroundColor-100 px-4 py-2 rounded-md hover:bg-borderColor-100 transition duration-200 ease-in-out ${
                                    les.completed === 20 ? "bg-buttonColor-100 text-tekstColor-100" : ""
                                }`}
                                href={les.name}
                            >
                                {les.completed === 20 ? "Opnieuw oefenen" : "Start les"}
                            </a>
                        </article>
                    )}
                </section>

                {/*<article className="basis-[43vw] rounded-md border-tekstcolor-100 border-2 p-4 m-4">*/}
                {/*    <div className="flex flex-row justify-between">*/}
                {/*        <h2 className="text-2xl mb-4 text-tekstcolor-100">Les 1</h2>*/}
                {/*        <h2 className="text-tekstcolor-100">20/20</h2>*/}
                    {/*    </div>*/}
                    {/*    <a className="border-tekstcolor-100 border-2 justify-center flex bg-backgroundColor-100 text-tekstcolor-100 px-4 py-2 rounded-md hover:bg-bordercolor-100 transition duration-200 ease-in-out"*/}
                    {/*           href="#">Opnieuw oefenen</a>*/}
                    {/*    </article>*/}
                </section>
            </>
            )
            }


            export default Dashboard;