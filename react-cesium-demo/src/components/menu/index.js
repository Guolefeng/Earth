import React from 'react'
import './index.css'
import { Menu } from 'antd'
import { MENU } from '../../config'

const CMenu = ({ onSelect = () => {} }) => {
    return <Menu onSelect={onSelect} mode="inline">
        {Object.keys(MENU).map((id) => (<Menu.Item key={id}>{MENU[id].name}</Menu.Item>))}
    </Menu>
}

export default CMenu;