import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getData } from '../API/getData'

import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../redux/slices/subscriptionSlice';
import { RootState } from '../redux/store';

import { FaCheckCircle } from 'react-icons/fa';


const Channel: FC = () => {

    const dispatch = useDispatch();

    const subscriptions = useSelector((state: RootState) => state.subscriptions);
    
    const location = useLocation();
    const { channelId } = location.state;

    const[channel, setChannel] = useState<any>();
    const[channelVideos, setChannelVideos] = useState<any>();

    useEffect(() => {
        getData(`channels?part=snippet,statistics&id=${channelId}`)
            .then((res) => {
                setChannel(res.items[0]);
                console.log(res.items[0]);
            }).catch((err) => {
                console.log(err);
            })

        getData(`search?part=snippet,id&channelId=${channelId}&order=date`)
            .then((res) => {
                setChannelVideos(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    
  return (
    <div className='channel'>
        <div className="channel-info">
            <div className="channel-profile">
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


            <button onClick={() => dispatch(subscribe({ channelId: channelId, channelName: channel?.snippet?.title }))} className={ subscriptions.value.some((el) => el.channelId === channelId) ? 'subscribe-active' : '' }>{ subscriptions.value.some((el) => el.channelId === channelId) ? (<div><FaCheckCircle id='checkmark' /> Subscribed</div>) : 'Subscribe' }</button>
        </div>

        <hr />

        <div className='uploads'>
            { channelVideos?.items && channelVideos?.items.map((channelVideo: any) => (
                <div className='upload-list'>
                    title
                </div>
            )) }
        </div>
    </div>
  )
}

export default Channel