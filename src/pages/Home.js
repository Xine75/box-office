import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {

    const [input, setInput] = useState("");

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    };

    const onKeyDown = (ev) => {

    }

    const onSearch = () => {

        fetch(`https://api.tvmaze.com/singlesearch/shows?q=${input}`)
        .then(resp => resp.json())
        .then(result => {
            console.log(result)
        })
    };

    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
            <button type="button" onClick={onSearch}>Search</button>
        </MainPageLayout>
    )
}

export default Home
