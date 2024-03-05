import React from 'react';

class Sections extends React.Component {
    render() {
        return (
            <>
                <span>
                    {this.props.clarification}
                </span>
                <h2>
                    {this.props.title}
                </h2>
                <h3>
                    {this.props.subtitle}
                </h3>
            </>
        )
    }
}

export default Sections