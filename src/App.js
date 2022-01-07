import { React, 
        useState, 
        useEffect } 
    from 'react';
import { config } from './config';



function App() {

    const [items, setItems] = useState([]);

    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    useEffect(() => {
        fetch(base_url + api_key)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    setItems([result]);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])


    return (
        <div>
            <header>
                <h1>Spacestagram</h1>
            </header>

            <main>
                {items.map((item, index) => (
                    <div key={index}>

                        <h2>{item.title}</h2>

                        <img src={item.url} alt={item.title} />
                        <p>
                            {item.date} <br/>
                            {item.explanation}
                        </p>

                    </div>
                ))}
            </main>

            <footer></footer>
        </div>
    );
}

export default App;