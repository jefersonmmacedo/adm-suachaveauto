import { DateFormat2 } from '../../components/DateFormat2/DateFormat2'
import './chatMessage.css';
import { useState, useContext, useRef } from "react"
import { AuthContext } from "../../contexts/Auth"
import { Link, useParams } from 'react-router-dom'
import { socket } from '../../services/websocket'
import api from '../../services/api'
import { FiSend, FiPlus, FiVideo, FiImage } from 'react-icons/fi'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
// import {DeleteMessage} from '../../components/DeleteMessage/DeleteMessage'
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import { IoArrowBackOutline, IoAttachOutline, IoBusinessOutline, IoChatboxOutline, IoHomeOutline, IoImageOutline, IoPersonOutline, IoEllipsisVerticalOutline, IoVideocamOutline } from 'react-icons/io5';
import { ConversationUnic } from '../../components/ConversationUnic/ConversationUnic';
import { ConversationsList } from '../../components/ConversationsList/ConversationsList';
import { UserTopBarChat } from '../../components/UserTopBarChat/UserTopBarChat';
import { PropertyTopBarChat } from '../../components/PropertyTopBarChat/PropertyTopBarChat';
import { ViewPropertyChat } from '../../components/ViewPropertyChat/ViewPropertyChat';
import { ViewClientChat } from '../../components/ViewClientChat/ViewClientChat';
import { DeletemessageChat } from '../../components/DeletemessageChat/DeletemessageChat';
import { useEffect } from 'react';

   
export function ChatMessage() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
  const {room,idProperty, idCompany, idClient} = useParams();
  const messageRef = useRef(null);

//   const { deleteConversation} = useContext(AuthContext);

  const [text, setText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar] = useState('');
  const [videorUrl, setVideoUrl] = useState(null);
  const [videoAvatar, setVideoAvatar] = useState('');
  const [loadding, setLoadding] = useState(false);
  const [click, setClick] = useState(false);
  const [media, setMedia] = useState(false);

  const [idReadData, setIdReadData] = useState();

  useEffect(() => {
    async function loadMessages() {
      await api.get(`/dateready/rooms/user/${room}/${user.id}`).then((res) => {
        HandleOpenLink(res.data[0]?.id)
        setIdReadData(res.data[0]?.id)
      }).catch((err) => {
        console.log(err)
      });
    }
  
    async function HandleOpenLink(idDate) {
      const data = {
        idUser: user.id,
        dateReady: new Date()
      }
        await api.patch(`/dateready/rooms/update/${idDate}`, data).then(() =>{
        }).catch((err) => {
          console.log(err)
        });
      }
  
      loadMessages()
  }, [])

   const idRoom = room
  const {data} = useFetch(`/messages/${idRoom}`);

  socket.emit("select_room", {
    room,
    idClient: idClient,
    idCompany: idCompany
  }, () => {

  })

  function handleFile(e) {
   if(e.target.files[0]){
       const image = e.target.files[0];

       if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
           setImageAvatar(image);
           setAvatarUrl(URL.createObjectURL(e.target.files[0]));
           handleUploadAccount(image)
        } else {
            console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
            setImageAvatar(null);
            return null;
        }
    }


}
  function handleFileVideo(e) {

   if(e.target.files[0]){
       const video = e.target.files[0];

       if( 
          video.type === 'video/quicktime' || 
          video.type === 'video/mp4' || 
          video.type === 'video/MOV' || 
          video.type === 'video/wmv' || 
          video.type === 'video/flv' || 
          video.type === 'video/avi' || 
          video.type === 'video/avchd' || 
          video.type === 'video/webm' || 
          video.type === 'video/mkv' || 
          video.type === 'video/mpeg' || 
          video.type === 'video/mpeg4' || 
          video.type === 'video/mpeg-4' || 
          video.type === 'video/ogg' || 
          video.type === 'video/HEIF' || 
          video.type === 'video/HEVC'
          ) {
           setVideoAvatar(video);
           setVideoUrl(URL.createObjectURL(e.target.files[0]));
           handleUploadAccountVideo(video)
        } else {
            console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
            setVideoAvatar(null);
            return null;
        }
    }


}

function NotificationMessage() {
  const text = `Seu amigo ${user.id}, enviou uma nova mensagem`
    const data = {idClient: idCompany, idCompany: user.id, text}
    api.post("/notificationsmessage", data).then((res) => {
      
    })
}

async function handleUploadAccount(img) {
  toast.info("Enviando a foto, aguarde...")
  setLoadding(true);
  const uuid = uuidv4();

  let newAvatarUrlFirebase = ref(storage, `images/image-chat/${uuid}`);
  let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, img);
  let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
      
 
  const data = {
    id: uuidv4(),
    room: room,
    idAccount: user.id,
    idFriend: idClient,
    type: "photo",
    text,
    link: photoUrlAvatar,
    avatar: user.logo,
    name: user.fantasyName,
    created_at: new Date()
  }


   socket.emit("message", data)
    setText("");
    setAvatarUrl(null);
    setImageAvatar('');
}

async function handleUploadAccountVideo(img) {
  toast.info("Enviando o video, aguarde...")
  setLoadding(true);
  const uuid = uuidv4();

  let newAvatarUrlFirebase = ref(storage, `videos/video-chat/${uuid}`);
  let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, img);
  let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);

  
  const data = {
    id: uuidv4(),
    room: room,
    idAccount: user.id,
    idFriend: idClient,
    type: "video",
    text,
    link: photoUrlAvatar,
    avatar: user.logo,
    name: user.fantasyName,
    created_at: new Date()
  }


   socket.emit("message", data)

    setText("");
    setAvatarUrl(null);
    setVideoAvatar('');
}

  function handleNewMessage(e) {
    e.preventDefault();
;
    const data = {
      id: uuidv4(),
      room: room,
      idAccount: user.id,
      idFriend: idClient,
      type: "text",
      text,
      link: "",
      avatar: user.logo,
      name: user.fantasyName,
      created_at: new Date()
    }

    NotificationMessage()
    socket.emit("message", data)
    setText("")
  }
  
  socket.on("message", (data) => {
  })


function handlePressMessage() {
  if(click === false) {
    setClick(true)
  } else {
    setClick(false)
  }
}

function handleMedia() {
    if(media === false) {
      setMedia(true)
    } else {
      setMedia(false)
    }
}

function handleDeleteMessage(e) {
  e.preventDefault()
  const deletar = window.confirm("Deseja realmente deletar sua conta?");
  if(deletar === true) {
    // deleteConversation(room)
  } 
}

async function handleViewMessageRoom() {
  const data = {
    idUser: user.id,
    dateReady: new Date()
  }
    await api.patch(`/dateready/rooms/update/${idReadData}`, data).then(() =>{
    }).catch((err) => {
      console.log(err)
    });
  }

const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


  return (
    <div className="content">
      <div className="chat">
        <div className="main-chat">
          {/* <div className="conversations">
                <ConversationsList roomLink={room}/>
          </div> */}
         <div className="section-chat">
            <div className="topBarChat">
            <a href="/home">
            <div className="buttonTopBarChat">
                {/* <a href="javascript:history.back()"><IoArrowBackOutline/> Voltar</a> */}
                <IoArrowBackOutline/> 
                </div>
                </a>

               <UserTopBarChat idClient={idClient}/>
               <PropertyTopBarChat idProperty={idProperty}/>

                <div className="LinksMobile">
                <div className="buttonLinksMobile">
                <ViewPropertyChat id={idProperty} />
                </div>
                <div className="buttonLinksMobile">
                <ViewClientChat id={idClient} mobile={false}/>
                </div>
                </div>
                <a href="/mensagens">
                <div className="buttonTopBarChat">
                     <IoChatboxOutline/> 
                </div>
                </a>
            </div>
            <div className="messages" ref={messageRef}>

{data?.map((message) => {
  return (
   message.idAccount === user.id ?
   <div className={message.idAccount === user.id ? "messages2" : "messages1"} key={message.id} >
   <div className={message.idAccount === user.id ? "my-message" : "message-friend"} onClick={handlePressMessage}>
     <div className="delete">
        <button>
            <DeletemessageChat id={message.id} />
        </button>
     </div>
        <div className="data">
        <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
         {/* <p>Você</p> */}
         </Link>
        <h5>{message.text}</h5>
      {message.link !== "" ?
      message.type === "photo" ?
        <div className="image">
             <img src={message.link} alt="" />
       </div>
       :
        <div className="video-chat">
               <video playsInline controls controlsList="nofullscreen nodownload">
                 <source playsInline src={message.link} type="video/mp4"/>
                 <source playsInline src={message.link} type="video/quicktime"/>
                 <source playsInline src={message.link} type="video/mov"/>
                 <source playsInline src={message.link}  type="video/ogg"/>
                 <source playsInline src={message.link}  type="video/webm"/>
                 <source playsInline src={message.link}  type="video/avi"/>
               </video>
       </div>
       : ""}
      {/* <div className="date">
         <p>
      <DateFormat2 date={message.created_at} />
         </p>
        </div>  */}
        {/* {
         click === false ? "" :
     message.idAccount === user.id ? <DeleteMessage id={message.id} /> : ""
        } */}
        </div>
        <div className="avatar">                     
        <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
       <img src={message.avatar} alt="" />
       </Link>  
     </div>
   </div>
       <div className="date">
         <p>
         {new Date(message.created_at).getDate()}/{new Date(message.created_at).getMonth() +1}/{new Date(message.created_at).getFullYear()} às {new Date(message.created_at).getHours()}:{new Date(message.created_at).getMinutes() < 10 ? "0"+new Date(message.created_at).getMinutes() : new Date(message.created_at).getMinutes() }
         </p>
       </div> 
    </div>
   :
   <div className="messages1" key={message.id}>
   <div className="message-friend">
   <div className="avatar">     
   <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
       <img src={message.avatar} alt="" />
       </Link>   
     </div>
        <div className="data">
        <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
         {/* <p>{message.nickname}</p> */}
        </Link>
        <h5>{message.text}</h5>
      {message.link !== "" ?
        message.type === "photo" ?
        <div className="image">
             <img src={message.link} alt="" />
       </div>
       :
        <div className="video-chat">
               <video playsInline controls controlsList="nofullscreen nodownload">
                 <source playsInline src={message.link} type="video/mp4"/>
                 <source playsInline src={message.link} type="video/quicktime"/>
                 <source playsInline src={message.link} type="video/mov"/>
                 <source playsInline src={message.link}  type="video/ogg"/>
                 <source playsInline src={message.link}  type="video/webm"/>
                 <source playsInline src={message.link}  type="video/avi"/>
               </video>
       </div>
       : ""}
                             {/* {
         click === false ? "" :
     message.idAccount === user.id ? <DeleteMessage id={message.id} /> : ""
        } */}
        </div>
        <div className="delete">
        {/* <button>
            <DeletemessageChat id={message.id}/>
        </button> */}
     </div>
   </div>
   <div className="date">
      <p>
         {new Date(message.created_at).getDate()}/{new Date(message.created_at).getMonth() +1}/{new Date(message.created_at).getFullYear()} às {new Date(message.created_at).getHours()}:{new Date(message.created_at).getMinutes() < 10 ? "0"+new Date(message.created_at).getMinutes() : new Date(message.created_at).getMinutes() }
         </p>
       </div> 
    </div>
  
  )
})}

</div>
            <div className="text">
              <div className="buttonMedia">
                <button className="button-media" onClick={handleMedia}><IoAttachOutline size={22} /></button>
              </div>

               {media === false ? "" : 
               <>
              <label className="label-avatar">
                  <span><IoImageOutline size={20} /></span>
                  <input type="file" accept="image/*" onChange={handleFile}/><br />                     
              </label>

              <label className="label-avatar">
                  <span><IoVideocamOutline size={20} /></span>
                  <input type="file" accept="video/*" onChange={handleFileVideo}/><br />                     
              </label>
              </>
              }

              {media === true ? "" :
              <>
                <textarea value={text} cols="40" rows="20" autoFocus  autoComplete='off' placeholder='Digite uma mensagem'
                onClick={handleViewMessageRoom} onChange={(e) => setText(e.target.value)}></textarea>
                <button className="button1" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}> <FiSend /></button>
              </>
              }
                <button className="button2" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}><FiSend /></button>
                {media === false ? "" : 
                <button className="button3" onClick={handleDeleteMessage}>Deletar Conversa</button>
               }
            </div>
            <br />

         </div>
        </div>
      </div>
    </div>
  )
}
