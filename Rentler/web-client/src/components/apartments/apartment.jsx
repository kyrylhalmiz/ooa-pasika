import React from 'react';
import { Link } from "react-router-dom";

const Apartment = ({ id, title, address, bath, beds, squareMeters, price, photo, showEdit, applicationCount = 0 }) => {

    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <Link className="no-style" to={ `/apartments/${ id }` }>
            <div className="d-inline-flex " style={ { width: 370, height: 340, padding: 10, marginRight: 0 } }>
                <div className="card apartment-card" style={ { width: 350, height: 320 } }>
                    <span className="price d-inline-flex">${ formattedPrice }</span>
                    { showEdit && <Link to={ "/edit-apartment/" + id } className="apt-edit d-inline-flex"/> }

                    { applicationCount !== 0 &&
                    <Link to={ `/apartments/${ id }/applications` } className="apt-applications d-inline-flex no-style">
                        <div style={ { marginLeft: 8.5, lineHeight: '31px' } }>{ applicationCount }</div>
                    </Link> }

                    { photo ?
                        <img src={ photo } className="apt-preview"/> :
                        <div className="no-apartment-image"/>
                    }
                    <div className="apt-initials">
                        <div className="font-weight-bold w-100" style={ { marginBottom: 10 } }>{ title }</div>
                        <div className="w-100 text-purple-white">
                            { `${ address.houseNumber } ${ address.street }, ${ address.city }` }
                        </div>
                    </div>
                    <div className="apt-internals text-purple-white d-flex d-inline-flex">
                        <div className="beds-icon p-2"/>
                        <span>{ beds } Bed</span>
                        <div className="bath-icon p-2"/>
                        <span>{ bath } Bath</span>
                        <div className="sqft-icon p-2 ml-auto"/>
                        <span>{ squareMeters } Sq Ft</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Apartment;
