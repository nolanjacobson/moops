import React from 'react'
import PencilIcon from '../images/pencil.png'
const ProfileIconsImages = ({ background, profileImage }) => {
  return (
    <>
      <img
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          borderBottom: '2px solid white',
          height: '9rem',
          width: '23.5rem',
          objectFit: 'cover',
        }}
        src={background}
      />
      <i
        class="fas fa-ellipsis-v"
        aria-hidden="true"
        style={{
          marginTop: '-8rem',
          position: 'absolute',
          left: '325px',
        }}
        onClick={() => window.location.replace('/home/funny')}
      ></i>
      <img
        style={{
          marginTop: '-2rem',
          position: 'absolute',
          left: '340px',
          height: '1rem',
        }}
        src={PencilIcon}
      />
      <img
        style={{
          position: 'absolute',
          top: '90px',
          left: '150px',
          borderRadius: '50%',
          height: '5rem',
          border: '2px solid white',
        }}
        src={profileImage}
      />
    </>
  )
}

export default ProfileIconsImages
