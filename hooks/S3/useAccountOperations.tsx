import { uploadData, getUrl } from '@aws-amplify/storage';
import { useMedia } from '../useMedia';

import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

import SHA256 from 'crypto-js/sha256';


export const useAccountOperations = () => {
  const { getMimeType } = useMedia(); // you still need this

  const uploadProfilePicture = async (
    base64Data: string,
    fileUri: string,
    userEmail: string
  ): Promise<string> => {
    try {

      const hashedEmail = SHA256(userEmail).toString();
     

      console.log("Uploading profile image...");
      console.log("Base64 Data:", base64Data);
      console.log("File URI:", fileUri);
      console.log("User ID:", hashedEmail);

      const fileBuffer = Buffer.from(base64Data, 'base64');

      const result = await uploadData({
        path: `media/images/${hashedEmail}/profilePicture`,
        data: fileBuffer,
        options: {
          contentType: getMimeType(fileUri),
          
        },
      }).result;

      console.log("Upload result:", result);

      return result?.url ?? `media/images/${hashedEmail}/profilePicture`;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
    }
  };

  const getS3ImageUrl = async (fileUri: string): Promise<URL> => {

    console.log("Fetching S3 image URL...");
    console.log("File URI:", fileUri);
    try {
      const result = await getUrl({
        path: fileUri,
        options: {
          
          // specify a target bucket using name assigned in Amplify Backend
            bucket: 'NowMedUserStorage',
            // ensure object exists before getting url
            validateObjectExistence: true, 
            // url expiration time in seconds.
            expiresIn: 300,
            // whether to use accelerate endpoint
            // useAccelerateEndpoint: true,
            // The account ID that owns the requested bucket.
            // expectedBucketOwner: '123456789012',
        },
      })
      return result.url;
    } catch (error) {
      console.error("Error fetching S3 image URL:", error);
      throw error;
    }

  }
    

  return { uploadProfilePicture, getS3ImageUrl };
};
