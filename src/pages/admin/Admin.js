import React, { useEffect, useState } from 'react'
import "./Admin.css"
import Table from 'react-bootstrap/Table';
import { auth, db } from '../../firebase/config';
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { productSchema } from '../../components/checkout/schemas';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_ADMIN_LOGIN } from '../../redux/slice/authSlice';
import Menubar from './component/Navbar/navbar';

const initalValues = {
    name: "",
    id: "",
    cover: "",
    price: "",
    category: ""

}

const Admin = () => {
    const [products, setProducts] = useState([])
    const [update, setUpdate] = useState(false)
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const handleClose = () => {
        setShow(false);
        setUpdate(false)

    };
    const handleShow = () => setShow(true);
    useEffect(() => {

        dispatch(SET_ADMIN_LOGIN())

        db.collection('Products').get().then((res) => {
            // let rss = res.data().product;
            res.forEach((doc) => {
                let data = doc.data().product;
                console.log(data)
                setProducts(data)
                console.log('data', data)
            })
        }).catch((error) => {
            console.error("Error updating document: ", error);

        });
    }, [])


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initalValues,
        validationSchema: productSchema,
        onSubmit: (Values, action) => {
            console.log('formik', Values);

            if (!update) {
                let product2 = [...products, Values]
                db.collection("Products").doc('JWkiRFSNTFIEAz0Fh0Of').set({
                    product: product2
                }).then((res) => {
                    console.log('ress', res)
                }).catch((error) => {
                    console.log('errors', error);
                })
            } else {
                const findproduxindex = products.findIndex((item) => item.id === Values.id)

                if (findproduxindex >= 0) {
                    products[findproduxindex] = Values;
                    db.collection("Products").doc('JWkiRFSNTFIEAz0Fh0Of').set({
                        product: products
                    }).then((res) => {
                        console.log('ress', res)
                    }).catch((error) => {
                        console.log('errors', error);
                    })
                    console.log('update', products);
                }

            }

            action.resetForm()
        }


    });

    const editProduct = (item) => {
        values.id = item.id;
        values.name = item.name;
        values.cover = item.cover;
        values.category = item.category;
        values.price = item.price
        setUpdate(true)
        setShow(true);
    }

    return (
        <>
            <Menubar />
            <div style={{ marginLeft: "60px", marginTop: "8vh" }}>
                <Outlet />
            </div>

            {/* <div className='container'>

                <div className='row' style={{ textAlign: 'end' }} >
                    <span>  <BiPlus size={40} onClick={handleShow} /></span>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product) => {

                                return (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td><img src={product.cover} alt='img' style={{ width: '80px', height: '80px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td style={{ justifyContent: 'space-between', }}>
                                            <button onClick={() => editProduct(product)}><MdEdit /></button>
                                            <button><AiFillDelete /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>


            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div class="form-group">
                            <label >ID:</label>
                            <input type="number" class="form-control" style={{ fontSize: '18px' }} placeholder="Enter Product id" name='id' value={values.id} onChange={handleChange} />
                            {errors.id && touched.id ? (<p style={{ color: 'red' }}>*{errors.id}</p>) : null}
                        </div>
                        <div class="form-group">
                            <label >Product Name:</label>
                            <input type="text" class="form-control" style={{ fontSize: '18px' }} placeholder="Enter Product Name" name='name' value={values.name} onChange={handleChange} />
                            {errors.name && touched.name ? (<p style={{ color: 'red' }}>*{errors.name}</p>) : null}
                        </div>
                        <div class="form-group">
                            <label >Product Image:</label>
                            <input type="text" class="form-control" style={{ fontSize: '18px' }} placeholder="Enter Product Image url" name='cover' value={values.cover} onChange={handleChange} />
                            {errors.cover && touched.cover ? (<p style={{ color: 'red' }}>*{errors.cover}</p>) : null}
                        </div>
                        <div class="form-group">
                            <label for="sel1">Choose Category:</label>
                            <select className="form-control" style={{ height: '40px', fontSize: '18px' }} name='category' value={values.category} onChange={handleChange}>
                                <option selected disabled>Select Category</option>
                                <option value='fresh'>Fresh</option>
                                <option value='mobiles'>Mobiles</option>
                                <option value='fashion'>Fashion</option>
                                <option value='electronics' >Electronics</option>
                            </select>
                            {errors.category && touched.category ? (<p style={{ color: 'red' }}>*{errors.category}</p>) : null}
                        </div>
                        <div class="form-group">
                            <label >Price:</label>
                            <input type="number" class="form-control" style={{ fontSize: '18px' }} placeholder="Enter price of product" name='price' value={values.price} onChange={handleChange} />
                            {errors.price && touched.price ? (<p style={{ color: 'red' }}>*{errors.price}</p>) : null}
                        </div>



                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {update ? 'Update Product' : 'Add Product'}
                    </Button>
                </Modal.Footer>
            </Modal> */}

        </>
    )
}

export default Admin