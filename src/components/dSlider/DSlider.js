import "./dSlider.css";
import { useState, useRef } from "react";
import { useCallback, useEffect } from "react";

const DSlider = ({min, max, params, setParams, filterName, title}) => {

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  
  useEffect(()=>{
    setMinVal(min);
    setMaxVal(max);
  },[min,max])

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.right = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const filter = ()=>
  {
    if(minVal === min && maxVal === max){
      const paramsTemplate = {...params};
      delete paramsTemplate[`${filterName}[min]`];
      delete paramsTemplate[`${filterName}[max]`];
      paramsTemplate.page = 1;
      paramsTemplate.changed = true;
      setParams(paramsTemplate); 
    }
    else{
      const paramsTemplate = {...params};
      paramsTemplate[`${filterName}[min]`] = minVal;
      paramsTemplate[`${filterName}[max]`] = maxVal;
      paramsTemplate.page = 1;
      paramsTemplate.changed = true;
      setParams(paramsTemplate); 
    }
  }

  return (
    <div className='sliderOuterContainer'>
    <h5>{title}</h5>
    <div className="sliderContainer">
    
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div className="slider__left-value">از {minVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div className="slider__right-value">تا  {maxVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  ریال</div>
        <div ref={range} className="slider__range" />
      </div>

      </div>
      <button className="setPriceBtn" onClick={filter}>اعمال فیلتر قیمت</button>
      </div>
  );
}
 
export default DSlider;