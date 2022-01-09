import React from 'react';

import { config } from './config';


function fetchFromAPI() {
    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    // Get a range of dates to get images from
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(end_date.getDate() - 2);
    const date_range = '&start_date=' + start_date.toISOString().slice(0, 10) + '&end_date=' + end_date.toISOString().slice(0, 10);

    var response = fetch(base_url + api_key + date_range)
        .then(response => response.json());

    console.log(response)

    return response;
}


class Image extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

    }

    componentDidMount() {

        var results = [];

        fetchFromAPI()
            .then((values) => {
                for (let i=0; i < values.length; i++) {
                    results.push(values[i]);
                }
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );

    }

    render() {

        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li>
                            <h2>{item.title}</h2>
                            {item.date}
                            <br />
                            <img src={item.url} alt={item.title} />
                            <p>
                                {item.explanation}
                            </p>
                        </li>
                    ))}
                </ul>
            );
        }

        
    }
    
}

export default Image;