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

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.userId,
    };
    // 이미 구독 중이라면
    if (Subscribed) {
      Axios.post('/api/subscribe/unSubscribed', subscribedVariable)
        .then(response => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);

          } else {
            alert('구독 취소 하는데 실패했습니다.')
          }
        })

    // 구독중이 아니라면
    } else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable)
        .then(response => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 하는데 실패했습니다.')
          }
        })

    }
  }

  return (
    <div>
      <button
        style={{ backgroundColor: `${ Subscribed ? '#AAAAAA' : '#CC0000'}`, color: 'white', padding: '10px 16px', borderRadius: '4px', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe;