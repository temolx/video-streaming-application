import Row from 'react-bootstrap/Row';

import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getData } from '../API/getData'

import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../redux/slices/subscriptionSlice';
import { RootState } from '../redux/store';

import { FaCheckCircle } from 'react-icons/fa';

import ChannelHome from './ChannelHome';
import About from './About';
import ChannelVideos from './ChannelVideos';
import { sections } from '../sections';

import { Link, useParams } from 'react-router-dom';



const Channel: FC = () => {

    const dispatch = useDispatch();

    const { section } = useParams();

    const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);
    const subscriptions = useSelector((state: RootState) => state.subscriptions);
    
    const location = useLocation();
    const { channelId } = location.state;

    const[channel, setChannel] = useState<any>();

    useEffect(() => {
        getData(`channels?part=snippet,statistics&id=${channelId}`)
            .then((res) => {
                setChannel(res.items[0]);
                // console.log(res.items[0]);
            }).catch((err) => {
                console.log(err);
            })
    }, [channelId])
    
  return (
    <div className='individual-channel' style={ sidebarStatus.value ? { 'paddingLeft': '280px', 'paddingRight': '40px' } : { 'paddingLeft': '0px', 'paddingRight': '0px' }}>
        <header>
        <Row>
        <div className="channel-info">
            <div className="channel-profile-container">
                <div className='channel-profile'>
                    <div className="branding">
                        {/* <div className="banner">
                            <img src={channel?.brandingSettings?.image?.bannerExternalUrl} alt='banner' />
                        </div> */}
                        
                        <img src={channel?.snippet?.thumbnails?.high?.url} alt='profile' />
                    </div>

                    <div className="channel-stats">
                        <h4>{ channel?.snippet?.title }</h4>
                        <h5>{ Number(channel?.statistics?.subscriberCount).toLocaleString() } subscribers</h5>
                    </div>
                </div>
            </div>


            <button onClick={() => dispatch(subscribe({ channelId: channelId, channelName: channel?.snippet?.title }))} className={ subscriptions.value.some((el) => el.channelId === channelId) ? 'subscribe-active' : '' }>{ subscriptions.value.some((el) => el.channelId === channelId) ? (<div><FaCheckCircle id='checkmark' /> Subscribed</div>) : 'Subscribe' }</button>
        </div>

        <nav>
            <ul>
                { sections.map((currentSection: string) => (
                    <Link to={`/channel/${channelId}/${currentSection}`} state={{ channelId: channelId }}><li key={currentSection} className={section === currentSection ? 'active-section' : ''}>{ currentSection }</li></Link>
                ))}
            </ul>

            <hr />
        </nav>
        </Row>
        </header>

        { section === 'videos' ? <ChannelVideos channelId={channelId} /> : (section === 'home' ? 
            <ChannelHome videoID={channel?.brandingSettings?.channel?.unsubscribedTrailer} /> : <About channel={channel} /> ) }
    </div>
  )
}

export default Channel