import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SideBar } from './Components/SideBar';
import { store } from './redux/store'
import { Provider } from 'react-redux';
import { TodoList } from './Pages/TodoList';
import { api } from './redux/apiSlice';
import { CategoryList } from './Pages/CategoryList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        path: 'categories/',
        element: <CategoryList />,
        loader: async () => {
          const p = store.dispatch(api.endpoints.getCategories.initiate())
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
        element: <TodoList />,
        loader: async ({ params }) => {
          const p = store.dispatch(api.endpoints.getTodosByCategoryID.initiate(params.ID ?? ''))
          try {
            const response = await p.unwrap();
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
