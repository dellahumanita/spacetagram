import React from 'react';
import { motion } from 'framer-motion';

import { config } from './config';
import LikeButton from './LikeButton';
import Loading from './Loading';

/**
 * Fetches data from the last 30 days from NASA's Picture of the Day API
 * 
 * @returns {Promise} response from fetch
 */
function fetchFromAPI() {
    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    // Get a range of dates to get images from
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(end_date.getDate() - 30);
    const date_range = '&start_date=' + start_date.toISOString().slice(0, 10) + '&end_date=' + end_date.toISOString().slice(0, 10);

    var response = fetch(base_url + api_key + date_range)
        .then(response => response.json());

    return response;
}

/**
 * Creates a ImageGrid component that displays data from the NASA API in a grid
 * 
 * @returns ImageGrid component
 */
class ImageGrid extends React.Component {
    
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
                    // Only display APOD images 
                    if (values[i].media_type === 'image') {
                        let date = new Date(values[i].date).toDateString();;
                        values[i].date = date;
                        results.push(values[i]);
                    }
                }
                results.reverse();
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
            return <div className='grid place-items-center h-screen'>
                <h1 className='text-center text-2xl'>Sorry!</h1>
                <h2 className='text-center text-xl text-gray-500'>Something went wrong. Please try again later.</h2>
            </div>;

        } else if (!isLoaded) {
            return (
                <div className='grid place-items-center h-screen'>
                    <Loading />
                </div>
            );
        } else {

            return (
                <ul className='flex flex-col w-full md:w-5/6 lg:w-1/2 m-auto'>
                    {items.map((item, index) => (
                        <li key={index} className='m-3 py-4'>
                            <motion.div 
                                className='bg-slate-50 rounded shadow-md pb-5'
                                whileHover={{scale: 1.05}}>


                                <div className='flex flex-col gap-y-2 p-3'>
                                    <div className='flex flex-row justify-between'>
                                        <h2>{item.title}</h2>
                                        <LikeButton />
                                    </div>
                                    
                                    <span className='text-gray-400'>{item.date}</span>
                                </div>

                                <a href={item.hdurl}>
                                    <img src={item.url} alt={item.title} className='w-full cursor-pointer' />
                                </a>

                                <div className='m-3'>
                                    <p className='text-sm leading-relaxed'>{item.explanation}</p>
                                </div>
 
                                
                            </motion.div>
                            
                            
                        </li>
                    ))}
                </ul>
            );
        }

        
    }
    
}

export default ImageGrid;