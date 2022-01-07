import { React } from 'react';
import { fetchData } from './fetch';

function App() {

    fetchData();

    return (
        <div>
            <header>
                <h1>Spacestagram</h1>
            </header>


            <main>
                <section>
                    {/* Image title */}
                    <h2>Title</h2>

                    {/* Image */}
                    <div></div>

                    {/* Description */}
                    <div></div>

                </section>
            </main>

            <footer></footer>
        </div>
    );
}

export default App;