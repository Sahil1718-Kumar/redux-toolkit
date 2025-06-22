
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { imageBaseUrl } from '../utils/apiInstance';

const ViewDetails = ({ waiter, restaurant, menu, category, contactUs, heading, data, error, loading }) => {
    const navigate = useNavigate();


    if (error) return <div>{error}<br />Please try again after some time or check your internet connection.</div>

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-info shadow-dark border-radius-lg">
                                    <h6 className="text-white text-capitalize ps-3">{heading}</h6>
                                </div>
                            </div>
                            <div className="section-body position-relative">
                                {loading && (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                                            zIndex: 1000,
                                        }}
                                    >
                                        <div className="spinner-border text-info" role="status" style={{ width: '50px', height: '50px' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-12">
                                        <div className="card">

                                            {/* restaurant */}
                                            {restaurant &&
                                                <div className="card-body">
                                                    <div className="form-group mx-auto">
                                                        {data.user?.image && (
                                                            <div className="image-container text-center">
                                                                <img
                                                                    src={`${imageBaseUrl}/${data.user?.image}`}
                                                                    alt="restaurant"
                                                                    style={{
                                                                        width: "200px",
                                                                        height: "200px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "20%",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Restaurant Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="name"
                                                                    value={data.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Owner name</label>
                                                                <input
                                                                    type="text"
                                                                    id="owner"
                                                                    className="form-control "
                                                                    value={data.user?.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Email</label>
                                                                <input
                                                                    type="text"
                                                                    id="email"
                                                                    className="form-control "
                                                                    value={data.user?.email || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Phone No.</label>
                                                                <input
                                                                    type="phone"
                                                                    id="phone_no"
                                                                    className="form-control "
                                                                    value={`${data.country_code} ${data.phone}` || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Address</label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    className="form-control "
                                                                    value={data.address || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Opening Time</label>
                                                                <input
                                                                    type="text"
                                                                    id="opening_time"
                                                                    className="form-control "
                                                                    value={data.open_time || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Closing Time</label>
                                                                <input
                                                                    type="text"
                                                                    id="closing_time"
                                                                    className="form-control "
                                                                    value={data.close_time || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {/* category */}
                                            {category &&
                                                <div className="card-body">
                                                    <div className="form-group mx-auto">
                                                        {data.image && (
                                                            <div className="image-container text-center">
                                                                <img
                                                                    src={`${imageBaseUrl}/${data.image}`}
                                                                    alt="category"
                                                                    style={{
                                                                        width: "200px",
                                                                        height: "200px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "20%",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Category Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="name"
                                                                    value={data.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Status</label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    className="form-control "
                                                                    value={data.status === 1 ? 'Active' : (data.status === 0 ? 'Inactive' : '')}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }


                                            {/* waiter */}
                                            {waiter &&
                                                <div className="card-body">
                                                    <div className="form-group mx-auto">
                                                        {data.image && (
                                                            <div className="image-container text-center">
                                                                <img
                                                                    src={`${imageBaseUrl}/${data.image}`}
                                                                    alt="waiter"
                                                                    style={{
                                                                        width: "200px",
                                                                        height: "200px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "20%",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="name"
                                                                    value={data.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Restaurant Name</label>
                                                                <input
                                                                    type="text"
                                                                    id="text"
                                                                    className="form-control "
                                                                    value={data.restaurant?.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Owner name</label>
                                                                <input
                                                                    type="text"
                                                                    id="owner"
                                                                    className="form-control "
                                                                    value={data.restaurant?.user?.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Phone No.</label>
                                                                <input
                                                                    type="phone"
                                                                    id="phone_no"
                                                                    className="form-control "
                                                                    value={`${data.country_code} ${data.phone}` || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Email</label>
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    className="form-control "
                                                                    value={data.email || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Address</label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    className="form-control "
                                                                    value={data.location || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {/* menu */}
                                            {menu &&
                                                <div className="card-body">
                                                    <div className="form-group mx-auto d-flex justify-content-center">


                                                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ width: '200px' }}>
                                                            <div className="carousel-inner">
                                                                {data.itemImages && data.itemImages.length > 0 && data.itemImages[0].images ? (
                                                                    (() => {
                                                                        const images = data.itemImages[0].images.split(",").map(image => image.trim());
                                                                        return images.map((image, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                                                            >
                                                                                <img
                                                                                    src={`${imageBaseUrl}/${image}`}
                                                                                    className="d-block"
                                                                                    alt={`item-image ${index + 1}`}
                                                                                    style={{ objectFit: 'cover', height: '200px', width: '200px', borderRadius: "20%" }}
                                                                                />
                                                                            </div>
                                                                        ));
                                                                    })()
                                                                ) : (
                                                                    <div className="carousel-item active">
                                                                        <img
                                                                            src="/image-not-found.png"
                                                                            className="d-block"
                                                                            alt="No images available"
                                                                            style={{ objectFit: 'cover', height: '200px', width: '200px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button
                                                                className="carousel-control-prev"
                                                                type="button"
                                                                data-bs-target="#carouselExampleControls"
                                                                data-bs-slide="prev"

                                                            >
                                                                <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                                                                <span className="visually-hidden">Previous</span>
                                                            </button>
                                                            <button
                                                                className="carousel-control-next"
                                                                type="button"
                                                                data-bs-target="#carouselExampleControls"
                                                                data-bs-slide="next"
                                                            >
                                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Next</span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Item Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="name"
                                                                    value={data.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Category</label>
                                                                <input
                                                                    type="text"
                                                                    id="category"
                                                                    className="form-control "
                                                                    value={data.category?.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Price</label>
                                                                <input
                                                                    type="text"
                                                                    id="price"
                                                                    className="form-control "
                                                                    value={`$ ${data.price}` || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Availability</label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    className="form-control "
                                                                    value={data.availability === 1 ? 'Available' : (data.availability === 0 ? 'Sold Out' : '')}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="description">Description</label>
                                                                <textarea
                                                                    id="description"
                                                                    className="form-control  p-2"
                                                                    rows="4"
                                                                    value={data.description || ""}
                                                                    readOnly

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            }

                                            {/* contact us */}
                                            {contactUs &&
                                                <div className="card-body">
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="name"
                                                                    value={data.name || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="form-group mb-2">
                                                                <label>Email</label>
                                                                <input
                                                                    type="text"
                                                                    id="email"
                                                                    className="form-control "
                                                                    value={data.email || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-2">
                                                                <label>Phone No.</label>
                                                                <input
                                                                    type="text"
                                                                    id="phone"
                                                                    className="form-control "
                                                                    value={data.phone || ""}
                                                                    readOnly
                                                                    style={{ paddingLeft: '10px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="description">Message</label>
                                                                <textarea
                                                                    id="message"
                                                                    className="form-control  p-2"
                                                                    rows="5"
                                                                    value={data.message || ""}
                                                                    readOnly

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            }


                                            <div className=" text-end mx-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={() => navigate(-1)}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ViewDetails;



