import { FC, useEffect, useState } from 'react'
import { getData } from '../API/getData';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const History: FC = () => {

    const historyItems = useSelector((state: RootState) => state.history);

  return (
    <div className='history'>
        <h1>History</h1>
        { historyItems.value && historyItems.value.map((historyItem: any) => (
            <div className='watchedList' key={ historyItem.id }>
                <img src={ historyItem.thumbnail } alt='thumnbail'/>
                <h2>{ historyItem.title }</h2>
            </div>
        )) }
    </div>
  )
}

export default History