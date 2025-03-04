import {Link} from "react-router";

function Dashboard() {
    return (
        <>
            <section class="flex flex-row m-10">
                <article className="basis-1/2 rounded-md border-black border-2">
                    <h3>Les 1</h3>
                    <a>Start les</a>
                </article>
                <article className="basis-1/2">
                    <h3>Les 2</h3>
                    <a>Start les</a>
                </article>
            </section>
        </>
    )
}


export default Dashboard;