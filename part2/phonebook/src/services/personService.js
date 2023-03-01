import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll =()=>{
    return axios
    .get(baseUrl)
    .then(res=>res.data)
}

const addPerson =(person)=>{
    return axios
    .post(baseUrl, person)
    .then(res=>res.data)
}


const deletePerson = (id)=>{
    return axios
    .delete(`${baseUrl}/${id}`)
    .then(res=>res.data)
}

export default {getAll, addPerson, deletePerson}