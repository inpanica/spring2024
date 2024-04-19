import './Header.css'
import { RiTeamFill } from "react-icons/ri";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header className='header'>
            <div className="ctn header_ctn">
                <div className="auto-layout-h-r no-margin">
                    <Link className="header-btn" to={'/'}>
                        <BiHomeAlt2 className='header-btn-icon'></BiHomeAlt2>
                    </Link>
                    <Link className="header-btn" to={'/team'}>
                        <RiTeamFill className='header-btn-icon'></RiTeamFill>
                    </Link>
                    <Link className="header-btn" to={'/user'}>
                        <FaUser className='header-btn-icon'></FaUser>
                    </Link>
                    <Link className="header-btn" to={'/case'}>
                        <BsSuitcaseLgFill className='header-btn-icon'></BsSuitcaseLgFill>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header