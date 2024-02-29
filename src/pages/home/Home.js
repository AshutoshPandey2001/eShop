import React, { useEffect, useState } from 'react'
import imageslider1 from '../../assests/imagesslider1.jpg'
import imageslider2 from '../../assests/imageslider2.jpg'
import imageslider3 from '../../assests/imagesslider3.jpg'
import imageslider4 from '../../assests/imagesslider4.jpg'
import freshImg from '../../assests/Freshcategry.jpg'
import mobileImg from '../../assests/mobilecategry.jpg'
import fashionImg from '../../assests/Fashioncategry.jpg'
import electronicsImg from '../../assests/Electronic_categry.jpg'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import styles from './Home.module.scss'
import Productscard from '../../components/productCard/Productscard';
import { freshproduct, mobilesproduct, fashionsproduct, electronicsproduct } from '../../data';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'

const images = [
    { url: imageslider1 },
    { url: imageslider2 },
    { url: imageslider3 },
    { url: imageslider4 },

];
const Home = ({ addToCart }) => {

    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    useEffect(() => {
        chooseCategry('fresh')
    }, [])

    const chooseCategry = (item) => {
        let tem_data = []
        db.collection('Products').get().then((res) => {
            // let rss = res.data().product;
            res.forEach((doc) => {
                let data = doc.data().product;
                console.log(data)
                data.map((product) => {
                    if (product.category == item) {
                        tem_data.push(product)

                    } else {

                    }

                })
                setCategory(tem_data)
                console.log('data', data)
            })
        }).catch((error) => {
            console.error("Error updating document: ", error);

        });


    }
    return (
        <>
            <Fade>
                {images.map((fadeImage, index) => (
                    <div className="each-fade" key={index} >
                        <div className="image-container">
                            <img src={fadeImage.url} width="100%" alt='' height="504px" />
                        </div>
                        <h2>{fadeImage.caption}</h2>
                    </div>
                ))}
            </Fade>
            <div>
                <h1 style={{ marginTop: '10px', marginLeft: '20px' }}>Category</h1>
                <div>
                    <ul className={styles.category}>
                        <li onClick={() => chooseCategry('fresh')}><img src={freshImg} alt='' /><h4>Fresh</h4></li>
                        <li onClick={() => chooseCategry('mobiles')}><img src={mobileImg} alt='' /> <h4>Mobiles</h4></li>
                        <li onClick={() => chooseCategry('fashion')}><img src={fashionImg} alt='' /><h4>Fashions</h4></li>
                        <li onClick={() => chooseCategry('electronics')}><img src={electronicsImg} alt='' /><h4>Electronics</h4></li>
                        <li onClick={() => navigate('/allProducts')}><h3>See All</h3></li>
                    </ul>
                </div>
            </div>

            <div>
                <Productscard category={category} />
            </div>
        </>
    )
}

export default Home;