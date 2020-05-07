import React from 'react'
const HomePageHeader = ({ profileImage, id }) => {
  return (
    <>
      <img
        className="profilePicture"
        src={profileImage}
        onClick={() => window.location.replace(`/profile/${id}`)}
      />

      <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
      <i
        class="fas fa-sync-alt"
        aria-hidden="true"
        onClick={() => window.location.reload()}
      ></i>
      <i class="fa fa-search" aria-hidden="true"></i>
    </>
  )
}
export default HomePageHeader
