import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyDZCet386kQMZQ9JtVvvr-kQS-ul_pejPY";

  useEffect(() => {
    const startChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "hello!";
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        setMessages([
          {
            text,
            user: false,
          },
        ]);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const userMessage = { text: userInput, user: true };
      setMessages([...messages, userMessage]);

      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = userMessage.text;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setMessages([...messages, { text, user: false }]);
      setUserInput("");

      if (text && isSpeaking) {
        // Assuming Speech.speak() is a valid function, handle it accordingly
        Speech.speak(text);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.user ? styles.userMessageContainer : styles.botMessageContainer]}>
      <Text style={[styles.messageText, item.user ? styles.userMessageText : styles.botMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="small" color="black" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", justifyContent: "flex-end" },
  messageContainer: { paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginVertical: 5, borderRadius: 10 },
  userMessageContainer: { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
  botMessageContainer: { backgroundColor: "#EAEAEA", alignSelf: "flex-start" },
  messageText: { fontSize: 16 },
  userMessageText: { color: "black" },
  botMessageText: { color: "black" },
  inputContainer: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5 },
  input: { flex: 1, padding: 10, backgroundColor: "white", borderRadius: 25, marginRight: 10 },
  sendButton: { backgroundColor: "#007AFF", borderRadius: 25, padding: 10 },
});

export default GeminiChat;
