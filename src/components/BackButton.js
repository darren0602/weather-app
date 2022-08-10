import React from 'react'
import {IoMdArrowBack} from 'react-icons/io'

export default function BackButton(props) {
    return (
        <div className="back">
            <IoMdArrowBack size='2em' className='back-button' onClick={props.handleBack}/>
        </div>
    )
}