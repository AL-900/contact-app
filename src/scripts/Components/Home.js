import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LinkButton from './LinkButton';
import * as actions from '../hooks/redux/actions';

function Home() {
    const contactList = useSelector((state) => state);

    const formatting = (num) => {
        let number = num;

        if (number < 10) {
            number = `0${number}`;
        }
        return number;
    };

    const dispatch = useDispatch();
    const handleDlt = (e) => {
        dispatch({
            type: actions.DELETE_CONTACT,
            payload: e,
        });
    };

    if (contactList.length <= 0) {
        return (
            <section className="home">
                <div className="container">
                    <h1>Contact List</h1>

                    <h3>You don't have any contact . please add new contact</h3>
                    <div className="center">
                        <div className="btn">
                            <LinkButton to="/add" text="Add contact" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="home">
            <div className="container">
                <h1>Contact List</h1>
                <div className="center">
                    <div className="btn">
                        <LinkButton to="/add" text="Add contact" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Number</td>
                                <td>E-mail</td>
                                <td>Address</td>
                            </tr>
                        </thead>
                        <tbody>
                            {contactList.map((contact, index) => (
                                <tr key={Math.random()} className="tr">
                                    <td>{formatting(index + 1)}</td>
                                    <td>{contact?.name}</td>
                                    <td>{contact?.phone}</td>
                                    <td>{contact?.email}</td>
                                    <td>
                                        {contact?.address?.city},
                                        {contact?.address?.country}
                                    </td>

                                    <td>
                                        <LinkButton
                                            to={`/edit/${contact?.id}`}
                                            text="Edit"
                                        />
                                        <LinkButton
                                            text="Delete"
                                            to="/"
                                            onClick={() =>
                                                handleDlt(contact?.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Home;
