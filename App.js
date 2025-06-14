import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "./context/toast-context";
import Screen from "./screens";
import Toast from "./components/Toast";

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <Screen />
        <Toast />
      </ToastProvider>
    </NavigationContainer>
  );
}
