import React, {useEffect, useState} from "react";
import Axios from "axios";

function Subscribe (props) {

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)
  
  useEffect(() => {

    let variable = { userTo: props.userTo}

    Axios.post('/api/subscribe/subscribeNumber', variable)
      .then( response => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('구독자 수 정보를 받아오지 못했습니다.')
        }
      })
    
    let subscribedVariable = { userTo: props.userTo, userFrom : localStorage.getItem('userId') }
    
    Axios.post('/api/subscribe/subscribed')
      .then(response => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed)
        } else {
          alert('정보를 받아오지 못했습니다.');
        }
      })
  }, []);

  return (
    <div>
      <button
        style={{ backgroundColor: `${ Subscribed ? '#CC0000' : '#AAAAAA'}`, color: 'white', padding: '10px 16px', borderRadius: '4px', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe;