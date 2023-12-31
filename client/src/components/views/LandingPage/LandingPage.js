import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd';
import Axios from "axios";
import moment from "moment";
const { Title } = Typography
const { Meta } = Card;

function LandingPage() {

  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert('비디오 가져오기를 실패했습니다.');
        }
      })
  }, []);

  const renderCard = Video.map((video, index) => {

    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return <Col lg={6} md={8} xs={24} key={index}>
      <a href={`/video/${video._id}`}>
        <div style={{ position: 'relative' }}>
          <img
            src={`http://localhost:5001/${video.thumbnail}`}
            alt={video.title}
            style={{ width: '100%' }}
          />
          <div className="duration">
            <span>{minutes} : {seconds}</span>
          </div>
        </div>
      </a>
      <br/>
      <Meta
        avatar={
          <Avatar src={video.writer.image}/>
        }
        title={video.title}
        description={video.description}
      ></Meta>
      <span>{video.writer.name}</span><br/>
      <span stype={{ marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
    </Col>
  });
  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>
        {renderCard}
      </Row>
    </div>
  )
}

export default LandingPage
