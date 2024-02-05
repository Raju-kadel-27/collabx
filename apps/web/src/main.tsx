import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store } from "./app/store";
import { ReactFlowProvider } from "reactflow";
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense, useState } from "react";
import { PulseLoader } from "react-spinners";

const customTheme = extendTheme({
  styles: {
    global: {
      '.chakra-sidebar': {
        width: '20px',
      },
    },
  },
});

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const rootElement = document.getElementById('root');

const RootComponent = () => {

  const [_errorMessage, setErrorMessage] = useState<string>('');

  const ErrorFallback = (
    { error, resetErrorBoundary }
      : { error: unknown; resetErrorBoundary: unknown; }
  ) => {
    console.log('Errorfallback is called');
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error?.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  const logError = (error: any) => {
    console.log('LogError is called')
    setErrorMessage(error.message);
    console.error(error);
  };
  const handleResetError = () => {
    console.log("HandleResetError is called");
    setErrorMessage("");
  };
  return (
    <ErrorBoundary
      onError={logError}
      onReset={handleResetError}
      fallbackRender={ErrorFallback}
    >
      <Provider store={store}>
        <ReactFlowProvider>
          <ChakraProvider theme={customTheme}>
            <BrowserRouter>
              <Suspense fallback={<PulseLoader color="blue" size={24} />}>
                <Routes>
                  <Route path='/*' element={<App />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ChakraProvider>
        </ReactFlowProvider>
      </Provider>
    </ErrorBoundary >
  );
};

ReactDOM.createRoot(rootElement as HTMLElement).render(<RootComponent />)



