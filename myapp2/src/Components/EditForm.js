import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { editUser, getUser, editUserDetails } from "../apis/api";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import allusers from "./AllUsers";

function EditForm() {
  // const [edit, setEdit] = useState();
  const [login, setLogin] = useState(false);
  const [incValues, setIncValues] = useState([
    {
      iconurl: "",
      title: "",
    },
  ]);
  const [itnValues, setItnValues] = useState([
    {
      dayno: "",
      tittle: "",
      imgurl: "",
      description: "",
    },
  ]);
  const [inputValues, setInputValue] = useState({
    day: "",
    city: "",
    tag: "",
    adults: "",
    children: "",
    price: "",
    tourdate: "",
    inclusions: [],
  });

  const [validation, setValidation] = useState({
    day: "",
    city: "",
    tag: "",
    adults: "",
    children: "",
    price: "",
    tourdate: "",
    iconurl: "",
    title: "",
    dayno: "",
    tittle: "",
    imgurl: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    loadUserDetails();
  }, []);
  const editUserDetails = async () => {
    await editUser(inputValues, incValues, itnValues, id);
    // navigate("/formDetails");
  };
  const loadUserDetails = async () => {
    const response = await getUser(id);
    setInputValue(response.data[0]);
    setIncValues(response.data[0].inclusion);
    setItnValues(response.data[0].itnenary);
  };
  function handleChange(event) {
    const { name, value } = event.target;

    setInputValue({ ...inputValues, [name]: value }); //inputvalues-->inputs passsed in usestate
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await editUserDetails(inputValues, incValues, itnValues, id);
    navigate("/formDetails");
    setInputValue({
      day: "",
      city: "",
      tag: "",
      adults: "",
      children: "",
      price: "",
      tourdate: "",
    });
    setIncValues([
      {
        iconurl: "",
        title: "",
      },
    ]);
    setItnValues([
      {
        dayno: "",
        tittle: "",
        imgurl: "",
        description: "",
      },
    ]);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("isLoggedin");
    console.log("data", data);
    setLogin(!login);
  }, []);

  useEffect(() => {
    // const arr = [inputValues, incValues, itnValues];
    window.localStorage.setItem("isLoggedin", JSON.stringify(login));
  }, [login]);

  const displus = (e) => {
    e.preventDefault();
    setIncValues([...incValues, { iconurl: "", title: "" }]);
  };

  const displuss = (e) => {
    e.preventDefault();
    setItnValues([
      ...itnValues,
      { dayno: "", tittle: "", imgurl: "", description: "" },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...incValues];
    list[index][name] = value;
    setIncValues(list);
  };

  const handleItnInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itnValues];
    list[index][name] = value;
    setItnValues(list);
  };

  const dispminus = (i) => {
    // e.preventDefault();
    const delVal = [...incValues];
    delVal.splice(i, 1);
    setIncValues(delVal);
  };
  const dispminuss = (i) => {
    // e.preventDefault();
    const delVal = [...itnValues];
    delVal.splice(i, 1);
    setItnValues(delVal);
  };
  return (
    <>
      {login && (
        <div className="form-container d-flex justify-content-center align-items-center flex-column">
          <div className="sign-up-form col-4">
            <form
              id="registrationForm"
              action="/login"
              method="POST"
              onSubmit={handleEdit}
            >
              <label className="labels">Days/Nights</label>
              <br />
              <input
                placeholder="E.g; 3 Days/ 4 Nights"
                type="string"
                name="day"
                id="day"
                className="input-field mb-3 form-control"
                onChange={(e) => handleChange(e)}
                value={inputValues.day}
                required
              />
              {validation.day && <p>{validation.day}</p>}

              <label className="labels">City</label>
              <br />
              <input
                placeholder="Enter the City name"
                type="string"
                id="city"
                name="city"
                className="input-field mb-3 form-control"
                onChange={(e) => handleChange(e)}
                value={inputValues.city}
                required
              />
              {validation.city && <p>{validation.city}</p>}

              <label className="labels">Tag</label>
              <br />
              <input
                placeholder="Enter the Tag"
                type="string"
                id="tag"
                name="tag"
                className="input-field mb-3 form-control"
                onChange={(e) => handleChange(e)}
                value={inputValues.tag}
                required
              />
              {validation.tag && <p>{validation.tag}</p>}

              <label className="labels">Number of Guests:</label>
              <br />
              <label className="labels">Adults</label>
              <br />
              <input
                placeholder="Enter the Number of Adults"
                type="number"
                name="adults"
                className="input-field mb-3 form-control"
                min="1"
                onChange={(e) => handleChange(e)}
                value={inputValues.adults}
                required
              />
              {validation.adults && <p>{validation.adults}</p>}

              <label className="labels">Children</label>
              <br />
              <input
                placeholder="Enter the number of Children"
                type="number"
                name="children"
                className="input-field mb-3 form-control"
                min="0"
                onChange={(e) => handleChange(e)}
                value={inputValues.children}
              />
              {validation.children && <p>{validation.children}</p>}

              <label className="labels">Price Catagory</label>
              <br />
              <input
                placeholder="Enter the Price Catagory"
                type="text"
                id="price"
                name="price"
                className="input-field mb-3 form-control"
                onChange={(e) => handleChange(e)}
                value={inputValues.price}
                required
              />
              {validation.price && <p>{validation.price}</p>}

              <label className="labels">Tour Date</label>
              <br />
              <input
                type="date"
                id="tourdate"
                name="tourdate"
                className="input-field mb-3 form-control"
                onChange={(e) => handleChange(e)}
                value={inputValues.tourdate}
                required
              />
              {validation.tourdate && <p>{validation.tourdate}</p>}

              <div className="d-flex flex-row justify-content-between">
                <label className="labels">Inclusion</label>
                <BsFillPlusCircleFill
                  onClick={displus}
                  style={{ cursor: "pointer", marginTop: "15px" }}
                />
              </div>

              {incValues.map((data, i) => {
                return (
                  <>
                    <div key={i} className="d-flex justify-content-between">
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <input
                            placeholder="Enter the Icon/Url"
                            type="text"
                            id="iconurl"
                            name="iconurl"
                            className="input-field col-5 form-control"
                            onChange={(e) => handleInputChange(e, i)}
                            value={data.iconurl}
                            required
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          {validation.iconurl && <p>{validation.iconurl}</p>}
                          <input
                            placeholder="Enter the Title"
                            type="text"
                            id="title"
                            name="title"
                            className="input-field col-5 form-control"
                            onChange={(e) => handleInputChange(e, i)}
                            value={data.title}
                            required
                          />
                          {validation.title && <p>{validation.title}</p>}
                        </Col>
                      </Row>
                      {i >= 1 ? (
                        <FaMinusCircle
                          onClick={() => dispminus(i)}
                          style={{
                            cursor: "pointer",
                            margin: "auto",
                            marginLeft: "5px",
                          }}
                        />
                      ) : (
                        <FaMinusCircle
                          onClick={() => dispminus(i)}
                          style={{ visibility: "hidden" }}
                        />
                      )}
                    </div>
                    <br />
                  </>
                );
              })}

              <div className="d-flex flex-row justify-content-between">
                <label className="labels">Itenenary</label>
                <BsFillPlusCircleFill
                  onClick={displuss}
                  style={{ cursor: "pointer", marginTop: "15px" }}
                />
              </div>
              {itnValues.map((data, i) => {
                return (
                  <>
                    <div className="d-flex ">
                      <div key={i} className="col-12 mb-4 ">
                        <input
                          placeholder="Enter the Day number"
                          type="text"
                          id="dayno"
                          name="dayno"
                          className="input-field mb-2 mt-2 form-control"
                          onChange={(e) => handleItnInputChange(e, i)}
                          value={data.dayno}
                          required
                        />
                        {validation.dayno && <p>{validation.dayno}</p>}

                        <input
                          placeholder="Enter the Title"
                          type="text"
                          id="tittle"
                          name="tittle"
                          className="input-field mb-2 form-control"
                          onChange={(e) => handleItnInputChange(e, i)}
                          value={data.tittle}
                          required
                        />
                        {validation.tittle && <p>{validation.tittle}</p>}
                        <input
                          placeholder="Enter the Image Url"
                          type="text"
                          id="imgurl"
                          name="imgurl"
                          className="input-field form-control mb-2"
                          onChange={(e) => handleItnInputChange(e, i)}
                          value={data.imgurl}
                          required
                        />
                        {validation.imgurl && <p>{validation.imgurl}</p>}
                        <textarea
                          placeholder="Enter the Description"
                          type="text"
                          id="description"
                          name="description"
                          className="input-field form-control"
                          onChange={(e) => handleItnInputChange(e, i)}
                          value={data.description}
                          required
                        />
                        {validation.description && (
                          <p>{validation.description}</p>
                        )}
                      </div>
                      <div>
                        {i >= 1 ? (
                          <FaMinusCircle
                            onClick={() => dispminuss(i)}
                            style={{ cursor: "pointer", marginLeft: "5px" }}
                          />
                        ) : (
                          <FaMinusCircle
                            onClick={() => dispminuss(i)}
                            style={{ visibility: "hidden" }}
                          />
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
              {/* <br /> */}
              <div className="d-flex justify-content-center">
                <button className="btn btn-secondary">Edit Form</button>
              </div>
            </form>
            {/* <div className="mt-3 text-center">
              want to update or delete the data ?{" "}
              <Link to="/allusers" style={{ textDecoration: "none" }}>
                <span> Click here</span>
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
export default EditForm;
