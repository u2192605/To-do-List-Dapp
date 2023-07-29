import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Root } from "./Root";
// require('dotenv').config(); 


const rootElement = document.getElementById("root") as HTMLElement
rootElement.classList.add('h-full', 'w-full', 'mx-auto', 'p-4')
const root = ReactDOM.createRoot(
  rootElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Root/>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
