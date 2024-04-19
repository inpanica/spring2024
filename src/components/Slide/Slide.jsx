import './Slide.css'

function Slide({name, banner, link, ...props}) {

    return (
        <div className='silde'>
            <img props src={banner} alt="" className="slide-banner" draggable="false" />
            <h2 className="main-title slide-title">{name}</h2>
        </div>
    )
}

export default Slide