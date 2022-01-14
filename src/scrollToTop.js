/**
 * Adapted from https://betterprogramming.pub/create-a-scroll-to-top-arrow-using-react-hooks-18586890fedc
 * 
 */

import React, {useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Creates a scrollind arrow that brings the user back to the top when clicked
 * 
 * @returns ScrollToTop component
 */
const ScrollToTop = () => { 
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    }

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    window.addEventListener('scroll', checkScrollTop);

    return (
        <FontAwesomeIcon icon={faChevronUp} onClick={scrollTop} className='scrollTop' size='3x'/>
    );
}

export default ScrollToTop;