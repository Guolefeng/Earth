import { Layout } from "antd";
import { Earth } from "@/components/giscomponents";

const { Content } = Layout;

const MainLayout = (props: any) => {
    const { children } = props;

    return (
        <Layout className="mainLayout">
            <Content className="mainLayout-cont">
                <Earth />
                {children}
            </Content>
        </Layout>
    );
};

export default MainLayout;
