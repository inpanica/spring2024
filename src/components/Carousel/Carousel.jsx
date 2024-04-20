import { useState } from 'react'
import Slide from '../Slide/Slide'
import IconButton from '../icon button/IconButton';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Flicking from "@egjs/react-flicking";
import Panel from '../Panel/Panel.jsx';
import "@egjs/react-flicking/dist/flicking.css";    
import './Carousel.css'

function Carousel({ slides, ...props }) {

    const updateTransform = (e) => {
        e.currentTarget.panels.forEach(panel => {
            const rotateVal = -panel.progress * 20;
            const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
            const depth = 150 * sinRot * sinRot;
            panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
            panel.element.style.opacity = 10 / depth;
        });
    };

    return (
        <>  
            <h2 className="main-title">Главная</h2>
            <Flicking onReady={updateTransform} onMove={updateTransform} circular={false}>
                {
                    slides.map((slide) => {
                        return <Panel index={slide.id_t} key={slide.id_t}><Slide name={slide.name} banner={slide.banner}></Slide></Panel>
                    })
                }
            </Flicking>
        </>
    )
}

export default Carousel