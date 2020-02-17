import React, { useState, useEffect } from 'react'
import BlankProfileImage from '../images/Blank-profile.png'
// import { ReactMediaRecorder } from 'react-media-recorder'
import VideoRecorder from 'react-video-recorder'
import steem from 'steem'
const Studio = props => {
  const [testBool, setTestBool] = useState(false)

  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [username, setUsername] = useState('')
  const permlink = Math.random()
    .toString(36)
    .substring(2)
  useEffect(() => {
    props.client.setAccessToken(sessionStorage.getItem('accessToken'))
    console.log(props.client.accessToken)
    setTestBool(true)
    var query = {
      tag: 'steemit', // This tag is used to filter the results by a specific post tag
      limit: 5, // This limit allows us to limit the overall results returned to 5
    }
    steem.api.getDiscussionsByTrending(query, function(err, result) {
      console.log(err, result)
    })
  }, [])
  useEffect(() => {
    if (testBool) {
      props.client.me((err, res) => {
        let validImage = JSON.parse(res.account.json_metadata)

        if (!err && validImage.profile.profile_image !== '') {
          setProfileImage(validImage.profile.profile_image)
          setUsername(res.user)
        }
      })
    }
  }, [testBool])
  return (
    <>
      <div>
        <img className="profilePicture" src={profileImage} />
      </div>
      <div>
        <VideoRecorder
          onRecordingComplete={videoBlob => {
            console.log('videoBlob', videoBlob)
          }}
        />
      </div>
    </>
  )
}

export default Studio
