import { Stack } from "expo-router";
import '@/global.css'
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from "react-native-toast-message";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


console.log("MOBILE CLERK KEY:", publishableKey); 

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ClerkProvider 
        publishableKey={publishableKey}
        tokenCache={tokenCache}
      >
        <CartProvider>
          <WishlistProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </WishlistProvider>
        </CartProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}