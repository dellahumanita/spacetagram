import React from 'react';
import ReactLoading from 'react-loading';

/**
 * Loading animation that runs while the data is being fetched from the NASA API
 * 
 * @returns Loading component
 */
const Loading = () => (
    <ReactLoading type='spin' color='#A1A1AA' height={'10%'} width={'10%'} />
)

export default Loading;