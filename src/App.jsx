import MainView from "./Views/Main/MainView"

import './App.css';
import LoginView from "./Views/Login/LoginView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { LoaderModal } from "./Components/Loader/LoaderModal";
import HomeView from "./Views/Home/HomeView";
import AuthProvider, { AuthActionsProvider } from "./hooks/useAuth";
import { ApiClient, ApiClientProvider, getApiEndpoint } from "./Api/Api";
import ProtectedRoute from "./Views/ProtectedRoute";
import ItemReportsView from "./Views/ItemReports/ItemReportsView";
import { AppContextProvider } from "./Contexts/AppContext";
import StoreSelectorView from "./Views/StoreSelector/StoreSelectorView";
import StoreReportsView from "./Views/StoreReports/StoreReportsView";

// import Api, { ApiClient, ApiClientProvider, getApiEndpoint } from "./Api/Api";

// login username password
// register username password accessCode
// users post 

const queryClient = new QueryClient();
const apiClient = new ApiClient(getApiEndpoint(false));

const AppViewOutlet = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute><AppViewOutlet><Outlet /></AppViewOutlet></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <HomeView />
        },
        {
          path:"/stores/selector",
          element: <StoreSelectorView />
        },
        {
          path: "/reports/item",
          element: <ItemReportsView />
        },
        {
          path: "/reports/store",
          element: <StoreReportsView />
        },
        {
          path: "/reports/customer",
          element: <StoreReportsView />
        },
        {
          path: "/reports/cashier",
          element: <StoreReportsView />
        },
        {
          path: "/reports/favorites",
          element: <StoreReportsView />
        },
        {
          path: "/reports/builder",
          element: <StoreReportsView />
        }
      ]
    },
    {
      path:"login",
      element:<LoginView />
    }
  ])

  return (
    <>
      <AppContextProvider>
        <ApiClientProvider client={apiClient}>
          <AuthProvider>
            <AuthActionsProvider>          
                <QueryClientProvider client={queryClient}>
                  <div className="App">
                    <div className='app__main__view'>
                      <RouterProvider router={router} />
                      <LoaderModal />                      
                      {/* <LoginView /> */}
                      {/* <MainView /> */}
                    </div>      
                  </div>
                </QueryClientProvider>
            </AuthActionsProvider>
          </AuthProvider>
        </ApiClientProvider>
      </AppContextProvider>
    </>
  )
}

export default App
