# Welcome to Wire-Com 👋

This is React Native sample ecommerce application.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
## Technologies and Libraries Used

### Core

- **Language**: TypeScript
- **Framework**: React Native with Expo
  - Expo is used as it provides the most recommended way to develop React Native apps, offering a smooth development experience and easy-to-use tools.

### Navigation

- **expo-router**
  - We chose expo-router for navigation as it provides file-based routing, making it intuitive and easy to manage navigation structure. It's also fully integrated with Expo, ensuring seamless compatibility.

### State Management

- **Zustand**
  - For this small e-commerce project, Zustand was selected as the state management solution. It's lightweight, easy to set up, and doesn't require extensive boilerplate code, making it perfect for our needs.

### Data Persistence

- **@react-native-async-storage/async-storage**
  - Used in conjunction with Zustand to persist state data, ensuring that important information like cart contents are saved between app sessions.

### API Calls

- **Axios**
  - Chosen for making HTTP requests due to its simplicity and powerful features, including request and response interceptors.

### Image Handling

- **expo-image**
  - Utilized for efficient image loading and caching, providing better performance compared to the standard React Native Image component.

### Form Handling

- **react-hook-form**
  - Employed for managing form state and validation, offering a performant solution with minimal re-renders.

### Form Validation

- **Zod**
  - Used alongside react-hook-form for robust form validation, providing a type-safe approach to defining validation schemas.
