import React from 'react'
import { Footer, Header } from '../../pages'

const Defaultlayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Defaultlayout