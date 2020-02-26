import React, { useState, useEffect } from 'react'
import steem from 'steem'
const ProfilePage = props => {
  const [isProfile, setIsProfile] = useState(false)
  const [background, setBackground] = useState('')
  const [profileImage, setProfileImage] = useState('')
  let newBackground
  const styles = {
    backgroundImage: `url(${newBackground})`,
  }
  useEffect(() => {
    steem.api.getAccounts([props.match.params.id], function(err, result) {
      if (
        'cover_image' in JSON.parse(result[0].posting_json_metadata).profile
      ) {
        setBackground(
          JSON.parse(result[0].posting_json_metadata).profile.cover_image
        )
      }
      if (
        'profile_image' in JSON.parse(result[0].posting_json_metadata).profile
      ) {
        setProfileImage(
          JSON.parse(result[0].posting_json_metadata).profile.profile_image
        )
      }
    })
    props.client.setAccessToken(sessionStorage.getItem('accessToken'))
    props.client.me(function(err, res) {
      console.log(err, res)
      if (!err) {
        setIsProfile(true)
      }
    })
  }, [])

  useEffect(() => {
    if (background !== '') {
      newBackground = background.replace(/['"]+/g, '')
    }
  }, [background])
  return (
    <>
      {isProfile ? (
        <>
          <img
            style={{ position: 'relative', top: 0, left: 0 }}
            src={background}
          />
          <img
            style={{ position: 'absolute', top: '60px', left: '80px' }}
            src={profileImage}
          />
        </>
      ) : (
        // <div style={{ backgroundImage: `url(${background.replace(/['"]+/g, '')})` }}></div>
        <>
          <div>Invalid Profile</div>
        </>
      )}
    </>
  )
}

export default ProfilePage
