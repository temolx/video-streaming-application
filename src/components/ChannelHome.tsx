import { FC, useEffect, useState } from 'react'
import { getData } from '../API/getData'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import { hideSidebar } from '../redux/slices/SidebarSlice';
import { useDispatch } from 'react-redux';
import Video from './Video';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import loading from '../img/loadingGif.gif'

type IProps = {
    videoID: string
}

const ChannelHome: FC<IProps> = ({ videoID }) => {

    const dispatch = useDispatch();

    const[homeVideo, setHomeVideo] = useState<any>();
    const[homeUploads, setHomeUploads] = useState<any>();

    const[nextToken, setNextToken] = useState<string>('');
    const[prevToken, setPrevToken] = useState<string>('');

    let uploadsURL = `search?part=snippet,id&channelId=${homeVideo?.snippet?.channelId}&order=date&type=video&maxResults=6`;


    useEffect(() => {
        getData(`videos?part=contentDetails,snippet,statistics&id=${videoID}&maxResults=40`)
            .then((res) => {
                setHomeVideo(res.items[0]);
            }).catch((err) => {
                console.log(err);
            })
        
            fetchHomeUploads();
    }, [homeVideo, homeUploads])

    
    const fetchHomeUploads = () => {
        getData(nextToken === '' ? uploadsURL : `${uploadsURL}&pageToken=${nextToken}`)
            .then((res) => {
                setHomeUploads(res);
                setNextToken(res.nextPageToken);
                
                if (res?.prevPageToken) setPrevToken(res.prevPageToken);
            }).catch((err) => {
                console.log(err);
            })
    }
    
    const fetchPrev = () => {
        if (prevToken !== '') {
            getData(`${uploadsURL}&pageToken=${prevToken}`)
                .then((res) => {
                    setHomeUploads(res);
                    setNextToken(res.nextPageToken);

                    if (res?.prevPageToken) setPrevToken(res.prevPageToken);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

  return (
    <div className='home'>
        <div className="featured-video">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoID}`} playing controls muted width='500px' height='300px' className='video' />

            <div className="video-info">
                <div className="home-text">
                    <h5>{ homeVideo?.snippet?.title }</h5>
                    <h6>{ Number(homeVideo?.statistics?.viewCount).toLocaleString() } views</h6>
                    <h6>{ homeVideo?.snippet?.description }...</h6>
                </div>

                <Link to={`/video/${videoID}`} state={{ channelId: homeVideo?.snippet?.channelId }} onClick={() => dispatch(hideSidebar())}><button>see more</button></Link>
            </div>

            <hr />
        </div>

        { homeUploads?.items ? <div className="upload-list">
            <button onClick={fetchPrev} className='prev-btn'><FaArrowLeft /></button>

            { homeUploads?.items && homeUploads?.items.map((homeUpload: any) => (
                <div className='home-uploads'>
                    <Video video={homeUpload} />
                </div>
            ))}

            <button onClick={fetchHomeUploads} className='next-btn'><FaArrowRight /></button>
        </div> : <img src={loading} className='loadingGif' alt='loading spinning circle' />}
    </div>
  )
}

export default ChannelHome