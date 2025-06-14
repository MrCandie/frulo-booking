import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingsScreen from "./BookingsScreen";
import CreateBookingScreen from "./CreateBookingScreen";
const Stack = createNativeStackNavigator();

export default function Screen() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={BookingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking"
        component={CreateBookingScreen}
        options={{
          headerShown: true,
          headerTitle: "Book Service",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
