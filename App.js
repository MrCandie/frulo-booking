import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "./context/toast-context";
import Screen from "./screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "./components/Toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Screen />
          <Toast />
        </ToastProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
