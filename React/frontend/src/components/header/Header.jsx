import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false
        };
    }

    toggleClass = () => {
        this.setState(prevState => ({
            isToggled: !prevState.isToggled
        }));
    };

    render() {
        const headerWrapClasses = `header__wrap ${this.state.isToggled ? 'header__wrap-width' : ''}`;

        return (
            <div className={headerWrapClasses}>
                <header className="header">
                    <nav className="nav__wrap">
                        <ul className="nav">
                            <li></li>
                        </ul>
                    </nav>
                    <button className="header__btn" onClick={this.toggleClass}>
                    </button>
                </header>
            </div>
        );
    }
}

export default Header;