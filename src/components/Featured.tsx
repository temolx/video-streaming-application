import Row from 'react-bootstrap/Row';

import { useEffect, useState } from 'react'
import { getData } from '../API/getData';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

import loading from '../img/loadingGif.gif'
import Video from './Video';


function Featured() {

    const searchFilter = useSelector((state: RootState) => state.searchFilter);
    const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);
    const filters = useSelector((state: RootState) => state.filters);
    // const resultsAmount = useSelector((state: RootState) => state.resultsAmount) 

    const[videos, setVideos] = useState<any>();
    const[nextToken, setNextToken] = useState<string>('');
    const[isLoading, setIsLoading] = useState<boolean>(false);

    let url = `search?part=snippet&q=${searchFilter.value}&type=${filters.value}`;

    useEffect(() => {
        setVideos('');
        setIsLoading(true);

        getData(url)
            .then((res) => {
                setVideos(res.items);
                setNextToken(res.nextPageToken);
                setIsLoading(false);
                
                console.log(res);
                // console.log(videos);
            })
    }, [searchFilter, filters])


    window.onscroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (bottom) {
            setIsLoading(true);
            fetchMore();
            // window.scrollTo(0, 0)
            // console.log("bottom reached!");
        }
    }

    const fetchMore = () => {
        getData(`${url}&pageToken=${nextToken}`)
            .then((res) => {
                setVideos([...videos, ...res.items]);
                setNextToken(res.nextPageToken);
                setIsLoading(false);
                // console.log(res);
                console.log(videos);
        })
    }

  return (
    <Row className='featured' style={ sidebarStatus.value ? { 'paddingLeft': '280px', 'paddingRight': '40px' } : { 'paddingLeft': '25px', 'paddingRight': '25px' }}>
        { isLoading && <img src={loading} className='loadingGif' alt='loading spinning circle' /> }

            { videos && videos.map((video: any, index: number) => (
            <Video video={video} index={index} />
        )) }
    </Row>
  )
}

export default Featured