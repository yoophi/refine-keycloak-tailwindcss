import { Refine } from "@pankod/refine-core";
import {
  ErrorComponent,
  Layout,
  notificationProvider,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import axios from "axios";

import "@pankod/refine-antd/dist/reset.css";

import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { API_URL } from "./const";
import { useKeycloakAuthProvider } from "./hooks/useKeycloakAuth";
import { Button } from "react-daisyui";

const SampleHeader = () => (
  <>
    <div className="flex w-[100%] justify-between bg-gray-200 px-6 py-2">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="w-[200px]">
        <Button color="primary" className="w-[100%]">
          DaisyUI Button
        </Button>
      </div>
    </div>
  </>
);

const App: React.FC = () => {
  const { initialized, authProvider } = useKeycloakAuthProvider();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Refine
      Header={SampleHeader}
      LoginPage={Login}
      authProvider={authProvider}
      dataProvider={dataProvider(API_URL, axios)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
      notificationProvider={notificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
};

export default App;
