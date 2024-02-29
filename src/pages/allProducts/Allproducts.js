import React, { useEffect, useState } from 'react'
import Productscard from '../../components/productCard/Productscard';
import { freshproduct, mobilesproduct, fashionsproduct, electronicsproduct } from '../../data';
import { db } from '../../firebase/config';

const Allproducts = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        chooseCategry()
    }, [])

    const chooseCategry = () => {
        let tem_data = []
        db.collection('Products').get().then((res) => {
            // let rss = res.data().product;
            res.forEach((doc) => {
                let data = doc.data().product;
                console.log(data)
                setCategory(data)
                console.log('data', data)
            })
        }).catch((error) => {
            console.error("Error updating document: ", error);

        });


    }

    return (
        <div className='container'>
            <div>
                {/* <h1>Fresh </h1> */}
                <Productscard category={category} />
            </div>

            {/* <div>
                <h1>Mobiles </h1>
                <Productscard category={mobilesproduct} />
            </div>

            <div>
                <h1>Fashion </h1>
                <Productscard category={fashionsproduct} />
            </div>

            <div>
                <h1>Electronics </h1>
                <Productscard category={electronicsproduct} />
            </div> */}

        </div>
    )
}

export default Allproducts;