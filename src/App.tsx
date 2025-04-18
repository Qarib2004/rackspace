import router from './router/router';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import { themeConfig } from './core/configs/theme.config';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={themeConfig}>
                <div className="App">
                    <RouterProvider router={router} />
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="light"
                    style={{
                        minHeight: 'auto',
                        maxHeight: '80vh',
                        zIndex:100000000000000
                    }}
                />
            </ConfigProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;