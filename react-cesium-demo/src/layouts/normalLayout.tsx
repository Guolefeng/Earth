import React from 'react'
import { Layout } from 'antd'

const NormalLayout = (props: any) => {
    const { children } = props
    return <Layout className="layout">
        {children}
    </Layout>
}

export default NormalLayout