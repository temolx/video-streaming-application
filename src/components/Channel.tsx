import Row from 'react-bootstrap/Row';

import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getData } from '../API/getData'

import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../redux/slices/subscriptionSlice';
import { RootState } from '../redux/store';

import { FaCheckCircle, FaRegFlag } from 'react-icons/fa';

import Video from './Video';
import { sections } from '../sections';
import { shortMonthName } from '../shortMonth';
import { setTimeout } from 'timers/promises';


const Channel: FC = () => {

    const dispatch = useDispatch();

    const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);
    const subscriptions = useSelector((state: RootState) => state.subscriptions);
    
    const location = useLocation();
    const { channelId } = location.state;

    const[channel, setChannel] = useState<any>();
    const[channelVideos, setChannelVideos] = useState<any>();
    const[currSection, setCurrSection] = useState<string>(sections[1]); // Home, Videos, About
    const[poke, setPoke] = useState<string>('');
    const[keywords, setKeywords] = useState<string[]>([])
    const[currentKey, setCurrentkey] = useState<number>(0);


    useEffect(() => {
        getData(`channels?part=snippet,statistics&id=${channelId}`)
            .then((res) => {
                setChannel(res.items[0]);
                setKeywords([...res.items[0]?.brandingSettings?.channel?.keywords.replace('"', '').split(' ')]);
                // console.log(res.items[0]);
            }).catch((err) => {
                console.log(err);
            })

        getData(`search?part=snippet,id&channelId=${channelId}&order=date&type=video`)
            .then((res) => {
                setChannelVideos(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

        setInterval(() => {
            setCurrentkey((prev) => prev + 1);
        }, 3000)
    }, [])

    const pokeUser = () => {
        setPoke(`You just poked ${channel?.snippet?.title}`);

        window.setTimeout(() => setPoke(''), 3000)
    }
    
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
                { sections.map((section: string) => (
                    <li key={section} onClick={() => setCurrSection(section)} className={currSection === section ? 'active-section' : ''}>{ section }</li>
                ))}
            </ul>

            <hr />
        </nav>
        </Row>
        </header>

        { currSection === 'Videos' ? <Row className='uploads'>
            { channelVideos?.items && channelVideos?.items.map((channelVideo: any) => (
                <Video video={channelVideo} />
            )) }
        </Row> : (currSection === 'Home' ? 
            <div className='home'>
                { keywords && keywords.map((keyword: string, index: number) => (
                    <div className='keyword'>
                        <h2>{ index === currentKey ? keyword : '' }</h2>
                    </div>
                )) }
            </div> :
            <div className='About'>
                <div className="channel-description">
                    <h5>Description</h5>
                    <h6>{ channel?.brandingSettings?.channel?.description }</h6>
                    <hr />
                </div>

                <div className="channel-statistics-container">
                    <h5>Stats</h5>
                    <hr />

                    <div className="channel-statistics">
                        <h6>Joined { shortMonthName(new Date(channel?.snippet?.publishedAt)) + ' ' + new Date(channel?.snippet?.publishedAt).getDay() + ', ' +  new Date(channel?.snippet?.publishedAt).getFullYear()}</h6>
                        <hr />
                        <h6>{ Number(channel?.statistics?.viewCount).toLocaleString() } Views</h6>
                        <hr />

                        <button onClick={pokeUser} className={poke !== '' ? 'btn-poked' : ''}><FaRegFlag /></button>
                        { poke !== '' ? <h5 className='poke-msg'>{ poke }</h5> : null }
                    </div>
                </div>
            </div>) }
    </div>
  )
}

export default Channel