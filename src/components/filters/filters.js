import DSwitch from "../dSwitch/DSwitch";
import DSlider from "../dSlider/DSlider";

const Filters = ({filterList, params, setParams}) => {
    return ( 
        <div className="filterBox">
            {
                Object.keys(filterList).map( filterName => {
                    switch (filterList[filterName].type) {
                        case "switch":
                            return <DSwitch params={params} 
                                        setParams={setParams} 
                                        filterName={filterName} 
                                        key={filterName} 
                                        title= {filterList[filterName].title}/>

                        case "slider":
                            return <DSlider min={filterList[filterName].options.min} 
                                        max={filterList[filterName].options.max } 
                                        key={filterName} params={params}
                                        setParams={setParams}
                                        title= {filterList[filterName].title}
                                        filterName={filterName} />
                        default:
                            break;
                    } return <></>; 
                })
            }
        </div>
     );
}
 
export default Filters;