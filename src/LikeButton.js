import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function LikeButton() {
    const [liked, setLiked] = React.useState(false);

    const variants = {
        unliked: { rotate: [0, -30, 0], transition: { duration: 0.7 } },
        liked: { y: [0, -10, 0], transition: { repeat: Infinity, repeatDelay: 3 } }
    };

    
    return(
        <motion.div className=''
            animate={liked ? 'liked' : 'unliked'}
            variants={variants}>
            <FontAwesomeIcon 
                size='lg' 
                icon={faHeart} 
                onClick={() => setLiked(!liked)} 
                className={liked === true ? 'text-rose-600' :'text-gray-500 hover:text-gray-800'}/>            
        </motion.div>

    );
}

export default LikeButton;