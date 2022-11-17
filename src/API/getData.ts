import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    // maxResults: '40'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const getData = async (url: string) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}

// search?part=snippet&q=music