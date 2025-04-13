import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
