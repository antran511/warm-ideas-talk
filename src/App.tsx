import {
  Authenticated,
  ErrorComponent,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "src/rest-data-provider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { authProvider } from "./authProvider";
import { Layout } from "./components/layout";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { MantineProvider } from "@mantine/core";
import { BlogPostList } from "src/pages/blog-posts";
import { ItemList } from "src/pages/items";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

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
          <ModalsProvider>
            <Refine
              dataProvider={dataProvider("http://127.0.0.1:3333/api")}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "items",
                  list: "/items",
                  meta: {
                    label: "Hàng hoá",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
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
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    {/* <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="show/:id" element={<BlogPostShow />} /> */}
                  </Route>
                  {/* <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route> */}
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
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </ModalsProvider>
        </MantineProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
