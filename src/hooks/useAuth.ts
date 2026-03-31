import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useAuth = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);

    return {
        isAuthenticated: !!token,
        user,
    };
};

export default useAuth;
