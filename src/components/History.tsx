import { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { BiSearch, BiTrash } from 'react-icons/bi';

const History: FC = () => {

    const historyItems = useSelector((state: RootState) => state.history);

    const[activeItem, setActiveItem] = useState<string>('');

    const showDelete = (id: string) => {
      setActiveItem(id);
    }

    const hideDelete = () => {
      setActiveItem('');
    }

  return (
    <div className='history'>
      <div className="history-container">
        <h1>History</h1>
        { historyItems.value && historyItems.value.map((historyItem: any) => (
            <div className='watchedList' key={ historyItem.id } onMouseOver={() => showDelete(historyItem.id)} onMouseLeave={hideDelete}>
              <div className="thumbnail">
                <img src={ historyItem.thumbnail } alt='thumnbail'/>
                { activeItem === historyItem.id ? <button><BiTrash id='search-icon' /></button> : null }
              </div>
                <h2>{ historyItem.title }</h2>
            </div>
        )) }
      </div>

        <div className="history-actions">
          <div className="search">
            <BiSearch id='search-icon' />
            <input type="text" placeholder='Search watch history' />
          </div>

          <div className="clear">
            <button><BiTrash /><h3>Clear all watch history</h3></button>
          </div>
        </div>
    </div>
  )
}

export default History