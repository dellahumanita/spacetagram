import React from 'react';
import { motion } from 'framer-motion';

import { config } from './config';
import LikeButton from './LikeButton';
import Loading from './Loading';


function fetchFromAPI() {
    const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
    const api_key = config.NASA_API_KEY;

    // Get a range of dates to get images from
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(end_date.getDate() - 20);
    const date_range = '&start_date=' + start_date.toISOString().slice(0, 10) + '&end_date=' + end_date.toISOString().slice(0, 10);

    var response = fetch(base_url + api_key + date_range)
        .then(response => response.json());

    console.log(response)

    return response;
}


class ImageGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.showCard = this.showCard.bind(this);
        this.hideCard = this.hideCard.bind(this);

    }

    showCard() {
        this.setState({show: true })
    };

    hideCard() {
        this.setState({show: false })
    };

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
            return (
                <div className='grid place-items-center h-screen'>
                    <Loading />
                </div>
            );
        } else {

            return (
                <ul className='flex flex-col w-11/12 md:w-5/6 lg:w-1/2 m-auto'>
                    {items.map(item => (
                        <li className='m-3 py-4'>
                            <motion.div 
                                className='bg-slate-50 rounded shadow-md pb-5'
                                whileHover={{scale: 1.05}}
                                onClick={this.showCard}>


                                <div className='flex flex-col gap-y-2 p-3'>
                                    <div className='flex flex-row justify-between'>
                                        <h2 className='font-semibold'>{item.title}</h2>
                                        <LikeButton />
                                    </div>
                                    
                                    <span className='text-gray-400'>{item.date}</span>
                                </div>

                                <img src={item.url} alt={item.title} className='w-full'/>

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