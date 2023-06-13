import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "src/providers";
import { notificationProvider } from "@refinedev/mantine";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { authProvider } from "./authProvider";
import { Layout } from "./components/layout";
import { Notifications } from "@mantine/notifications";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { MantineProvider } from "@mantine/core";
import { ItemList } from "src/pages/items";
import { ModalsProvider } from "@mantine/modals";
import { SaleOrderList, SaleOrderCreate } from "src/pages/sale-orders";
import { DatesProvider } from "@mantine/dates";
import { ProductionOrderList } from "src/pages/production-orders";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryShade: 7,
          }}
        >
          <Notifications position="top-right" zIndex={2077} />
          <DatesProvider settings={{ locale: "vi" }}>
            <Refine
              notificationProvider={notificationProvider}
              dataProvider={dataProvider("http://127.0.0.1:3333/api")}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "production-orders",
                  list: "/production-orders",
                },
                {
                  name: "items",
                  list: "/items",
                  meta: {
                    label: "Hàng hoá",
                  },
                },
                {
                  name: "sale-orders",
                  list: "/sale-orders",
                  create: "/sale-orders/create",
                  meta: {
                    label: "Đơn bán hàng",
                  },
                },
              ]}
              options={{
                // syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <ModalsProvider>
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/items">
                      <Route index element={<ItemList />} />
                    </Route>
                    <Route path="/sale-orders">
                      <Route index element={<SaleOrderList />} />
                      <Route path="create" element={<SaleOrderCreate />} />
                    </Route>
                    <Route path="/production-orders">
                      <Route index element={<ProductionOrderList />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
              </ModalsProvider>
            </Refine>
          </DatesProvider>
        </MantineProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
