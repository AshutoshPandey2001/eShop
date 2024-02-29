import React, { useEffect, useState } from 'react'
import { productSchema } from '../../../../components/checkout/schemas'
import { db, storage } from '../../../../firebase/config'
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import { SET_ADMIN_LOGIN } from '../../../../redux/slice/authSlice'
import Table from 'react-bootstrap/Table';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { BiUpload } from "react-icons/bi"
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const initalValues = {
    name: "",
    id: "",
    cover: '',
    price: "",
    category: ""

}
const Products = () => {

    const [products, setProducts] = useState([])
    const [update, setUpdate] = useState(false)
    const [show, setShow] = useState(false);
    const [imgurl, setImgurl] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => {
        setShow(false);
        setImgurl('')
        setUpdate(false)
        values.id = '';
        values.name = '';
        values.category = '';
        values.price = ''
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
                    setShow(false);
                    setImgurl('')
                    action.resetForm()
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
                        setShow(false);
                        setImgurl('')
                        setUpdate(false)
                        action.resetForm()
                        console.log('ress', res)
                    }).catch((error) => {
                        console.log('errors', error);
                    })
                    console.log('update', products);
                }

            }


        }


    });

    const editProduct = (item) => {
        values.id = item.id;
        values.name = item.name;
        setImgurl(item.cover);
        values.category = item.category;
        values.price = item.price
        setUpdate(true)
        setShow(true);
    }

    const deleteProduct = (product) => {
        const newProducts = products.filter((item) => item.id !== product.id)
        confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure to Delete this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setProducts(newProducts)

                        db.collection("Products").doc('JWkiRFSNTFIEAz0Fh0Of').set({
                            product: newProducts
                        }).then((res) => {
                            console.log(res);
                        }).catch((error) => {
                            console.log('errors', error);
                        })
                    }
                },
                {
                    label: "No"

                }
            ]
        });


    }

    const uploadProductimg = (e) => {
        let file = e.target.files[0]
        var storagePath = 'Products/' + file.name;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            // progrss function ....
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            // error function ....
            console.log(error);
        }, () => {
            // complete function ....
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setImgurl(downloadURL)
                console.log(imgurl);
                values.cover = downloadURL
                console.log('formik', values);
            })
        })
    }
    return (
        <>

            <div >

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
                                        <td >
                                            <button onClick={() => editProduct(product)} style={{ marginLeft: '15px', color: 'orange' }}><MdEdit size={25} /></button>
                                            <button onClick={() => deleteProduct(product)} style={{ marginLeft: '15px', color: 'red' }} ><AiFillDelete size={25} /></button>
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
                            <span style={{ display: 'block', justifyContent: 'space-between' }}>
                                <img src={imgurl} alt='product img' style={{ width: '80px', height: '80px' }} />
                                <input type="file" class="form-control" style={{ fontSize: '18px' }} accept=".png, .jpg, .jpeg" name='cover' onChange={uploadProductimg} />
                            </span>
                            {errors.cover ? (<p style={{ color: 'red' }}>*{errors.cover}</p>) : null}
                        </div>
                        <div class="form-group">
                            <label for="sel1">Choose Category:</label>
                            <select className="form-control" style={{ height: '40px', fontSize: '18px' }} name='category' defaultValue={values.category} onChange={handleChange}>
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
            </Modal>

        </>
    )
}

export default Products