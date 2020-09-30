import React from 'react';

class Header extends React.Component {
    render() {
        return (<h2 className="header"
                    onBlur={e => this.props.updateTask([this.props.index], e)}
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: this.props.title }}>
            
        </h2>)
    }
}

export default Header;