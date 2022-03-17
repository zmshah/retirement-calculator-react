import React from "react";
import PropTypes from 'prop-types'

//Header component
const Header = ({title}) => {
    return(
        <div className = 'header'>
            <h2>{title}</h2>
            {/*<Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> */}
            <a href="" Link style={linkStyle}>Home</a> | <a href="" Link style={linkStyle}>About</a> 
        </div>
    )
}

Header.defaultProps = {
    title: 'Dream Retirement Calculator in React (DRCR)',
}

Header.propTypes = {
    title: PropTypes.string,
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
}

export default Header