import React, { useState } from 'react'
import { Spin } from 'antd'
import { Icon } from '@/components/purecomponents'

interface IProps {
    sider?: React.ReactElement | string | undefined | null; // 左侧组件
    breadcrumb?: React.ReactElement | string; // 顶部面包屑
    children?: React.ReactElement | string; // 子组件
    loading?: boolean; // 是否加载中
    backVisible?: boolean; // 是否显示回退按钮
    onBack?: Function; // 回退事件回调
}

const PageLayout = (props: IProps) => {
    const { sider, breadcrumb, children, loading = false, backVisible = false, onBack } = props
    const [fold, setFold] = useState(false) // left模块是否收起

    const onBackClick = () => {
        onBack?.()
    }

    return (
        <div className="pageLayout">
            <Spin spinning={loading} wrapperClassName="pageLayout-loading">
                <div className={`pageLayout-left ${fold ? 'pageLayout-left-fold' : ''}`}>
                    {sider}
                </div>
                <div className="pageLayout-right">
                    <div className="header">
                        <span className="header-btn">
                            <Icon
                                type={fold ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
                                onClick={() => setFold(!fold)}
                            />
                        </span>
                        {backVisible
                            ? (
                                <span className="header-backitem" onClick={onBackClick}>
                                    <span className="header-backitem-icon" />
                                    <span className="header-backitem-name">返回</span>
                                </span>
                            )
                            : null
                        }
                        {breadcrumb
                            ? (
                                <span className="header-crumbs">
                                    {breadcrumb}
                                </span>
                            )
                            : null
                        }
                    </div>
                    <div className="cont">
                        {children}
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default PageLayout