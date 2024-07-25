import { Layout } from "antd";

const { Content } = Layout;

const MainLayout = (props: any) => {
    const { children } = props;

    return (
        <Layout className="mainLayout">
            <Content className="mainLayout-cont">{children}</Content>
        </Layout>
    );
};

export default MainLayout;
