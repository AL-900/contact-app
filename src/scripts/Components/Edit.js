import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import LinkButton from './LinkButton';
import * as actions from '../hooks/redux/actions';

function Edit() {
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const history = useNavigate();
    const contactList = useSelector((contact) => contact);
    const { user } = useParams();
    const dispatch = useDispatch();
    const checkEmail = contactList.find(
        (contact) =>
            contact.id !== parseInt(user, 10) && contact.email === editEmail
    );
    const checkPhone = contactList.find(
        (contact) =>
            contact.id !== parseInt(user, 10) && contact.phone === editPhone
    );

    const currentContact = contactList.filter(
        (contact) => contact.id === parseInt(user, 10)
    );

    console.log(currentContact);
    const {
        name,
        email,
        phone,
        address: { city, country },
    } = currentContact[0];

    useEffect(() => {
        setEditName(name);
        setEditEmail(email);
        setEditCity(city);
        setEditCountry(country);
        setEditPhone(phone);
    }, [phone, name, city, country, email]);

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !city || !country) {
            toast.warning('Please fill the input !');
        }
        if (checkEmail) {
            toast.error('This E-mail is exist');
        }
        if (checkPhone) {
            toast.error('This Phone number is exist');
        }

        const updateData = {
            id: parseInt(user, 10),
            name: editName,
            email: editEmail,
            phone: editPhone,
            address: {
                city: editCity,
                country: editCountry,
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
                type: actions.EDIT_CONTACT,
                payload: updateData,
            });
            history('/');
        }
    };

    if (currentContact === []) {
        return (
            <div>
                <h1>this contact is not available</h1>
            </div>
        );
    }
    return (
        <section className="edit">
            <div className="container">
                <div>
                    <h1>
                        edit <span className="text-yellow">{`${name}'s`}</span>{' '}
                        info
                    </h1>
                </div>
                <br />
                <form onSubmit={handleEditFormSubmit}>
                    <FormInput
                        type="text"
                        placeholder="Your name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <FormInput
                        type="email"
                        placeholder="Your e-mail"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder="Your phone number"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder="Your city "
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        placeholder="Your Country "
                        value={editCountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                    />
                    <LinkButton
                        text="submit"
                        type="submit"
                        className="submitEditBtn"
                    />
                    <LinkButton
                        text="CENCEL"
                        to="/"
                        className="submitEditBtn"
                    />
                </form>
            </div>
        </section>
    );
}

export default Edit;
