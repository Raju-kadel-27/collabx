// Uploading file to S3
// You first sign url with filename, returns json
// You then put the actual file with uploadURL(json.uploadUrl) convertin file to base64ToArrayBuffer
// Then you get (json.url) for fileUrl for fetching;

const uploadToS3 = async (selectedFile: string, selectedFileName: string) => {
    try {
        setUploadingFile(true);
        const response = await fetch(`${BACKEND_API_URL}/s3/signedUrl`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filename: selectedFileName,
            }),
        });
        const json = await response.json();
        await fetch(json.uploadUrl, {
            method: "PUT",
            body: base64ToArrayBuffer(selectedFile),
        });
        setUploadingFile(false);
        setUploadedImageUri(json.url);
    } catch (e) {
        setUploadingFile(false);
    }
};