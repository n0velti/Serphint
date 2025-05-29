// app/(tabs)/_layout.tsx or wherever appropriate
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/web/TabBar';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProductTabsLayout() {
    const route = useRoute();
    const setCurrentPostTab = route.params?.setCurrentPostTab;
  
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarPosition: 'top',
        }}
        tabBar={(props) => <TabBar {...props} onTabChange={setCurrentPostTab} />}
        >
        <Tabs.Screen
          name="index"
          options={{ headerShown: false, title: 'Product' }}
        />
        <Tabs.Screen
          name="[postId]"
          options={{ headerShown: false, title: 'Post' }}
        />
        <Tabs.Screen
          name="Posts"
          options={{ headerShown: false, title: 'All Posts' }}
        />
        <Tabs.Screen
          name="Specialists"
          options={{ headerShown: false, title: 'Specialists' }}
        />
        {/* You can add a Consult tab below if needed */}
        {/* <Tabs.Screen name="Consult" options={{ headerShown: false, title: 'Consult Now' }} /> */}
      </Tabs>
  );
}