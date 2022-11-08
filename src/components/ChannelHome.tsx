import { FC, useEffect, useState } from 'react'
import { getData } from '../API/getData'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import { hideSidebar } from '../redux/slices/SidebarSlice';
import { useDispatch } from 'react-redux';



type IProps = {
    videoID: string
}

const ChannelHome: FC<IProps> = ({ videoID }) => {

    const dispatch = useDispatch();

    const[homeVideo, setHomeVideo] = useState<any>();

    useEffect(() => {
    getData(`videos?part=contentDetails,snippet,statistics&id=${videoID}`)
        .then((res) => {
            setHomeVideo(res.items[0]);
            console.log(res.items[0]);
        }).catch((err) => {
            console.log(err);
        })
    }, [homeVideo])

  return (
    <div className='home'>
        <div className="featured-video">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoID}`} playing controls muted width='500px' height='300px' className='video' />

            <div className="video-info">
                <div className="home-text">
                    <h5>{ homeVideo?.snippet?.title }</h5>
                    <h6>{ Number(homeVideo?.statistics?.viewCount).toLocaleString() } Views</h6>
                    <h6>{ homeVideo?.snippet?.description }...</h6>
                </div>

                <Link to={`/video/${videoID}`} state={{ channelId: homeVideo.snippet.channelId }} onClick={() => dispatch(hideSidebar())}><button>see more</button></Link>
            </div>
        </div>
    </div>
  )
}

export default ChannelHome