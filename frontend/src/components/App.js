import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [plaseholder, setPlaceholder] = useState("Loading");

    useEffect(() => {
        fetch("api/lead")
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
    }, [])

    const contacts = data.map(contact => {
        return <li key={contact.id}>
            {contact.name} - {contact.email}
        </li>
    })

    return <ul>
        {loaded ? contacts : plaseholder}
    </ul>
}

export default App;

const container = document.getElementById("app");
render(<App />, container);