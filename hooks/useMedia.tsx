// useMedia.ts
export const useMedia = () => {
    const getMimeType = (uri: string): string => {
      const extension = uri.split('.').pop()?.toLowerCase();
  
      const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        mp4: 'video/mp4',
        mov: 'video/quicktime',
        pdf: 'application/pdf',
        txt: 'text/plain',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // Add more extensions as needed
      };
  
      return mimeTypes[extension || ''] || 'application/octet-stream';
    };
  
    return { getMimeType }; 
  };