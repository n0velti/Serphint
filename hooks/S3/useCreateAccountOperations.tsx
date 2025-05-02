import { uploadData } from '@aws-amplify/storage';
import { useMedia } from '../useMedia';

import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

import * as FileSystem from 'expo-file-system';

// In useCreateAccountOperations.ts
export const useCreateAccountOperations = () => {
    
    const { getMimeType } = useMedia();
  
    const uploadProfilePicture = async (fileUri: string, userId: string): Promise<string> => {

        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
      
        const fileBuffer = Buffer.from(fileBase64, 'base64');
  
      try {
        const result = await uploadData({
          path: `media/images/${userId}/profilePicture`,
          data: fileBuffer,
          options: {
            contentType: getMimeType(fileUri),
          },
        }).result;

        console.log("Upload result:", result);
  
        return result?.url ?? `media/images/${userId}/profilePicture`;
      } catch (error) {
        console.error("Error uploading profile image:", error);
        throw error;
      }
    };
  
    return { uploadProfilePicture };
  };