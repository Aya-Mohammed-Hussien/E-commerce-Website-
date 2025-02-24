import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/Categories/Categories.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import ProtectedAuthRoute from "./components/ProtectedRoutes/ProtectedAuthRoute.jsx";
import Products from "./components/Products/Products.jsx";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import WishList from "./components/WishList/WishList.jsx";
import ProductContextProvider from "./Context/ProductContext.jsx";
import BrandsContextProvider from "./Context/BrandsContext.jsx";
import CategoryContextProvider from "./Context/CategoryContext.jsx";
import Order from "./components/Order/Order.jsx";
import { Offline } from "react-detect-offline";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";



const client = new QueryClient();
function App() {
  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "login", element: <ProtectedAuthRoute><Login /> </ProtectedAuthRoute>  },
        { path: "forgetpassword", element: <ProtectedAuthRoute><ForgetPassword /> </ProtectedAuthRoute>  },
        { path: "register", element: <ProtectedAuthRoute> <Register/></ProtectedAuthRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "categories", element:<ProtectedRoute><Categories /></ProtectedRoute>  },
        { path: "products", element:<ProtectedRoute><Products/> </ProtectedRoute>  },
        { path: "productDetails/:id", element:<ProtectedRoute><ProductDetails/> </ProtectedRoute>  },
        { path: "order", element:<ProtectedRoute><Order/> </ProtectedRoute>  },
        { path: "allorders", element:<ProtectedRoute><AllOrders/> </ProtectedRoute>  },
        { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute>  },
        { path: "wishList", element: <ProtectedRoute> <WishList/></ProtectedRoute>  },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <CartContextProvider>
          <UserContextProvider>
           <WishlistContextProvider>
             <CategoryContextProvider>
              <BrandsContextProvider>
               <ProductContextProvider>
                <RouterProvider router={routes}></RouterProvider>
               </ProductContextProvider>
              </BrandsContextProvider>
             </CategoryContextProvider>
           </WishlistContextProvider>
          </UserContextProvider>
         <Toaster/>
        </CartContextProvider>
      </AuthContextProvider>
      </QueryClientProvider>
      <Offline>
        <div className="bg-black p-2 text-white font-medium fixed bottom-2 left-2">
        "You are currently offline. Please check your internet connection."
        </div>
      </Offline>
    </>
  );
}

export default App;


