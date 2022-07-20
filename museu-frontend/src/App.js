import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./contexts/auth";
import AppRoutes from "./routes/index";
import { theme } from "./styles/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
