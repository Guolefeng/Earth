import React from 'react'
import { Menu } from 'antd'
import Icon from '../Icon'

const { SubMenu } = Menu

interface IData {
    path: string;
    name: string;
    icon?: string;
    children?: IData[];
}

interface IProps {
    data: IData[]; // 需渲染数据源
    openKeys?: string[]; // 当前展开的 SubMenu 菜单项 key 数组
    selectedKey?: string; // 当前选中的菜单项 key 数组
    onOpenChange?: Function; // SubMenu 展开/关闭的回调
    onSelectChange?: Function; // 点击选中 MenuItem 调用此函数
    [propsName: string]: any; // 其他属性
}

const BCPMenu = (props: IProps) => {
    const { data, openKeys, selectedKey, onOpenChange, onSelectChange, ..._props } = props

    const onMenuOpenChange = (keys: any[]) => {
        onOpenChange?.(keys)
    }

    const onMenuChange = (e: any) => {
        onSelectChange?.(e.key)
    }

    const renderMenu = (item: any) => {
        if (item?.children) {
            return (
                <SubMenu
                    key={item.path}
                    title={item.name}
                    icon={item.icon && <Icon type={item.icon} />}
                >
                    {item.children.length > 0 && item.children.map(renderMenu)}
                </SubMenu>
            )
        }

        return (
            <Menu.Item
                className={item.className}
                key={item.path}
                icon={item.icon && <Icon type={item.icon} />}
            >
                {item.name}
            </Menu.Item>
        )
    }

    return (
        <Menu
            selectedKeys={selectedKey ? [selectedKey] : []}
            openKeys={openKeys}
            onClick={onMenuChange}
            onOpenChange={onMenuOpenChange}
            {..._props}
        >
            {data?.map(renderMenu)}
        </Menu>
    )
}

export default BCPMenu