import React, {useState, useCallback} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from "../components/CustomRadio"

//moved outside of Home component to optimize rendering (prevent unnecessary re-renders)
const renderResults = (results) => {
    if(results && results.length === 0){
        return <div>No results</div>;
    }
    //ternary to determin of user searched for show? or not, then renders show or actor grid accordingly
    if(results && results.length > 0){
        return results[0].show ? (
            <ShowGrid data={results} />
        ) : (
            <ActorGrid data={results} />
        );
    }
    return null;
};

const Home = () => {

    //useLastQuery is a custom hook (imported from misc/custom-hooks) that allows us to use sessionStorage to access the user's last query to populate the search field
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    //default searchOption state is shows
    const [searchOption, setSearchOption] = useState("shows");
    //this is true of searchOption is set to shows
    const isShowsSearch = searchOption === "shows";

    //useCallback is a React hook that creates one copy of a function to prevent unnecessary re-rendering
    const onInputChange = useCallback(ev => {
        setInput(ev.target.value);
    }, [setInput]);

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`)
        .then(result => {
            setResults(result)
        })
    };
    //13 is the keyCode for Return, so user can hit "return" key to submit search
    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch()
        }
    };
    //useCallback prevents rerendering of onRadioChange by creating only one copy that is reused
    const onRadioChange = useCallback(ev => {
        setSearchOption(ev.target.value);
    }, []); 

    return (
        <MainPageLayout>
            <SearchInput 
            type="text" 
            placeholder="Search for something!" 
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input} />
            <RadioInputsWrapper>

                <div>
                    <CustomRadio
                    label="Shows"
                    id="shows-search" 
                    value="shows" 
                    checked={isShowsSearch} 
                    onChange={onRadioChange}
                    />
                </div>
   
                <div>
                <CustomRadio
                    label="Actors"
                    id="actors-search" 
                    value="people" 
                    checked={!isShowsSearch} 
                    onChange={onRadioChange}
                    />
                </div>

            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults(results)}
        </MainPageLayout>
    )
}
export default Home
