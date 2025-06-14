import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { format } from "date-fns";
import { useToast } from "../context/toast-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyComponent from "../components/EmptyComponent";

export default function BookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");

        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        setBookings(parsedBookings);
      } catch (error) {
        showToast("Error fetching bookings", "error");
      }
    }
    fetchBookings();
  }, []);

  const renderItem = ({ item }) => {
    const handleDelete = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");

        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        const filteredBookings = parsedBookings.filter(
          (el) => el.id !== item.id
        );
        setBookings(filteredBookings);
        await AsyncStorage.setItem(
          "bookings",
          JSON.stringify(filteredBookings)
        );

        showToast("Booking deleted");
      } catch (error) {
        showToast("Error deleting booking", "error");
      }
    };
    return (
      <TouchableOpacity onPress={handleDelete} style={styles.card}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.datetime}>
          {format(new Date(item.date), "PPpp")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      {bookings.length === 0 ? (
        <EmptyComponent message="No bookings yet. Tap below to create one!" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Booking")}>
        <Text style={styles.buttonText}>Create Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  service: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  datetime: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
