import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function LikeButton() {
    const [liked, setLiked] = React.useState(false);

    
    return(
        <div className=''>
            <FontAwesomeIcon icon={faHeart} onClick={() => setLiked(!liked)} size='lg' 
                className={liked === true ? 'text-rose-600' :'text-gray-500 hover:text-gray-800'}/>            
        </div>

    );
}

export default LikeButton;