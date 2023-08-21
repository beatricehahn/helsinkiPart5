import { useState } from 'react'


const Toggler = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} className='primaryButton'>{props.primaryLabel}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                <button onClick={toggleVisibility}>{props.secondaryLabel}</button>
                {props.children}
            </div>
        </div>
    )
}

export default Toggler