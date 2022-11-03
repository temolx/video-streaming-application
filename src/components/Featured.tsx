import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect, useState } from 'react'
import { getData } from '../API/getData';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

import { colors } from '../colors';
import loading from '../img/loadingGif.gif'
import { hideSidebar } from '../redux/slices/SidebarSlice';


function Featured() {

    const dispatch = useDispatch();

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
                
                // console.log(res);
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
    <Row lg={12} className='featured' style={ sidebarStatus.value ? { 'paddingLeft': '280px', 'paddingRight': '40px' } : { 'paddingLeft': '25px', 'paddingRight': '25px' }}>
        <h2>{searchFilter.value !== '' ? searchFilter.value : 'Featured'} Videos</h2>
        { isLoading && <img src={loading} className='loadingGif' alt='loading spinning circle' /> }

            { videos && videos.map((video: any) => (
            <Col className='video-list d-flex justify-content-center' key={ video.id.videoId } style={{ 'paddingLeft': '0px', 'paddingRight': '10px' }} >
                <div className='wow'>
                <div className={ video.id.kind === "youtube#video" ? "video-container" : "channel-container" }>
                    <Link to={`/video/${video.id.videoId}`} state={{ channelId: video.snippet.channelId }} onClick={() => dispatch(hideSidebar())}>
                        <div className={ video.id.kind === "youtube#video" ? "thumbnail" : "channel" }>
                            <img src={video.snippet.thumbnails.medium.url} alt='thumbnail' />
                        </div>
                    </Link>

                    { video.id.kind === "youtube#video" ? 
                    <div className="video-details">
                        <h5>{ video.snippet.title.slice(0, 30) }</h5>
                        <h6>{ video.snippet.channelTitle }</h6>
                        <h6>1.8M views</h6>
                    </div> : 
                    
                    <div className="channel-details">
                        <h5>{ video.snippet.channelTitle }</h5>
                        <h6>5M subscribers</h6>
                    </div> }
                </div>

                { video.id.kind === "youtube#video" ? <div className='color-bg' style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}></div> : null }
                </div>
            </Col>
        )) }
    </Row>
  )
}

export default Featured