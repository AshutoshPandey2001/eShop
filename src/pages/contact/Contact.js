import React from 'react'
import './Contact.css'
import GoogleMapReact from 'google-map-react';
import Locationpin from '../../components/Locationpin';
import { contactusSchema } from '../../components/checkout/schemas';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const initalValues = {
    name: "",
    email: "",
    subject: "",
    message: "",

}

const Contact = () => {
    const location = {
        address: 'e shop Ashutosh.',
        lat: 22.270312799225835,
        lng: 70.76439518372406,
    }
    const navigate = useNavigate();


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initalValues,
        validationSchema: contactusSchema,
        onSubmit: (Values, action) => {
            console.log('formik', Values);
            toast.success("Your message was sent, thank you! We will Contact us Soon")
            navigate('/');
        }


    });

    return (
        <>
            <div className='page'>
                <div className='row contact'>
                    <h1>Get In touch With Us</h1>
                </div>
                <div className='row  formmap'>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-md-6 col-sm-12 col-12'>
                        <form className="contactForm" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="label" >Full Name</label>
                                        <input type="text" style={{ fontSize: '18px' }} className="form-control " name="name" placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.name && touched.name ? (<p style={{ color: 'red' }}>*{errors.name}</p>) : null}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="label" >Email Address</label>
                                        <input type="email" style={{ fontSize: '18px' }} className="form-control" name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.email && touched.email ? (<p style={{ color: 'red' }}>*{errors.email}</p>) : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" >Subject</label>
                                        <input type="text" style={{ fontSize: '18px' }} className="form-control" name="subject" placeholder="Subject" value={values.subject} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.subject && touched.subject ? (<p style={{ color: 'red' }}>*{errors.subject}</p>) : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" >Message</label>
                                        <textarea name="message" style={{ fontSize: '18px' }} className="form-control" cols="30" rows="4" placeholder="Message" value={values.message} onChange={handleChange} onBlur={handleBlur}></textarea>
                                        {errors.message && touched.message ? (<p style={{ color: 'red' }}>*{errors.message}</p>) : null}

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="submit" style={{ fontSize: '20px' }} value="Send Message" className="btn btn-primary" />
                                        <div className="submitting"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-md-6 col-sm-12 col-12'>
                        <div style={{ width: '100%', height: '500px' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "" }}
                                defaultCenter={location}
                                defaultZoom={17} >
                                <Locationpin
                                    lat={location.lat}
                                    lng={location.lng}
                                    text={location.address}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>

                <div className="row icons">

                    <div className="col-md-3 col-sm-6  ">
                        <div className="dbox w-100 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-map-marker faicon"></span>
                            </div>
                            <div className="text">
                                <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6  ">
                        <div className="dbox w-100 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-phone faicon"></span>
                            </div>
                            <div className="text">
                                <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6  ">
                        <div className="dbox w-100 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-paper-plane faicon"></span>
                            </div>
                            <div className="text">
                                <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6  ">
                        <div className="dbox w-100 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-globe faicon"></span>
                            </div>
                            <div className="text">
                                <p><span>Website</span> <a href="#">skyban.technology</a></p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Contact