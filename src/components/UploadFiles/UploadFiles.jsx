﻿import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import "./uploadFiles.css"
import { IoArrowUpCircle } from "react-icons/io5";
import {v4 as uuidv4} from 'uuid';
import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

const Local = localStorage.getItem("adm-suachaveauto");
const user = JSON.parse(Local);
// Get production API keys from Upload.io


// Render the file upload button:
export const MyButtonComponent = ({id, uploadFiles2}) => {
  const [countFiles, setCountFiles] = useState(0)

  useEffect(() => {
    async function loadMyPlain() {
      await api.get(`/myplain/${user.id}`).then((res) => {
        console.log(res.data[0].namePlain)
        if(res.data[0].namePlain === "Free") {
          setCountFiles(10)
        } else if(res.data[0].namePlain === "Start") {
          setCountFiles(25)
        } else if(res.data[0].namePlain === "Lite") {
          setCountFiles(35)
        } else if(res.data[0].namePlain === "Pro") {
          setCountFiles(35)
        }
        
      })

    }

    loadMyPlain()
  },[]);

  console.log(countFiles)

    const uploader = Uploader({
      apiKey: "public_W142hX67PwCeWgQq4jxqKL5gQYu7"
    });
    

    // Customize the file upload UI (see "customization"):
    const options = {
        styles: {
            colors: {
              primary: "#E0282F",     // Hex codes only.
              active: "#d51942"
            },
            fontSizes: {
              base: 16
            }
          },
        maxFileCount: countFiles,
        multi: true,
        editor: {
            images: {
              preview: false,
              crop: false,        
              cropRatio: 4 / 3,
              cropShape: "circ",      // "rect" | "circ"
            }
          },
          path: {   // Each supports path variables (e.g. {ORIGINAL_FILE_EXT}). See your
           folderPath: `/uploads/suachave/imóveis/${user.id}/IMOV-${id} | ${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()} | ${new Date().getHours()}:${new Date().getMinutes()}`     // API key's config in the Upload Dashboard for all path variables.
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
                      const linkEdit = doc.fileUrl.replace("/raw/", "/suachave/");
                            const data = {
                              id: uuidv4(),
                              link: linkEdit,
                              }
                              
                              console.log(data)
                              list.push(data)
                            });
                             
                            
                            uploadFiles2(list)
                  }
                }}>
    {({onClick}) =>
      <button onClick={onClick}>
        <IoArrowUpCircle/> Adicionar imagens 
      </button>
    }
  </UploadButton>
    )
}

