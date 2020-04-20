import gameContent from '../utils/gameContent'

import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';

const INITIAL_HEIGHT = 700;
const HEIGHT_INCREASE = 200;
const VISIBLE_OFFSET = 50;

const InfinityScroller = () => {
    const containerRef = useRef(null);
    const [height, setHeight] = useState(INITIAL_HEIGHT);
    const [contentIndex, setContentIndex] = useState(0);
    
    const contentLength = gameContent.length;
    useEffect(() => {
        setContentIndex(Math.floor((window.scrollY > 0 ? window.scrollY : 0) / 150) % contentLength);
        window.onscroll = () => {
            setContentIndex(Math.floor((window.scrollY > 0 ? window.scrollY : 0) / 150) % contentLength);
            const container = containerRef.current;
            if (window.scrollY > container.offsetTop + container.offsetHeight - window.innerHeight - VISIBLE_OFFSET) {
                setHeight(prevHeight => prevHeight + HEIGHT_INCREASE);
            }
        };
    }, []);
    return (
        <div ref={containerRef}>
            <div
                style={{height: `${height}px`, width: "100%"}}
            >
                <div id="gameIndicator">
                    您能按下网页最下方的按钮么？
                </div>
                <div id="gameChar">
                    {gameContent.charAt(contentIndex)}
                </div>
                <div id="gameButton">
                    <Button
                        onClick={() => {
                            alert("恭喜您，成功了！");
                        }}
                    >
                        你居然真的看到我了
                    </Button>
                </div>
            </div>
            <style jsx>{`
                #gameIndicator {
                    width: 100%;
                    text-align: center;
                    font-size: 2em;
                }
                #gameChar {
                    position: fixed;
                    bottom: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 5em;
                }
                #gameButton {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default InfinityScroller;