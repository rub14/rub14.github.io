import { Authenticated, Refine } from "@refinedev/core";
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
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Header } from "./components/header";
//import { Sider } from "./components/sider";
import {
  TestCreate,
  TestEdit,
  TestList,
  TestShow,
} from "./pages/tests";
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
import {
  ClassTestCreate,
  ClassTestEdit,
  ClassTestList,
  ClassTestShow,
} from "./pages/class_tests";
import {
  RiderTestCreate,
  RiderTestEdit,
  RiderTestList,
  RiderTestShow,
} from "./pages/rider_tests";
import { supabaseClient } from "./utility";
import { Judging, PickRider, ScoreTest } from "./pages/judging";
import { IconPencil } from "@tabler/icons";
import { Title } from "./components/title";

function App() {
  return (
    <BrowserRouter basename="/scoring-base">
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
                name: "movement_scores",
                identifier: "score_test",
                icon: <IconPencil />,
                create: "/judging/scoretest/:id"
              },
              {
                name: "tests",
                list: "/tests",
                create: "/tests/create",
                edit: "/tests/edit/:id",
                show: "/tests/show/:id",
                meta: {
                  canDelete: true,
                },
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
              {
                name: "class_tests",
                list: "/class_tests",
                create: "/class_tests/create",
                edit: "/class_tests/edit/:id",
                show: "/class_tests/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "rider_tests",
                list: "/rider_tests",
                create: "/rider_tests/create",
                edit: "/rider_tests/edit/:id",
                show: "/rider_tests/show/:id",
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
                    <ThemedLayoutV2 Header={() => <Header sticky/>} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<Navigate to="judging" />}
                />
                <Route path="/judging">
                  <Route index element={<Judging />} />
                  <Route path="pickrider/:id" element={<PickRider/>} />
                  <Route path="scoretest/:id" element={<ScoreTest/>} />
              
                </Route>
                <Route path="/tests">
                  <Route index element={<TestList />} />
                  <Route path="create" element={<TestCreate />} />
                  <Route path="edit/:id" element={<TestEdit />} />
                  <Route path="show/:id" element={<TestShow />} />
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
                <Route path="/class_tests">
                  <Route index element={<ClassTestList />} />
                  <Route path="create" element={<ClassTestCreate />} />
                  <Route path="edit/:id" element={<ClassTestEdit />} />
                  <Route path="show/:id" element={<ClassTestShow />} />
                </Route>
                <Route path="/rider_tests">
                  <Route index element={<RiderTestList />} />
                  <Route path="create" element={<RiderTestCreate />} />
                  <Route path="edit/:id" element={<RiderTestEdit />} />
                  <Route path="show/:id" element={<RiderTestShow />} />
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
