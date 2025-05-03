// Firebase Configuration for Global Film Festival 2025 Web Application

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "globalfilmfest2025.firebaseapp.com",
  projectId: "globalfilmfest2025",
  storageBucket: "globalfilmfest2025.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to upload film file to Firebase Storage
export async function uploadFilm(file, userId) {
  try {
    const filmStorageRef = ref(storage, `films/${userId}/${file.name}`);
    const snapshot = await uploadBytes(filmStorageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading film:", error);
    throw error;
  }
}

// Function to upload poster image to Firebase Storage
export async function uploadPoster(file, userId) {
  try {
    const posterStorageRef = ref(storage, `posters/${userId}/${file.name}`);
    const snapshot = await uploadBytes(posterStorageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading poster:", error);
    throw error;
  }
}

// Function to save submission data to Firestore
export async function saveSubmission(submissionData) {
  try {
    // Add a timestamp
    submissionData.timestamp = serverTimestamp();
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, "submissions"), submissionData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving submission:", error);
    throw error;
  }
}

// Function to check authentication status
export function checkAuthStatus(callback) {
  return onAuthStateChanged(auth, callback);
}

// Function to send email notification
export async function sendEmailNotification(emailData) {
  // In a real implementation, you would call a Cloud Function or use a service like SendGrid
  // For demo purposes, we'll log the email data
  console.log("Email notification data:", emailData);
  
  // Simulate successful email sending
  return { success: true, message: "Email notification sent successfully" };
}

// Function to generate a unique submission ID
export function generateSubmissionId() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GFF-${timestamp}-${random}`;
}

// Export the Firebase instances for use in other files
export { app, storage, db, auth };