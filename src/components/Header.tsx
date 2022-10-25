import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addSearchWord } from '../redux/slices/SearchSlice';
import { BiSearch, BiMenu } from 'react-icons/bi';
import { BsYoutube, BsBellFill, BsEnvelope } from 'react-icons/bs';
import { toggleSidebar } from '../redux/slices/SidebarSlice';

function Header() {

  const dispatch = useDispatch();

    const[filter, setFilter] = useState<string>('');

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      // dispatch to redux store
      dispatch(addSearchWord(filter));
      setFilter('');
    }

  return (
    <div className='header'>

        <div className="logo-container">
          <button onClick={() => dispatch(toggleSidebar())}><BiMenu id='burger-menu' /></button>
          <button onClick={() => dispatch(addSearchWord(''))}><BsYoutube id='logo' /></button>
        </div>

        <form>
            <input type="text" placeholder='Search for...' onChange={(e) => setFilter(e.target.value)} value={filter} />
            <button onClick={(e) => handleSearch(e)}><BiSearch id='search-icon' /></button>
        </form>

        <div className="profile">
          <BsBellFill id='notifications' />
          <BsEnvelope id='messages' />
        </div>
    </div>
  )
}

export default Header