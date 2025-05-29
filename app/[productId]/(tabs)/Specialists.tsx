import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Sample data with new fields
const doctors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    type: 'Cardiologist',
    rating: 4.8,
    patients: 320,
    price: 120,
    image:
      'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    type: 'Dermatologist',
    rating: 4.5,
    patients: 290,
    price: 100,
    image:
      'https://media.istockphoto.com/id/1371998919/photo/cropped-portrait-of-an-attractive-young-female-doctor-giving-thumbs-up-while-working-in-her.jpg?s=612x612&w=0&k=20&c=5oPD2p5gc7ZQjgyjPAJui9eOGKF8sK_GG6MJpYXmA7s=',
  },
  {
    id: '3',
    name: 'Dr. Alex Brown',
    type: 'Neurologist',
    rating: 4.9,
    patients: 410,
    price: 150,
    image: 'https://thumbs.dreamstime.com/b/indian-male-doctor-25181027.jpg',
  },
  {
    id: '4',
    name: 'Dr. Eva White',
    type: 'Pediatrician',
    rating: 4.7,
    patients: 370,
    price: 110,
    image:
      'https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg',
  },
  {
    id: '5',
    name: 'Dr. Liam Grey',
    type: 'Oncologist',
    rating: 4.6,
    patients: 215,
    price: 160,
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxAQEA8QDxAPDQ0NDw8PDw8PDg0QFREWFhURFRUYHSggGBolHhcVIjEhKCkrLi4uFx8zODMtOCgtLisBCgoKDg0OGhAQFysgIB4rLTArLS8tLS0tLS0tLSstLS0tLS0tLystKy0tKysrLS0tLS0rLSsrLS0tKy0tKy0tLf/AABEIALcBEwMBIgACEQEDEQH/...', // (keep the rest of base64)
  },
  {
    id: '6',
    name: 'Dr. Sofia Lee',
    type: 'Psychiatrist',
    rating: 4.4,
    patients: 280,
    price: 95,
    image: 'https://img.freepik.com/free-photo/portrait-smiling-young-doctor-with-stethoscope_23-2149213162.jpg',
  },
];

const DoctorCard = ({ doctor }) => (
  <View style={styles.card}>
    <Image source={{ uri: doctor.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.type}>{doctor.type}</Text>
      <Text style={styles.rating}>⭐ {doctor.rating} ({doctor.patients} patients)</Text>
      <Text style={styles.price}>From ${doctor.price} per consult</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.consultButton]}>
          <Text style={styles.buttonText}>Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function App() {
  return (
    <FlatList
      data={doctors}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DoctorCard doctor={item} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  type: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  rating: {
    color: '#666',
    fontSize: 13,
  },
  price: {
    color: '#333',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  consultButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
});