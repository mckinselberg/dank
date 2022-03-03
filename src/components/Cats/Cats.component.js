import React from 'react';
import { animated, useSpring } from '@react-spring/web'
import { useState, useEffect, useCallback } from 'react';

const Cats = ({ children }) => {
  
  const [cat, updateCat] = useState();
  const [catArray, updateCatArray] = useState([])
  const [clicks, updateClicks] = useState(0);
  const [loading, updateLoading] = useState(false)
  
  const fetchCat = useCallback(async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    return response.json();
  }, [])
  
  useEffect(() => {
    fetchCat()
      .then(response => {
        if (catArray.includes(response[0].url)) {
          debugger;
        } else {
          updateCat(response[0].url);
          updateCatArray([ ...catArray, response[0].url ]);
        }
      }).catch(console.error);
  }, [catArray, clicks, fetchCat]);

  useEffect(() => {
    updateLoading(!loading);
  }, [clicks, loading]) 
  
  useEffect(() => {
    setTimeout(() => updateLoading(!loading), 500);
  }, [cat, loading]);

  const [isVisible, toggleVisible] = useState(false);
  const handleClick = () => {
    if (clicks === 0) {
      toggleVisible(!isVisible);
    } else {
      // fetchCat()
      //   .then(response => {
      //     if (catArray.includes(response[0].url)) {
      //       debugger;
      //     } else {
      //       updateCat(response[0].url);
      //       updateCatArray([ ...catArray, response[0].url ]);
      //     }
      //   }).catch(console.error);
    }
    updateClicks(clicks + 1);
  }

  let width = 75;
  const divStyles = useSpring({
    position: 'absolute',
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 10 : -124,
    friction: 100
  })
  
  const moreStyles = useSpring({
    config: {
      friction: 20
    },
    width: isVisible ? `${width}%` : '0',
    left: '50%',
    marginLeft: isVisible ? `-${width / 2}%` : '0%'
  });


  return (
    <>
      <button onClick={handleClick}>click to see a cat</button>
      <animated.div style={{...divStyles,...moreStyles}} className='image-container'>
        { loading ? <img src="./img/loading.gif" alt="loading" style={{ position:'absolute', zIndex: 1, opacity: ".6", width: '100%'}}/> : null }
        { cat !== null ? <img src={cat} style={{width: '100%', maxWidth: '800px'}} alt="cat"/> : null }
        { children }
      </animated.div>
    </>
  );
}

export default Cats;