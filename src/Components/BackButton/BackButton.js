import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import './style.css'

const BackButton = () => {

    const history = useHistory()
    console.log(history, 'history');

    return (
        <span onClick={() => history.goBack()} className="backButton"><MdArrowBack />BACK
        </span>
    )
}

export default BackButton