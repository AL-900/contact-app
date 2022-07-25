import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import LinkButton from './LinkButton';
import * as actions from '../hooks/redux/actions';

function Add() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    const newMakeId = () => {
        let i;
        if (contacts.length <= 0) {
            i = 1;
        } else i = contacts.length + 1;
        return i;
    };
    const checkEmail = contacts.find((contact) => contact.email === email);
    const checkPhone = contacts.find((contact) => contact.phone === phone);
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !city || !country) {
            toast.warning('Please Fill All Inputs   !');
        }
        if (checkEmail) {
            toast.error('This E-mail is exist !');
        }
        if (checkPhone) {
            toast.error('This Phone number is exist !');
        }

        const newData = {
            id: newMakeId(),
            name,
            email,
            phone,
            address: {
                city,
                country,
            },
        };
        if (
            !checkEmail &&
            !checkPhone &&
            name &&
            email &&
            phone &&
            city &&
            country
        ) {
            dispatch({
                type: actions.ADD_CONTACT,
                payload: newData,
            });
            history('/');
        }
    };

    return (
        <div className="add">
            <div className="container">
                <div>
                    <h1>add new contact</h1>
                </div>
                <br />
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        placeholder=" name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormInput
                        type="email"
                        placeholder=" e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder=" phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder=" city "
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder=" Country "
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <LinkButton
                        text="submit"
                        type="submit"
                        className="submitBtn"
                    />
                    <LinkButton text="CENCEL" to="/" className="submitBtn" />
                </form>
            </div>
        </div>
    );
}

export default Add;
