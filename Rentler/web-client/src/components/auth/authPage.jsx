import React from 'react';
import EmptyPage from "../shared/emptyPage";

class AuthPage extends EmptyPage {
    componentDidMount() {
        super.componentDidMount();
        document.body.style.backgroundColor = '#f5f5f5';
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        document.body.style.backgroundColor = "white";
    }

    render() {
        const { title, footer } = this.props;
        return (
            <div className="auth-form d-flex justify-content-center">
                <button className="close shadow-sm" onClick={ this.close }/>
                <div className="d-flex align-self-center row">
                    <div className="w-100 text-center" style={ { marginBottom: 20 } }>
                        <span className="auth-form-title">{ title }</span>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="auth-card card shadow-lg">
                            { this.props.children }
                        </div>
                    </div>
                    <div className="w-100 text-center mt-3" style={ { fontSize: 14 } }>
                        { footer }
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;
