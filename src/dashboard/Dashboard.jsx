import {Link} from "react-router";
import React from "react";

function Dashboard() {

    const lessen = ["Les 1","Les 2","Les 3","Les 4","Les 5","Les 6","Les 7","Les 8"]

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
                        <h2 className="text-xl mb-4 text-[#354B46]">Cursusvoortgang</h2>
                        <p>0/8</p>
                    </div>
                    <div className="h-2 flex bg-[#E8F1F5] rounded-md"></div>
                </section>
                {/* LESSEN OVERZICHT */}
                <section className="flex flex-row flex-wrap justify-evenly">
                    {lessen.map((les) =>
                        <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-2xl mb-4 text-[#354B46]">{les}</h2>
                                <h2 className="text-[#354B46]">0/20</h2>
                            </div>
                            <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                               href="#">Start les</a>
                        </article>
                    )}
                </section>

                    {/*<article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">*/}
                    {/*    <div className="flex flex-row justify-between">*/}
                    {/*        <h2 className="text-2xl mb-4 text-[#354B46]">Les 1</h2>*/}
                    {/*        <h2 className="text-[#354B46]">20/20</h2>*/}
                    {/*    </div>*/}
                    {/*    <a className="border-[#354B46] border-2 justify-center flex bg-[#E8F1F5] text-[#354B46] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"*/}
                    {/*           href="#">Opnieuw oefenen</a>*/}
                    {/*    </article>*/}
                </section>
            </>
            )
            }


            export default Dashboard;