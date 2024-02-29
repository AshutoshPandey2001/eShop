import * as Yup from 'yup';

export const placeOrderSchema = Yup.object({
    fullName: Yup.string().min(4).max(15).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    mobileNo: Yup.string().min(10).max(10).required("Please Enter Your Mobile No."),
    address: Yup.string().min(10).max(20).required("Please Enter Your Address"),
    city: Yup.string().required("Please Enter Your City"),
    state: Yup.string().min(5).max(15).required("Please Enter Your State"),
    pincode: Yup.string().min(6).max(6).required("Please Enter Your Pincode"),
    paymentMode: Yup.string().required("Please Select Your Payemnt Mode")
})


export const contactusSchema = Yup.object({
    name: Yup.string().min(4).max(15).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    subject: Yup.string().min(5).max(30).required("Please Enter Subject."),
    message: Yup.string().min(10).max(200).required("Please Enter Your Message"),
})



export const productSchema = Yup.object({
    name: Yup.string().min(4).required("Please Enter Product Name"),
    id: Yup.number().required("Please Product id"),
    // cover: Yup.string().required("Please Enter images url."),
    price: Yup.number().required("Please Enter Price of product"),
    category: Yup.string().required("Please select Product Category"),
})