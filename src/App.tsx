import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RefineThemes, ThemedLayout, ThemedTitle } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { authProvider } from "./providers/auth-provider";
import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
// import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "protected-products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create",
              meta: { label: "Products" },
            }
          ]}
        >
          <Routes>
            <Route
              element={
               <Authenticated key="authenticated-routes" redirectOnFail="/login">
                  <ThemedLayout
                    Title={(props) => (
                      <ThemedTitle {...props} text="Awesome Project" />
                    )}
                  >
                    <Outlet />
                  </ThemedLayout>
                </Authenticated>
              }
            >
              <Route
                index
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
                  {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                  <NavigateToResource resource="protected-products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}