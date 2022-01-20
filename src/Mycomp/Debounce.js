import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "./Search.css";
const Debounce = () => {
    const [data, setData] = useState([]);
    const [dummydata, setDummyData] = useState([]);

    console.log(data, "data")

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const result = await axios.get("http://localhost:3005/data");
        console.log(result.data, "reverse");
        setData(result.data);
        setDummyData(result.data)
    };

    // const debounce = (func) => {
    //     let timelog;
    //     return function (...args){
    //         const text = this;
    //         clearTimeout(timelog)
    //         timelog = setTimeout(() => {
    //         timelog = null
    //             func.apply(text,args);
    //         }, 500)
    //     }
    // }

    const handleChange = (e) => {
        console.log(dummydata, "hjbjhbhjbh");
        let searchWord = e.target.value;
        searchWord = searchWord.trim();
        fetch(`http://localhost:3005/data?q=${searchWord}`)
        .then(response => response.json())
        .then((value) => setData(value));
    };

    const newHandleChange = useCallback(debounce(handleChange, 500), [])
    
    return (
        <div className="main">
            <div className="Input">
                <label>Search:
                    <input className="input-tag" placeholder="Enter Title" type="text" onChange={newHandleChange} />
                </label>
            </div>
            <div className="data-list">
                {data.map((user) => (
                    <div className="main2">
                        <div className="col-3">
                            <img src={user.image} alt={user.id + "Not found"} className='card-img-top' />
                            <div className='card-body'>
                                <h4 className='card-title'>Title: {user.title}</h4>
                                <p className='desc'>Description: {user.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Debounce;
