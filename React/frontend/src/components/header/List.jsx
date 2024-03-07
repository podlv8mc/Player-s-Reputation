import React from 'react';

class List extends React.Component {
    render() {
        return (
            <li className={this.props.class}>
                <a className="globalnav__link" href="#">
                    <img src={this.props.name} alt={this.props.alt}/>
                    <span className={this.props.spanClass}>
                        {this.props.text}
                    </span>
                </a>
            </li>
        )
    }
}

export default List