import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
const Image_data = () => {
    const [data, setData] = useState([]);
    const [dummydata, setDummyData] = useState([]);
    const [enterData, setEnterdata] = useState("");

    console.log(data, "data")
   
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const result = await axios.get("http://localhost:3005/data");
        console.log(result.data,"reverse");
        setData(result.data);
        setDummyData(result.data)
    };


    const handleChange = (e) => {
        console.log(dummydata,"hjbjhbhjbh");
        let searchWord = e.target.value;
        setEnterdata(searchWord);
        const newData = dummydata.filter(value => {
            console.log('aaaa>>>>>>')
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        console.log(newData, "newdata")

        if (searchWord === "" || searchWord === " ") {
            setData([]);
            window.location.reload(true)
         }
        else {
            setData(newData);
        }
    };
    return (
        <div className="main">
            <div className="Input">
                <label>Search:
                    <input className="input-tag" placeholder="Enter Title" type="text" onChange={handleChange} />
                </label>
            </div>
            <hr />
            {data.length !== 0 && (
                <div className="data-list">
                    {data.map((user) => (
                        <>
                            <div className="col-3">
                                <img src={user.image} alt={user.id + "Not found"} className='card-img-top' />
                                <div className='card-body'>
                                    <h4 className='card-title'>Title: {user.title}</h4>
                                    <p className='desc'>Description: {user.description}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Image_data;
