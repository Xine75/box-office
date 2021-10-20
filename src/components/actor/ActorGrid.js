import React from 'react'
import ActorCard from './ActorCard'
import IMAGE_NOT_FOUND from "../../images/not-found.png"


const ActorGrid = ({data}) => {
    return (
        <div>
            {
            data.map( ({person}) => (
            <ActorCard 
            key={person.id}  
            name={person.name} 
            country={person.country? person.country.name : null}
            birthday={person.birthday}
            deathday={person.deathday}
            gender={person.gender}
            image={person.image? person.image.medium : IMAGE_NOT_FOUND}
            summary={person.summary}
            /> )) 
            }
            </div>
        );
    };

export default ActorGrid

// const ShowGrid = ({data}) => {
//     return (
//     <div>
//         {
//         data.map( ({show}) => (
//         <ShowCard 
//         key={show.id} 
//         id={show.id} 
//         name={show.name} 
//         image={show.image? show.image.medium : IMAGE_NOT_FOUND}
//         summary={show.summary}
//         /> )) 
//         }
//         </div>
//     );
// };
