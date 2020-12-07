import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [plaseholder, setPlaceholder] = useState("Loading");

    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const getData = () => fetch("api/lead")
        .then(res => {

            if (res.status > 400) {
                return setPlaceholder("Something went wrong!");
            }

            return res.json();
        })
        .then(data => {
            setData(data);
            setLoaded(true);
        })

    const postData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
        console.log(requestOptions.body);
        fetch('api/lead/', requestOptions)
            .then((res) => {
                if (res.status === 201) {
                    getData();
                }
            })
    }

    const handleChange = (e) => {
        setForm((prevForm) => {
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    }

    useEffect(() => {
        getData();
    }, [])

    const contacts = data.map(contact => {
        return <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.message}
        </li>
    })

    return <>
        <div style={{ border: "1px solid black" }}>
            <form>
                <label>
                    Name:
                <input type="text" name="name" value={form.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                <input type="text" name="email" value={form.email} onChange={handleChange} />
                </label>
                <label>
                    Message:
                <input type="text" name="message" value={form.message} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
        <ul>
            {loaded ? contacts : plaseholder}
        </ul>
    </>
}

export default App;

const container = document.getElementById("app");
render(<App />, container);