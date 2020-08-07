import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { Feather } from "@expo/vector-icons"
import { gray, purple, lightPurp } from "../utils/colors"
import DeckList from "./DeckList"
import AddDeck from "./AddDeck"
import DeckDetails from "./DeckDetails"

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const BottomNav = () => (
    (
        <Tab.Navigator
            activeColor={purple}
            inactiveColor={lightPurp}
            barStyle={{ backgroundColor: gray }}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" color={color} size={24} />
                    ),
                }}
                name="listDeck"
                component={DeckList}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Add Deck",
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-square" color={color} size={24} />
                    ),
                }}
                name="addDeck"
                component={AddDeck}
            />
        </Tab.Navigator>
    )
)

const Navigation = () => (
    (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={BottomNav}
                    options={{
                        animationEnabled: true,
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
            <Stack.Screen
                name="deck"
                component={DeckDetails}
                options={{
                    animationEnabled: true,
                    headerShown: false,
                }}
            />
        </NavigationContainer>
    )
)

export default Navigation