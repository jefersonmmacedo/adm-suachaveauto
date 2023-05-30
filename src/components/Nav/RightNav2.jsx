import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {IoSpeedometerOutline, IoPersonOutline, IoHeart, IoNotificationsOutline, IoLogOutOutline, IoChatboxEllipsesOutline,
        IoHomeOutline, IoLaptopOutline, IoCalendarOutline, IoOptionsOutline } from 'react-icons/io5';
import { AuthContext } from '../../contexts/Auth';
import { ChatCounterMenu } from '../ButtonsCounter/ChatCounterMenu/ChatCounterMenu';
import { NotificationCounterMenu } from '../ButtonsCounter/NotificationCounterMenu/NotificationCounterMenu';

const UlAdm = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding:5px;
    font-weight: 700;
  }
  .nav-item2 {
    display: none;
  }
  li a{
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 700;
    color: var(--Paragraph);
    padding: 5px;
    border-radius: 6px;
    margin-left: -15px;
  }
  li a svg {

    margin-bottom: 2px;
    font-size: 16px;
  }
  li a p {
    font-size: 12px;
    font-weight: 700;
  }
  li a:hover{
    padding: 5px;
    color: var(--Primary);
  }
  button {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 5px;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    margin: 5px 0;
    color: var(--White);
    border: none;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
    font-weight: 500;
  }

  button svg {
    margin: 0px;
  }

  button:hover{
    background-color: var(--ButtonHover);
    color: var(--White);
  }
  .btn {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: var(--Yellow);
    border-radius: 6px;
    margin: 5px 0;
    color: var(--White);
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;

  }

  btn:hover{
    background-color: var(--Blue);
  }


  @media (max-width: 900px) {
    flex-flow: column nowrap;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    background-color: rgba(255,255,255);
    z-index: 98;

    li a{
      width: 80%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      text-decoration: none;
      font-weight: 500;
      color: var(--Paragraph);
      padding: 10px 20px;
      border-radius: 6px;
    }
    li a svg {
      margin-right: 10px;
    }
    li a:hover {
      width: 80%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      text-decoration: none;
      font-weight: 500;
      color: var(--White);
      padding: 10px 20px;
      background-color: var(--Primary);
      border-radius: 6px;
    }


    button{
      display: block;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: var(--White);
      color: var(--Primary);
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px 0;
    }
    button svg {
      margin-right: 0px;
    }

    button:hover{
      background-color: var(--ButtonHover);
    }
    .btn{
      display: block;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color:  var(--Secondary);
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px 0;
    }
    .btn svg {
      margin-right: 0px;
    }

    .btn:hover{
      background-color: var(--Blue);
    }

    @media (max-width: 700px) {
      .nav-item2 {
        display: block;
        margin-left: 23px;
        width: 100%;
      }
    }
  }

  }
`;


const RightNav2 = ({ open }) => {

  const {logout} = useContext(AuthContext);

function HandleLogout(e) {
  e.preventDefault();
  logout()
}


  return (
    <UlAdm open={open}>

       <li className='nav-item'>
            <Link to='/home'>
           <IoSpeedometerOutline /> <p>Painel</p> 
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/imoveis' >
           <IoHomeOutline /> <p>Imóveis</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/mensagens' >
           <IoChatboxEllipsesOutline /> <p>Chat</p>
           <ChatCounterMenu />
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link to='/chat' >
           <IoChatboxEllipsesOutline /> <p>Chat</p> 
            </Link>
          </li> */}
          <li className='nav-item'>
            <Link to='/agendamentos' >
           <IoCalendarOutline /> <p>Agenda</p> 
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/notificacoes' >
            <IoNotificationsOutline /> <p>Alertas</p> 
            <NotificationCounterMenu />
            </Link>
          </li> 
          <li className='nav-item'>
            <Link to='/minhaconta' >
           <IoPersonOutline /> <p>Perfil</p> 
            </Link>
          </li> 
          <li className='nav-item2'>
            <Link to='/web' >
           <IoLaptopOutline /> <p>Site/App</p> 
            </Link>
          </li> 
          <li className='nav-item2'>
            <Link to='/menu' >
           <IoOptionsOutline /> <p>Mais opções</p> 
            </Link>
          </li> 
          <div className="account">
           <button onClick={HandleLogout}><IoLogOutOutline /></button>
          </div>       
    </UlAdm>
  )
}

export default RightNav2
