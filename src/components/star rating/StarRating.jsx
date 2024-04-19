import { useState } from 'react';
import './StarRating.css'
import { FaRegStar, FaStar } from "react-icons/fa";

function StarRating({ children, ...props }) {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className='star-rating'>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input style={{'display' : 'none' }}type="radio" name='rating' value={currentRating} onClick={() => setRating(currentRating)}/>
                        {
                            (rating >= (index + 1) || hover >= (index + 1))?
                            <FaStar className='star' size={30} onMouseEnter={() => setHover(index + 1)}></FaStar>:
                            <FaRegStar className='star star_srtoke' size={30} onMouseEnter={() => setHover(index + 1)}></FaRegStar>
                        }
                    </label>);
            })}
        </div>
    )
}

export default StarRating