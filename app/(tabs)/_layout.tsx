import { Tabs } from "expo-router"
import Icon from 'react-native-vector-icons/Ionicons';

const TabsLayout = () => {
    return (
    <Tabs>
    {/* <Tabs.Screen name="index" options={{
        title: "Home"
    
    }} />
    <Tabs.Screen name="users/[id]" options={{
        title: "User"
    }}/> */}
    {/* for news */}
    <Tabs.Screen 
                name="news" 
                options={{
                    title: "News",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="newspaper-outline" color={color} size={size} />
                    ),
                }}
            />
            {/* for weather */}
            <Tabs.Screen 
                name="weather" 
                options={{
                    title: "Weather",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cloudy-outline" color={color} size={size} />
                    ),
                }}
            />
    </Tabs>
    )
}

export default TabsLayout