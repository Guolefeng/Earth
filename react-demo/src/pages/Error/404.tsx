import React from 'react'
import MainLayout from '@/layouts/mainLayout'

const NotFound = (props: any) => {
    const { history } = props

    const onClick = () => {
        history.push('/')
    }

    return (
        <MainLayout {...props}>
            <div className="notfound">
                <div className="notfound-img" />
                <p>对不起，您正在寻找的页面不存在。</p>
                <p>尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。</p>
                <div className="link" onClick={onClick}>返回首页</div>
            </div>
        </MainLayout>
    )
}

export default NotFound