# Chatroom

## Overview
Chatroom is a real-time messaging application built using **Node.js**, **Express**, and **Socket.IO**. Users can join specific chat rooms by entering a username and room ID, where they can interact with other participants in real time.

---

## Features
- **Real-Time Messaging**: Users can send and receive messages instantly within a room.
- **Multiple Rooms**: Users can join different rooms using a unique room ID.
- **Dynamic Notifications**: The application notifies when a user joins or leaves a room.
- **Simple UI**: User-friendly interface for logging in and chatting.

---

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
- **Frontend**:
  - HTML
  - CSS
  - JavaScript

---

## Installation

### Prerequisites
Ensure that Node.js is installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone git@github.com:mitake2003/ChatRoom.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chatroom
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

---

## Usage

### Login Page
1. Enter a username.
2. Enter a room ID to join a specific chat room.
3. Click the **Join** button.

**Screenshot:**
![Login Page](./public/assests/chatroom%20login%20page.jpg)

### Chatroom Page
1. Send messages using the text input field.
2. View messages and notifications in real time.
3. Click the **Leave** button to exit the chatroom.

**Screenshot:**
![Messaging Page](./public/assests/messaging%20page.jpg)

---

## Future Enhancements
- Add user authentication.
- Implement message history.
- Improve the UI for a modern look.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

