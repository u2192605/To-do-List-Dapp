import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Main } from './Components/Main';
import { SideBar } from './Components/SideBar';
import { RootState, store } from './redux/store'
import { Provider, useSelector } from 'react-redux';
import { TodosContainer } from './Components/TodosContainer';
import { categoryAPI } from './Services/CategoryAPI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        path: 'categories/',
        element: <Main />,
        loader: async ({ params }) => {
          const p = store.dispatch(categoryAPI.endpoints.getCategories.initiate(params))
          try {
            const response = await p.unwrap();
            return response;
          } catch (error) {
            return error;
          } finally {
            p.unsubscribe()
          }
        }
      },
      {
        path: 'categories/:ID',
        element: <TodosContainer />,
        loader: async ({ params }) => {
          console.log(params.ID, 'id')
          const p = store.dispatch(categoryAPI.endpoints.getCategoryByID.initiate(params.ID ?? ''))
          try {
            const response = await p.unwrap();
            console.log(response, 're')
            return response;
          } catch (error) {
            return error;
          } finally {
            p.unsubscribe()
          }
        },
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
