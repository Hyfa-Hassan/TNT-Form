import React from "react";
import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import Accordion from "react-bootstrap/Accordion";
import { getUsers, deleteForm } from "../apis/api";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    let res = await getUsers();
    setUsers(res.data);
    // console.log(res.data);
  };
  const deleteFormDetails = async (id) => {
    await deleteForm(id);
    getAllUsers();
  };
  return (
    <MDBRow>
      {users.map((user) => {
        return (
          <MDBCol>
            <MDBCard sm="3">
              <MDBCardBody>
                <div>
                  <MDBCardTitle>Form Details </MDBCardTitle>
                  <MDBCardText>Id : {user._id}</MDBCardText>
                  <MDBCardText>Day : {user.day}</MDBCardText>
                  <MDBCardText>City :{user.city}</MDBCardText>
                  <MDBCardText>Tags : {user.tag}</MDBCardText>
                  <MDBCardText>Tourdate : {user.tourdate}</MDBCardText>
                  <MDBCardText>Adults : {user.adults}</MDBCardText>
                  <MDBCardText>Children : {user.children}</MDBCardText>
                  <MDBCardText>Price Catagory : {user.price}</MDBCardText>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Inclusion</Accordion.Header>
                      <Accordion.Body>
                        {user.inclusion.map((inclusions) => {
                          return (
                            <>
                              <MDBCardText>
                                IconUrl : {inclusions.iconurl}
                              </MDBCardText>
                              <MDBCardText>
                                Title : {inclusions.title}
                              </MDBCardText>
                            </>
                          );
                        })}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Itenenary</Accordion.Header>
                      <Accordion.Body>
                        {user.itnenary.map((iteneneries) => {
                          return (
                            <>
                              <MDBCardText>
                                Day Number : {iteneneries.dayno}
                              </MDBCardText>
                              <MDBCardText>
                                Itenenary Title : {iteneneries.tittle}
                              </MDBCardText>
                              <MDBCardText>
                                ImgUrl : {iteneneries.imgurl}
                              </MDBCardText>
                              <MDBCardText>
                                Description : {iteneneries.description}
                              </MDBCardText>
                            </>
                          );
                        })}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <MDBBtn
                    className="w-25"
                    color="secondary"
                    href={`/edit/${user._id}`}
                  >
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    className="ms-1 "
                    color="danger"
                    onClick={() => deleteFormDetails(user._id)}
                  >
                    Delete
                  </MDBBtn>
                </div>{" "}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        );
      })}
    </MDBRow>
  );
};

export default AllUsers;
