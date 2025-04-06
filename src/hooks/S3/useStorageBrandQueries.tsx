import { uploadData } from '@aws-amplify/storage';
import { useMedia } from '../useMedia';

import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

import * as FileSystem from 'expo-file-system';

// In useStorageBrandQueries.ts
export const useStorageBrandQueries = () => {
    
    const { getMimeType } = useMedia();
  
    const uploadBrandImage = async (fileUri: string, brandId: string): Promise<string> => {

        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
      
        const fileBuffer = Buffer.from(fileBase64, 'base64');
  
      try {
        const result = await uploadData({
          path: `media/images/${brandId}/brandLogo`,
          data: fileBuffer,
          options: {
            contentType: getMimeType(fileUri),
          },
        }).result;

        console.log("Upload result:", result);
  
        return result?.url ?? `media/images/${brandId}/brandLogo`;
      } catch (error) {
        console.error("Error uploading brand image:", error);
        throw error;
      }
    };
  
    return { uploadBrandImage };
  };