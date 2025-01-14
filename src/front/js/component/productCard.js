import React, { useState, useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { store, actions } = useContext(Context);

  const handleSelected = (id) => {
    actions.getproduct(id);
  };

  return (
    <div className="card mx-3" style={{ width: "18rem" }}>
      <img src={rigoImage} className="card-img-top" alt="..." />
      <div className="card-body m-2 ">
        <h5 className="card-title">
          Product
        </h5>
        <h5 className="card-title">
          Nombre:
          <strong> {props.name}</strong>
        </h5>
        <p className="card-text">Price: {props.price}</p>
        <p className="card-text">Category: {props.category}</p>
        <p className="card-text">In stock: {props.stock}</p>
        <p className="card-text">id: {props.id}</p>


        <div className="d-flex justify-content-between">
          <Link
            to={"/productdetail/" + props.id}
            className="btn btn-outline-primary"
          >
            <span>Editar</span>
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop2"
            onClick={() => handleSelected(props.id)}
          >
            Delete
          </button>

          <div
            className="modal fade"
            id="staticBackdrop2"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel2"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel2">
                    Are you sure do you want to erase this contact?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Once you erase this contact, you will not be able to recover
                    it.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      actions.deleteproduct();
                    }}
                  >
                    Yes, erase it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
