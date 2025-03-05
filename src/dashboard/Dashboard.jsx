import {Link} from "react-router";

function Dashboard() {

    return (
        <>
            <section className="m-8">
                {/*ZOEKBALK --> to be added because it already exists just not on this page */}

                {/* CURSUSVOORTGANG */}
                <section className="m-12">
                    <div className="flex justify-between">
                        <h2 className="text-xl mb-4 text-[#354B46]">Cursusvoortgang</h2>
                        <p>0/8</p>
                    </div>
                    <div className="h-2 flex bg-[#E8F1F5] rounded-md"></div>
                </section>
                {/* LESSEN OVERZICHT */}
                <section className="flex flex-row flex-wrap justify-evenly">
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl mb-4 text-[#354B46] font-bold">Les 1</h2>
                            <h2 className="text-2xl mb-4 text-[#354B46]">Introductie tot gebarentaal</h2>
                        </div>
                        <a className="border-[#354B46] border-2 justify-center flex bg-[#E8F1F5] text-[#354B46] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Opnieuw oefenen</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 2</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 3</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 4</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 5</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 6</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 7</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                    <article className="basis-[43vw] rounded-md border-[#354B46] border-2 p-4 m-4">
                        <h2 className="text-2xl mb-4 text-[#354B46]">Les 8</h2>
                        <a className="justify-center flex bg-[#354B46] text-[#E8F1F5] px-4 py-2 rounded-md hover:bg-[#2D8474] transition duration-200 ease-in-out"
                           href="#">Start les</a>
                    </article>
                </section>
            </section>
        </>
    )
}


export default Dashboard;