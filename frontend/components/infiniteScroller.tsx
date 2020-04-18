import { useState, useEffect, useRef } from 'react';

const WIDTH = 300;
const INITIAL_HEIGHT = 700;
const HEIGHT_INCREASE = 200;

const InfinityScroller = () => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [height, setHeight] = useState(INITIAL_HEIGHT);
    useEffect(() => {
        window.onscroll = () => {
            console.log("------------------");
            console.log(containerRef.current);
            if (containerRef.current.scrollTop >= containerRef.current.scrollHeight - 100) {
                setHeight(prevHeight => prevHeight + HEIGHT_INCREASE);
            }
        };
    }, []);
    return (
        <div ref={containerRef}>
            <div
                ref={scrollerRef}
                style={{height: `${height}px`, backgroundColor: "#333", width: WIDTH}}
            />
        </div>
    );
};

export default InfinityScroller;