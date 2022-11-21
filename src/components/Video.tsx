import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

import { colors } from '../colors';
import blankProfile from '../img/blankProfile.webp'
import { hideSidebar } from '../redux/slices/SidebarSlice';

type IProps = {
    video: any;
    index?: number;
}

const Video: FC<IProps> = ({ video, index }) => {

    const dispatch = useDispatch();

    const searchFilter = useSelector((state: RootState) => state.searchFilter);
    const filters = useSelector((state: RootState) => state.filters);

  return (
        <div className='video-list' key={ video.id.videoId } style={{ backgroundColor: video.id.kind === "youtube#video" ? colors[Math.floor(Math.random() * colors.length)] : '' }}>
                { index === 0 ? <h2>{searchFilter.value !== '' ? searchFilter.value : 'Featured'} { filters.value === "video" ? 'Videos' : (filters.value === "channel" ? 'Channels' : 'Results') }</h2> : null }

                <div className={ video.id.kind === "youtube#video" ? "video-container" : "channel-container" }>
                    <Link to={ video.id.kind === "youtube#video" ? `/video/${video.id.videoId}` : `/channel/${video.snippet.channelId}/videos`} state={{ channelId: video?.snippet?.channelId }} onClick={() => dispatch(hideSidebar())}>
                        <div className={ video.id.kind === "youtube#video" ? "thumbnail" : "channel-profile" }>
                            <img src={video?.snippet?.thumbnails?.medium?.url || blankProfile} alt='thumbnail' />
                        </div>
                    </Link>

                    <div>
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
                </div>
            </div>
  )
}

export default Video