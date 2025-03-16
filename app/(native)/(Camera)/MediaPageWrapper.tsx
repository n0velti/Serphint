import React from 'react';
import { MediaPage } from './MediaPage';  // Adjust import path as needed
import type { Routes } from './Routes';

// Changed to named export to match the import in CameraLayout
export const MediaPageWrapper = ({ route, navigation, rootNavigation, setAddedHint }: any) => {
  return (

      <MediaPage route={route} navigation={navigation} rootNavigation={rootNavigation} setAddedHint={setAddedHint} />

  );
}