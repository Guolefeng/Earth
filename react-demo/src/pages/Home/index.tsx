import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <div
            style={{ padding: "20px" }}
            onClick={() => {
                navigate("/earth");
            }}
        >
            home
        </div>
    );
};

export default Home;
