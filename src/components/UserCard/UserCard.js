import React from 'react';
import './UserCard.css';

const UserCard = (props) => {
  return (
    <div className='user_card'>
      <h2>{props.user.name}</h2>
      <img src={props.user.profileImg} alt="user profile" referrerPolicy='no-referrer'/>
    </div>
  );
};

export default UserCard;