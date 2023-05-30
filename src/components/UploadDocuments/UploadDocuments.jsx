import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import "./uploadDocuments.css"
import { IoArrowUpCircle } from "react-icons/io5";
import {v4 as uuidv4} from 'uuid';

const Local = localStorage.getItem("adm-suachave");
const user = JSON.parse(Local);
// Get production API keys from Upload.io


// Render the file upload button:
export const MyButtonDocument = ({uploadFiles2}) => {
    const uploader = Uploader({
      apiKey: "public_W142hX67PwCeWgQq4jxqKL5gQYu7"
    });
    

    // Customize the file upload UI (see "customization"):
    const options = {
        styles: {
            colors: {
              primary: "#000000",     // Hex codes only.
              active: "#000000"
            },
            fontSizes: {
              base: 16
            }
          },
        maxFileCount: 50,
        multi: true,
        editor: {
            images: {
              crop: false      // "rect" | "circ"
            }
          },
          path: {   // Each supports path variables (e.g. {ORIGINAL_FILE_EXT}). See your
           folderPath: `/uploads/suachave/documents/${user.id}/Documents | ${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()} | ${new Date().getHours()}:${new Date().getMinutes()}`     // API key's config in the Upload Dashboard for all path variables.
          },
     }

     let list = []

    return (

  <UploadButton uploader={uploader}         // Required.
                options={options}           // Optional.
                onComplete={files => {      // Optional.
                  if (files.length === 0) {
                    console.log('No files selected.')
                  } else {
                    console.log('Files uploaded:');
                    console.log(files.map(f => f.fileUrl));
                    const data = files.map(f => f.fileUrl)
                    console.log(files);

                    files.forEach((doc) => {
                            const data = {
                              id: uuidv4(),
                              link: doc.fileUrl,
                              name: doc.originalFile.originalFileName,
                              }
                              
                              console.log(data)
                              list.push(data)
                            });
                             
                            
                           uploadFiles2(list)
                  }
                }}>
    {({onClick}) =>
      <button className="btnDocuments" onClick={onClick}>
        <IoArrowUpCircle/> Adicionar comprovante 
      </button>
    }
  </UploadButton>
    )
}
