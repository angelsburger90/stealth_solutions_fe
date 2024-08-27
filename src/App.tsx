import { useNavigationInterceptor } from "@hooks/session.management.hooks";
import { TAppPage } from "@model/data.types";
import LoginPage from "@page/login.page";
import UserDetailsPage from "@page/user.details.page";
import { Route, Routes} from "react-router-dom";

const App = () => {
  useNavigationInterceptor();
  return (
      <>
        <Routes>
          <Route path={TAppPage.ROOT} element={<LoginPage />} />
          <Route path={TAppPage.ALL} element={<LoginPage />} />
          <Route path={TAppPage.USER_DETAILS_PAGE} element={<UserDetailsPage />} />
        </Routes>
      </>
  );
}

export default App;

