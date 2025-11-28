import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import { authProvider } from "./providers/auth-provider";
import { dataProvider } from "./providers/data-provider";


import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Header } from "./components/header";
import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        // resources={[
        //   {
        //     name: "protected-products",
        //     list: "/products",
        //     show: "/products/:id",
        //     edit: "/products/:id/edit",
        //     create: "/products/create",
        //     meta: { label: "Products" },
        //   },
        // ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" fallback="/login">
                <Header />
                {/* <Outlet /> */}
                {/* <ShowProduct /> */}
                {/* <EditProduct /> */}
                <ListProducts />
                {/* <CreateProduct /> */}
              </Authenticated>
            }
          >
            <Route
              index
              // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
              // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
              element={<NavigateToResource resource="protected-products" />}
            />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                <NavigateToResource resource="protected-products" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}