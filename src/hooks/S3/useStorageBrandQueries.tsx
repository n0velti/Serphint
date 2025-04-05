import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";

export const useStorageBrandQueries = () => {

    const uploadBrandImage = async (file: File, brandId: string) => {
        try{
            const result = uploadData({
                path: `media/images/${brandId}/${file.name}`,
                data: file,
                options: {
                    contentType: file.type,
                },
            }).result;

            return result;

        }catch (error) {
            console.error("Error uploading brand image:", error);
            throw error;
        }

    }

    return { uploadBrandImage };
}