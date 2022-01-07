import { config } from './config';

const base_url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = config.NASA_API_KEY;


async function fetchData() {
    try {
        var api_response = await fetch(base_url + api_key)
            .then(response => response.json());
    }
    catch (error) {
        console.log(error);
    }

    return api_response;
}

function selectData(data) {
    var title = data.title;
    var date = data.date;
    var description = data.explanation;
    var image = data.url;

    return [title, date, description, image];
    
}

export { fetchData };
