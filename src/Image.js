import React from 'react';

import { config } from './config';


function fetchFromAPI() {
    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    // Get a range of dates to get images from
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(end_date.getDate() - 10);
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
            // TODO: Style error message
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            // TODO: Style loading message
            return <div>Loading...</div>
        } else {

            // split explanation into smaller chunks of text
            // if length is greater than 100 characters, show only first 100 characters 

            return (
                // <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <ul className='columns-1 md:columns-2 lg:columns-3'>
                    {items.map(item => (
                        <li className='m-3'>
                            {/* <div className='pt-4 bg-slate-50 border border-gray-200'> */}

                            <div className='relative'>

                                <img src={item.url} alt={item.title}
                                    className='w-full object-cover'
                                />

                                <div className='flex justify-between gap-4 py-2 px-4 absolute bottom-0 left-0 text-xs w-full bg-white bg-opacity-50 font-body text-white'>
                                    <h2 className='font-body '>{item.title}</h2>
                                    <span className=''>{item.date}</span>
                                </div>

                                {/* <p>
                                    {item.explanation}
                                </p> */}
                            </div>
                            
                        </li>
                    ))}
                </ul>
            );
        }

        
    }
    
}

export default Image;