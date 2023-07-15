import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./context/Global";
import { ThemeProvider } from "./context/ThemeContext";
import { GlobalStyle } from "./styles/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <GlobalProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalProvider>
  </>
);
