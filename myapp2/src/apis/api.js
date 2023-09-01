import axios from "axios";

const URL = "http://localhost:8000";

export const addUserDetails = async (data, incData, itnData) => {
  try {
    data.inclusion = incData;
    data.itnenary = itnData;
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.log("error while calling the Api", error);
  }
};
 
export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.log(`error while calling getUsers API`, error);
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling getUser api", error);
  }
};

export const editUser = async (data, incData, itnData, id) => {
  data.inclusion = incData;
  data.itnenary = itnData;

  try {
    return await axios.post(`${URL}/${id}`, data);
  } catch (error) {
    console.log(`error while calling editUser api`, error);
  }
};

export const deleteForm = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.log(`error while calling deleteForm api`, error);
  }
};
