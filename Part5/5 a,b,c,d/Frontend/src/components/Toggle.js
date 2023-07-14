import { useState, forwardRef, useImperativeHandle } from "react";
import propTypes from 'prop-types'
const Toggle = forwardRef((prop,refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenClick = { display : visible ? '' : 'none'}
    const hideWhenClick = { display : visible ? 'none' : ''}
    
    const update = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs,() => {
        return {update}
    })

    return (
        <div>
            <div style={showWhenClick} >
                {prop.children}
                <button onClick={update} className="notShow" >{prop.buttonLabel1}</button>
            </div>
            <div style={hideWhenClick}>
                <button className="show" onClick={update}>{prop.buttonLabel2}</button>
            </div>
        </div>
    )
})
//Making a condition to get a string for the buttons
Toggle.propTypes = {
    buttonLabel1 : propTypes.string.isRequired,
    buttonLabel2 : propTypes.string.isRequired
}
export default Toggle