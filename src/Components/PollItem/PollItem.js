import React from 'react'
import { Link } from 'react-router-dom'
import './style.css';

const PollItem = ({ poll }) => {
    return (
        <Link className="pollItem" to={`/poll/${poll.id}`}>
            <h3>Name: {poll.label}</h3>
            <span>Created: {poll.created}</span>
            <span>Status: {poll.active + ''}</span>
        </Link>
    )
}

export default PollItem