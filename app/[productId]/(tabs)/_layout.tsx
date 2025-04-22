import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/web/TabBar';

function ProductTabsLayout(props) {
    return (
        <Tabs screenOptions={{ 
            headerShown: false,  
            tabBarPosition: 'top',
         }}
         tabBar={TabBar}
        

         >
            <Tabs.Screen name="index" options={{ headerShown: false, title: 'Product'}}  />
            <Tabs.Screen name="[postId]" options={{ headerShown: false, title: 'Post'}} />
            <Tabs.Screen name="Posts" options={{ headerShown: false, title: 'All Posts'}} />
            <Tabs.Screen name="Doctors" options={{ headerShown: false, title: 'Doctors'}} />
            <Tabs.Screen name="Options" options={{ headerShown: false, title: 'Options'}}
                
            />
       
        </Tabs>
    );
}

export default ProductTabsLayout;