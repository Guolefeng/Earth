import React, { useState } from 'react'
import './index.css'
import Menu from '../../components/menu'
import { MENU } from '../../config'

const Home = () => {
    const [cur, setCur] = useState('')
    return <div className="home">
        <Menu onSelect={({ key }) => setCur(MENU[key].component)} />
        {cur ? cur : null}
    </div>
}

export default Home