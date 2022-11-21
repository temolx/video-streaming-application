import { FC, useEffect, useState } from 'react'
import { getData } from '../API/getData';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const History: FC = () => {

    const historyItems = useSelector((state: RootState) => state.history);

    const[historyVideos, setHistoryVideos] = useState<any>([]);

    useEffect(() => {
        historyItems.value.map((historyItem) => {
            getData(`videos?part=contentDetails,snippet,statistics&id=${historyItem}&maxResults=40`)
            .then((res) => {
                setHistoryVideos([...historyVideos, res.items[0]]);
                console.log(historyVideos);
            }).catch((err) => {
                console.log(err);
            })
        })   
    }, [historyItems])

  return (
    <div className='history'>
        { historyVideos && historyVideos.map((historyVideo: any) => (
            <div className='watchedList'>
                <h1>{ historyVideo.snippet.title }</h1>
            </div>
        )) }
    </div>
  )
}

export default History