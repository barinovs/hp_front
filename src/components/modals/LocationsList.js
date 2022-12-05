import React from 'react'
import {Modal} from 'react-bootstrap'

const LocationsList = ({items, handleLocationChoice, show}) => {
    return (
        <div style={{display: show ? 'block' : 'none'}}>
            <select size={5}>
                {items.map((item) => (
                    <option
                        onClick={(e) => {
                            handleLocationChoice(item.name, item.id)
                        }}
                        locationid={item.id}
                    >
                        {item.name}
                        <span style={{fontStyle: 'italic'}}>{item.parent}</span>
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LocationsList
