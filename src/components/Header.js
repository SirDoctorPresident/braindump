import React from 'react';

class Header extends React.Component {
    render() {
        return <h2>{this.props.title}</h2>
    }
}

export default Header;