import { config } from './config';

const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = config.NASA_API_KEY;


function fetchData() {
    try {
        fetch(base_url + api_key)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                // TODO: display data from promise 
                displayData(json);
            })
    }
    catch (error) {
        console.log(error);
    }
}

function displayData(data) {
    var title = data.title;
    var date = data.date;
    var description = data.explanation;
    var image = data.url;

    return [title, date, description, image];
    
}

export { fetchData };
