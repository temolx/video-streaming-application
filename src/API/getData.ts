import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': '62eb678207msheefc22d93afff7ap108851jsn107a6f7b7926',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const getData = async (url: string) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}

// search?part=snippet&q=music