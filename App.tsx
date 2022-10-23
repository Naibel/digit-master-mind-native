import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameScreen, Home, JoinGamePlay, StartGamePlay } from "./src/views";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Digit MasterMind" }}
      />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="StartGamePlay" component={StartGamePlay} />
      <Stack.Screen name="JoinGamePlay" component={JoinGamePlay} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
