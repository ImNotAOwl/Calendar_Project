/**
Component that recieve a list of choice from props with the names 'values'
Display the list as a select element
handleSubmit as placeholder for further customizations
 */

import { forwardRef } from 'react';
import './ScrollSelect.css'

const ScrollSelect = forwardRef(({ name, label, values, setSelectValue }, ref) => {

    const handleSelect = (e) => {
        console.log(e.target.value);
        setSelectValue(e.target.value);
    }

    return (
        <div className="scrollSelect">
            <label htmlFor={name}>{`${label} `}</label>

            <select ref={ref} name={name} id={name} onChange={(e) => handleSelect(e)}>
                <option value="0">--</option>
                {
                    values.map((value, index) => (
                        <option key={`${index}-${value}`} value={index+1}>{value}</option>
                    ))
                }
            </select>
        </div>
    );
})

export default ScrollSelect;