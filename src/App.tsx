import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { Sider } from "./components/sider";
import {
  MovementCreate,
  MovementEdit,
  MovementList,
  MovementShow,
} from "./pages/movements";
import {
  CompClassCreate,
  CompClassEdit,
  CompClassList,
  CompClassShow,
} from "./pages/comp_classes";
import { supabaseClient } from "./utility";
import { EnterJudging } from "./pages/judge_tests";
import { IconPencil } from "@tabler/icons";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "judge_tests",
                list: "judge_tests",
                icon: <IconPencil />
              },
              {
                name: "movements",
                list: "/movements",
                create: "/movements/create",
                edit: "/movements/edit/:id",
                show: "/movements/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "comp_classes",
                list: "/comp_classes",
                create: "/comp_classes/create",
                edit: "/comp_classes/edit/:id",
                show: "/comp_classes/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "jjltjneewrfwbnveluwp",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2 Header={() => <Header sticky />} Sider={() => <Sider /> }>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="judge_tests" />}
                />
                 <Route path="/judge_tests">
                  <Route index element={<EnterJudging />} />
                </Route>
                <Route path="/movements">
                  <Route index element={<MovementList />} />
                  <Route path="create" element={<MovementCreate />} />
                  <Route path="edit/:id" element={<MovementEdit />} />
                  <Route path="show/:id" element={<MovementShow />} />
                </Route>
                <Route path="/comp_classes">
                  <Route index element={<CompClassList />} />
                  <Route path="create" element={<CompClassCreate />} />
                  <Route path="edit/:id" element={<CompClassEdit />} />
                  <Route path="show/:id" element={<CompClassShow />} />
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
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        defaultValues: {
                          email: "judging@virtualworkingequitation.com",
                          password: "guestAcce$$",
                        },
                      }}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
