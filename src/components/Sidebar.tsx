import { FaHome as Home, FaMusic as Music, FaUserAlt as User } from 'react-icons/fa';
import { MdMovie as Movie, MdHistory as History } from 'react-icons/md';
import { GiPopcorn as Popcorn } from 'react-icons/gi';
import { IoLogoGameControllerB as Controller, IoMdArrowDropright as Expand } from 'react-icons/io';
import { BsFilterLeft as Filter } from 'react-icons/bs';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAll, checkVideos, checkChannels } from '../redux/slices/FilterSlice';
import { addSearchWord } from '../redux/slices/SearchSlice';
import { RootState } from '../redux/store';

import { Link } from 'react-router-dom';



function Sidebar() {

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const subscriptions = useSelector((state: RootState) => state.subscriptions);

  const[filtersVisible, setFiltersVisible] = useState<boolean>(false);

  return (
    <div className='sidebar'>
        <ul>
            <li onClick={() => dispatch(addSearchWord(''))}><Home className='side-icon' /> <p>Home</p></li>
            <li onClick={() => dispatch(addSearchWord('Music'))}><Music className='side-icon' /> <p>Music</p></li>
            <li onClick={() => dispatch(addSearchWord('Movies'))}><Movie className='side-icon' /> <p>Movies</p></li>
            <li onClick={() => dispatch(addSearchWord('Entertainment'))}><Popcorn className='side-icon' /> <p>Entertainment</p></li>
            <li onClick={() => dispatch(addSearchWord('Gaming'))}><Controller className='side-icon' /> <p>Gaming</p></li>

            <div className="sidebar-functionality">
              <Link to='/history'><History className='side-icon' /><p>History Page</p></Link>
              <li className='filter-item' onMouseEnter={() => setFiltersVisible(true)} onMouseLeave={() => setFiltersVisible(false)} >
                  <div className='filter-container'>
                    <Filter className='side-icon' />
                    <p>Filter</p>

                    { filtersVisible ? <div className='filter-categories'>
                      <div className="filter-checkbox">
                        <input type="checkbox" name="all" onChange={() => dispatch(checkAll())} checked={filters.value === 'video,channel'} />
                        <label htmlFor="all">All Results</label>
                      </div>

                      <div className="filter-checkbox">
                        <input type="checkbox" name="video" onChange={() => dispatch(checkVideos())} checked={filters.value === 'video'} />
                        <label htmlFor="video">Videos</label>
                      </div>

                      <div className="filter-checkbox">
                        <input type="checkbox" name="channel" onChange={() => dispatch(checkChannels())} checked={filters.value === 'channel'} />
                        <label htmlFor="channel">Channels</label>
                      </div>
                      
                    </div> : null }
                  </div>

                  <Expand className='expand-icon' />
              </li>
            </div>

        </ul>

        { subscriptions.value.length !== 0 && <div className="subscriptions">
            <h6>Subscriptions</h6>
            <ul>
                { subscriptions && subscriptions.value.map((subscription) => (
                  <Link to={`/channel/${subscription.channelId}/videos`} state={{ channelId: subscription.channelId }} key={ subscription.channelId }><User className='side-icon user-icon' /><p>{ subscription.channelName }</p></Link>
                )) }
            </ul>
        </div> }
    </div>
  )
}

export default Sidebar