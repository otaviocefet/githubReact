import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Routes } from "react-router-dom";
import { AuthProvider } from "hooks/auth";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "styles/GlobalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer autoClose={2000} />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;