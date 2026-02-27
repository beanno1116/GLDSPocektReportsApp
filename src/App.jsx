

import './App.css';
import LoginView from "./Views/Login/LoginView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { LoaderModal } from "./Components/Loader/LoaderModal";
import HomeView from "./Views/Home/HomeView";
import AuthProvider, { AuthActionsProvider } from "./hooks/useAuth";
import { ApiClient, ApiClientProvider, getApiEndpoint } from "./Api/Api";
import ProtectedRoute from "./Views/ProtectedRoute";
import { AppContextProvider } from "./Contexts/AppContext";
import ManageUserView from "./Views/ManageUserUpdate/ManageUserView";
import ReportGroupsView from "./Views/ReportGroups/ReportGroupsView";
import StoreReportsView from "./Views/Reports/StoreReports/StoreReportsView";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import StoreLoyaltyDetails from "./Views/Reports/StoreReports/StoreLoyaltyDetails";
import StoreSalesDetails from "./Views/Reports/StoreReports/StoreSalesDetails";
import SafeReportsView from './Views/Reports/SafeReports/SafeReportsView';
import StoreReportsSettings from './Views/Reports/StoreReports/StoreReportsSettings';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000
    }
  }
});
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
          element: <HomeView />,
        },
        {
          path: "/manage/users",
          element: <ManageUserView />
        },
        {
          path: "/report/stores",
          element: <StoreReportsView />
        },
        {
          path: "/report/stores/safe",
          element: <SafeReportsView />
        },
        {
          path: "/report/stores/loyalty",
          element: <StoreLoyaltyDetails />
        },
        {
          path: "/report/stores/sales",
          element: <StoreSalesDetails /> 
        },
        {
          path: "/report/stores/settings",
          element: <StoreReportsSettings />
        },
        {
          path: "/report/groups",
          element: <ReportGroupsView />
        },
        {
          path: "/stores",
          element: <div style={{color:"snow"}}>Stores View</div>
        },
        {
          path: "/settings",
          element: <div style={{color:"snow"}}>Settings View</div>
        },
        {
          path: "/reports/customers",
          element: <StoreReportsView />
        },
        {
          path: "/reports/cashiers",
          element: <StoreReportsView />
        },
        {
          path: "/report/favorites",
          element: <StoreReportsView />
        },
        {
          path: "/report/builder",
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
                   <ReactQueryDevtools initialIsOpen={false} />
                  <div className="App">
                    <div className='app__main__view'>
                      <RouterProvider router={router} />
                      <LoaderModal />
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
