import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

const Image_data = () => {
    const [data, setData] = useState([]);
    const [enterData, setEnterdata] = useState("");

    console.log(data, "data")
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const result = await axios.get("http://localhost:3005/data");
        console.log(result.data.reverse());
        setData(result.data.reverse());
    };


    const handleChange = (e) => {
        const searchWord = e.target.value;
        setEnterdata(searchWord);
        console.log(searchWord, "search")
        const newData = data.filter(value => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        console.log(newData, "newdata")

        if (searchWord === "" || searchWord === " ") {
            setData([]);
        } else {
            setData(newData);
        }
    };

    return (
        <div>
            <div className="Input">
                <label>Search:
                    <input placeholder="Enter Title" type="text" value={enterData} onChange={handleChange} />
                </label>

            </div>
            <hr />
            {data.length !== 0 && (
            <div className="data-list">
                {data.map((user) => (
                    <>
                        <div className="col-3">
                            <img src={user.image} className='card-img-top' />
                            <div className='card-body text-dark'>
                                <h4 className='card-title'>Title: {user.title}</h4>
                                <div className="cls">
                                    <p className='desc'>Description: {user.description}</p>
                                </div>
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
