import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "public_W142hX67PwCeWgQq4jxqKL5gQYu7"
});

// Customize the file upload UI (see "customization"):
const options = {
    maxFileCount: 50,
    maxFileSizeBytes: 5 * 3024 * 3024,
    multi: true,
    editor: {
        images: {
          crop: false      // "rect" | "circ"
        }
      },
      path: {   // Each supports path variables (e.g. {ORIGINAL_FILE_EXT}). See your
        folderPath: "/suachave/uploads"     // API key's config in the Upload Dashboard for all path variables.
      },
 }


// Render the file upload button:
export const MyButtonComponent = () =>
  <UploadButton uploader={uploader}         // Required.
                options={options}           // Optional.
                onComplete={files => {      // Optional.
                  if (files.length === 0) {
                    console.log('No files selected.')
                  } else {
                    console.log('Files uploaded:');
                    console.log(files.map(f => f.fileUrl));
                  }
                }}>
    {({onClick}) =>
      <button onClick={onClick}>
        Carregue suas fotos (Max: 50)
      </button>
    }
  </UploadButton>