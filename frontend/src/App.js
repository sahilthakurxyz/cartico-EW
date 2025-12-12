import React, { Fragment, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/layout/Header/Banner";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { attachTokenToRequests, axiosInstance } from "./constants.js";
import Loading from "./components/layout/Loading.js";
import PaymentQuery from "./cartManagement/PaymentQuery.js";
import CollapseNav from "./components/layout/CollapseNav.js";
const NavMenu = React.lazy(() => import("./components/layout/Header/NavMenu"));
const ConfrimOrder = React.lazy(() => import("./cartManagement/ConfrimOrder"));
const UserList = React.lazy(() => import("./components/admin/UserList"));
const ProductReviews = React.lazy(() =>
  import("./components/admin/ProductReviews")
);
const NotFound = React.lazy(() => import("./components/layout/NotFound"));
const CreateImages = React.lazy(() =>
  import("./components/admin/CreateImages.js")
);
const MainLayout = React.lazy(() => import("./MainLayout"));
const Dashboard = React.lazy(() => import("./components/admin/Dashboard"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Profile = React.lazy(() => import("./components/User/Profile"));
const Products = React.lazy(() => import("./products/productFeature/Products"));
const ProductDetail = React.lazy(() =>
  import("./products/allProducts/ProductDetail")
);
const ProtectedRoute = React.lazy(() =>
  import("./components/Route/ProtectedRoute")
);
const Login = React.lazy(() => import("./components/User/Login"));

const Signup = React.lazy(() => import("./components/User/Signup"));
const ContactUS = React.lazy(() => import("./components/layout/ContactUS.js"));
const About = React.lazy(() => import("./components/layout/About.js"));
const ProfileUpdate = React.lazy(() =>
  import("./components/User/ProfileUpdate")
);
const UpdatePassword = React.lazy(() =>
  import("./components/User/UpdatePassword")
);
const Payment = React.lazy(() => import("./cartManagement/Payment"));
const OrderSuccess = React.lazy(() => import("./cartManagement/OrderSuccess"));
const PaymentFailed = React.lazy(() =>
  import("./cartManagement/PaymentFailed")
);
const MyOrders = React.lazy(() => import("./orderManagement/MyOrders"));
const OrderDetails = React.lazy(() => import("./orderManagement/OrderDetails"));
const ProductList = React.lazy(() => import("./components/admin/ProductList"));
const CreateProduct = React.lazy(() =>
  import("./components/admin/CreateProduct")
);
const OrderList = React.lazy(() => import("./components/admin/OrderList.js"));
const ForgetPassword = React.lazy(() =>
  import("./components/User/ForgetPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/User/ResetPassword")
);
const Cart = React.lazy(() => import("./cartManagement/Cart"));
const Shipping = React.lazy(() => import("./cartManagement/Shipping"));
const UpdateProduct = React.lazy(() =>
  import("./components/admin/UpdateProduct")
);

const UpdateOrder = React.lazy(() => import("./components/admin/UpdateOrder"));
const UpdateUser = React.lazy(() => import("./components/admin/UpdateUser"));

const App = () => {
  const dispatch = useDispatch();

  const { user, auth, loading } = useSelector((state) => state.user);

  useEffect(
    () => {
      dispatch(loadUser());
    },
    [dispatch],
    user
  );
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <Banner />
                  <Home />
                </MainLayout>
              </Suspense>
            }
          />

          <Route
            path="/product/:id"
            element={
              <MainLayout>
                <Suspense fallback={<Loading />}>
                  <ProductDetail />
                </Suspense>
              </MainLayout>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <Products />
                </MainLayout>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <ContactUS />
                </MainLayout>
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <About />
                </MainLayout>
              </Suspense>
            }
          />
          <Route
            path="/products/:keyword"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <Products />
                </MainLayout>
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/update/profile"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  tedRoute
                  loading={loading}
                  isAuthenticated={auth}
                >
                  <ProfileUpdate />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/update/password"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <UpdatePassword />
                </ProtectedRoute>
              </Suspense>
            }
          />
          {/* <Route
            path="/process/payment"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <Payment />
                </ProtectedRoute>
              </Suspense>
            }
          /> */}
          <Route
            path="/process/payment"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <PaymentQuery />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/shipping"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <Shipping />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <ConfrimOrder />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/success"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <OrderSuccess />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/payment/failed"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <PaymentFailed />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/orders"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <MyOrders />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute loading={loading} isAuthenticated={auth}>
                  <OrderDetails />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {user && (
            <Fragment>
              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      loading={loading}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      loading={loading}
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <ProductList />
                      </MainLayout>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/create/product"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      loading={loading}
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <CreateProduct />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/update/product/:id"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      loading={loading}
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <UpdateProduct />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      loading={loading}
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <OrderList />
                      </MainLayout>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/update/order/:id"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <NavMenu />
                      <UpdateOrder />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <UserList />
                      </MainLayout>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/update/user/:id"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <UpdateUser />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <ProductReviews />
                      </MainLayout>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/create/images"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute
                      isAuthenticated={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <CreateImages />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
            </Fragment>
          )}
          <Route
            path="/forget/password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgetPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset/password/:token"
            element={
              <Suspense fallback={<Loading />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <MainLayout>
                  <Cart />
                </MainLayout>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
          <Route path="/collapse" element={<CollapseNav />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
