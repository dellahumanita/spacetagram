import { React, 
        useState, 
        useEffect } 
    from 'react';

import { config } from './config';



function App() {

    const [items, setItems] = useState([]);

    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    // Get a range of dates to get images from
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(end_date.getDate() - 2);

    // function fetchData() {
    //     var promise_responses = [];
    //     fetch(base_url + api_key + '&start_date=' + start_date.toISOString().slice(0, 10) + '&end_date=' + end_date.toISOString().slice(0, 10))
    //         .then(response => response.json())
    //         .then(
    //             (result) => {
    //                 console.log(result)
    //                 for (let i = 0; i < result.length; i++) {
    //                     // console.log(result[i])
    //                     promise_responses.push(result[i]);
    //                 }

    //                 // setItems([result]);
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         )
    //     return promise_responses;
    // }




    useEffect(() => {

        function fetchData() {
            var promise_responses = [];
            fetch(base_url + api_key + '&start_date=' + start_date.toISOString().slice(0, 10) + '&end_date=' + end_date.toISOString().slice(0, 10))
                .then(response => response.json())
                .then(
                    (result) => {
                        // console.log(result)
                        for (let i = 0; i < result.length; i++) {
                            // console.log(result[i])
                            promise_responses.push(result[i]);
                        }

                        // setItems([result]);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            return promise_responses;
        }

        var responses = fetchData();
        console.log("Responses", responses);
        // FIXME
        // Gather all responses and set items to the responses
        Promise.all(responses)
            .then((values) => {
                console.log("Values:", values);
                // setItems([res]);
            })
        // console.log("Responses:", responses);
        // for (let i = 0; i < responses.length; i++) {
        //     var promise = responses[i];
        //     // FIXME
        //     console.log(i)
        //     console.log("Promise:", promise)
        //     promise.then(data => {
        //         console.log(data)
        //         setItems([data])
        //     })
        //     // setItems([...items, promise_responses[i]]);
        // }
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