import { Suspense } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from '@/App.tsx'

import { rootStore } from "@/store";

import 'normalize.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={rootStore}>
        <Suspense fallback={<div>loading...</div>}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Suspense>
    </Provider>
)
