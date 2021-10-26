/* eslint-disable no-underscore-dangle */
import React from 'react'
import {useParams} from "react-router-dom"
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useShow } from "../misc/custom-hooks"


const Show = () => {

    //uses object destructuring to grab the id off what is returned by useParams (a show object)
const {id} = useParams();

//useShow is a custom hook that uses useReducer to set several states for show (show, isLoading, and error)
const { show, isLoading, error }  = useShow(id)

    if(isLoading){
        return <div>Data is being loaded</div>
    }
    if(error) {
        <div>Error occurred: {error}</div>
    }

    //these key-value pairs come from the show object. Again, styled is used to provide styling for these elements
    return (
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />
            <InfoBlock>
                <h2>Details</h2>
                <Details status={show.status} network={show.network} premiered={show.premiered} />
            </InfoBlock>
            <div>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons}  />
            </div>
            <div>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast} />
            </div>
        </ShowPageWrapper>
    )
}

export default Show
