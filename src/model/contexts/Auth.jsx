import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import apiGoogleReverse from '../services/apiGoogleReverse';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [comentsPosts, setComentsPosts] = useState([])

    
    async function createAccount({
        name, email, phone, whatsapp, password, status, verified, avatar, cep, city, uf
        }) {
        const data = {
            name, email, phone, whatsapp, password, status, verified, avatar, cep, city, uf
            }
        console.log(data)
       //   const dataInvite = await api.get(`/invites/find/${data.email}/${data.code}`);

        // if(dataInvite.data[0] === undefined) {
        //     toast.error("Código de verificação errado ou expirado!")
        //     return
        // } 
        
        await api.post('/client', data).then(() => {
          //  completeAccount(email)
            toast.info(`Cadastro criado com sucesso!`);
            localStorage.setItem("suachave", JSON.stringify(data));
            window.open("/minhaconta", "_self")


        }).catch(error => {
            console.log("Cadastro não foi realizado: "+ error);
            toast.error(`Username ou E-mail ja utilizados. Tente outro por favor!`);
        });
    }

    async function createAccountCompany({
        type, verified, status, cnpj,nameSlug, socialReason, fantasyName, creci, email, phone, whatsapp, password, responsibleName,
        emailResponsible, whatsappResponsible, logo, cep, road, number, district, city, uf, website, facebook, instagram, linkedin, youtube
            
        }) {
        const data = {
            type, verified, status, cnpj,nameSlug, socialReason, fantasyName, creci, email, phone, whatsapp, password, responsibleName,
            emailResponsible, whatsappResponsible, logo, cep, road, number, district, city, uf, website, facebook, instagram, linkedin, youtube
            }
        console.log(data)
       //   const dataInvite = await api.get(`/invites/find/${data.email}/${data.code}`);

        // if(dataInvite.data[0] === undefined) {
        //     toast.error("Código de verificação errado ou expirado!")
        //     return
        // } \watch
        
        await api.post('/company', data).then(() => {
          //  completeAccount(email)
            toast.info(`Cadastro criado com sucesso!`);
            localStorage.setItem("suachave", JSON.stringify(data));

            window.open("/planos", "_self")


        }).catch(error => {
            console.log("Cadastro não foi realizado: "+ error);
            toast.error(`Username ou E-mail ja utilizados. Tente outro por favor!`);
        });
    }

    async function loginSession({login, password}) {     
        let email;
        let username;

        console.log({login, password})
       
        if(login.includes('@')) {
            email = login
            await api.post("/session/client", {email, password}).then((result) => {
                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }

                console.log(result.data)
                localStorage.setItem("suachave", JSON.stringify(result.data));
                window.open("/minhaconta", "_self")
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login. E-mail, usuário ou senha incorretos!`);
                toast.error(`Verifique letras maiúsculas e minúsculas`);
            })
            
        } else {
            username = login
            await api.post("/session/client", {username, password})
            .then((result) => {
                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }
                localStorage.setItem("suachave", JSON.stringify(result.data));
               
                window.open("/minhaconta", "_self")
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login. E-mail, usuário ou senha incorretos!`);
                toast.error(`Verifique letras maiúsculas e minúsculas`);
            })
        }
        
    }    








    async function updateAccount({id, avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron}){
        const Local = localStorage.getItem("foursome");
        const user = JSON.parse(Local)
        const Local2 = localStorage.getItem("informations-foursome");
        const userInformations = JSON.parse(Local2)
        const data = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron};
        const data2 = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron, date:user.date , token:user.token  , expiresIn:user.expiresIn };
        console.log(id)
        console.log(data)
        await api.patch(`/accounts/${id}`, data).then(res => {
            localStorage.setItem("foursome", JSON.stringify(data2));
            window.open("/feed", "_self")
        }).catch(error => {
            console.log(error)
        });
    }

async function deleteAccount(id) {
    toast.success("Deletando sua conta")
    const Local = localStorage.getItem("informations-foursome");
    const user = JSON.parse(Local);
     toast.success("Deletando conta de usuário")
    console.log("Deletando conta de usuário")

    const res = await api.delete(`/accounts/${id}`);

    if(res.status===201) {
        toast.info("Deletando informações") 
        const idPatrono = user.patron;
        const text = `${user.username}, Deletou sua conta em nosso site`;
        const type = "notification";
        const idPost = "";
        const idFriend = "";
        const idAccount = user.id;
        notifications(idPatrono, text, idAccount, idFriend, type, idPost)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteConversations(user) {
    const idAccount = user.id
    const rmyRooms1 = await api.get(`conversations/account/filter/${idAccount}`)

     const idFriend = user.id
     const rmyRooms2 = await api.get(`conversations/friend/filter/${idFriend}`)

     const newRooms = rmyRooms1.data.concat(rmyRooms2.data);
     // console.log(newRooms);

     newRooms.forEach(async (room) => {
         const id = room.id
         toast.success("Deletado conversas!");
              await api.delete(`/conversations/${id}`);
     })
     toast.success("Deletado com sucesso!");
}

async function deleteConversation(room) {
    await api.delete(`/conversations/room/${room}`).then((res) => {
        toast.success("Deletado com sucesso!");
        window.open("/messages", "_self")

    })
}
//Fim deletando conta

async function recuperationUserForEmail(email) {
    console.log(email)
   const account =  await api.get(`/accounts/find/${email}`);
   console.log(account)

   if(account.data.length === 0) {
       toast.error("Não existe conta com este e-mail em nossa base de dados!")
       return
   } 

   const username = account.data[0].username
   searchUsername(email, username)
}

async function gerateCodeRecuperation(email, code) {
    console.log(email)
    const account =  await api.get(`/accounts/find/${email}`);
    console.log(account)
    
    if(account.data.length === 0) {
        toast.error("Não existe conta com este e-mail em nossa base de dados!")
        return
    } 
    
    await api.post("/recuperation", {email, code}).then((res) => {
        console.log(res.data);
        codeRecuperation(email, code);
    }).catch((error) => {
        console.log(error)
    })
}

async function validadeCodeRecuperation(code, email) {
    console.log(code, email)
   const codeRecuperationData =  await api.get(`/recuperation/find/${email}/${code}`);
   console.log(codeRecuperationData)

   if(codeRecuperationData.data.length === 0) {
       toast.error("Código inválido ou expirado!")
       return
   } 

   window.open(`/recoverpassword/${email}`,"_self")
}


async function recoverPasswordNew(email, password) {
    console.log(email, password)
    await api.patch(`accounts/recover/${email}`, {password}).then(() => {
        toast.info("Senha atualizada com sucesso");
        window.open("/","_self")
    }).catch((error) => {
        toast.error("Erro ao atualiza senha");
        console.log(error)
    })
}

// Fim recuperações


async function notifications(idPatrono, text,idAccount, idFriend, type,idPost) {
    const data = {idPatrono, text,idAccount, idFriend, type,idPost }
    await api.post("/notifications", data).then(() => {
        console.log("Comentário/Notificação feito com sucesso");
    }).catch(error => {
        console.log("Notificação não cadastrada" + error)
    })
}


    async function createSuccess(email) {
        const res = await api.post("/mail/complete", {mail: email});
        if(res.status === 200) {
        }
    }
    async function searchUsername(email, username) {
        console.log(email, username)
        const res = await api.post("/mail/username", {mail: email, username: username});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!")
            window.open(`/recuperationuserresult/${username}`,"_self")
        }
    }


    async function codeRecuperation(email, code) {
        console.log(email, code)
        const res = await api.post("/mail/passwordcode", {mail: email, code: code});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!");
            window.open(`/recuperationcode/${email}`,"_self")
        }
    }



async function deleteActualMessage(id){
    await api.delete(`/messages/${id}`).then(() => {
    })
}


async function newVisit(idAccount, username, idFriend) {
    const data = {idAccount, username, idFriend}
    await api.post("/visits", data).then(() => {
    })
}



// Fim da Sessão grupos
    async function logout() {
        localStorage.removeItem("suachave");
        window.open("/", "_self");
    }


    //payments
    async function createPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status, status2}) {
        const data = {idPlain, idCompany, status: status2}
        const data2 = {idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}
        console.log({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status, status2})

        const res = await api.get(`/myplain/${idCompany}`);
        if(res.data.length === 0) {
           
                await api.post("/myplain/", data).then((res) => {
                    toast.success("Novo plano criado com sucesso")
                    handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status})
                }).catch((error) => {
                    console.log(error)
                })


        } else {
            console.log("Plano Já existe")
            console.log("Criando pagamento")
            handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status})
        }

    }

    async function handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}) {
        const data = {idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}
        await api.post("/payments/", data).then((res) => {
            toast.success("Pagamento efetuado com sucesso");

            setTimeout(() => {
                window.open(`/pagamentofinalizado/`, "_self")
              }, "5000")
        
        }).catch((error) => {
            console.log(error)
        })
    }

    async function newScheduling({
        idClient, idProperty, idCompany, titleProperty, imageProperty, email, phone, whatsapp, status, meet, 
      day, month, year, shift, hour, ownACar, location, address, similarProperties, amountOfPeople, dateCompleted
    }) {
        const data = {idClient, idProperty, idCompany, titleProperty, imageProperty, email, phone, whatsapp, status, meet, 
            day, month, year, shift, hour, ownACar, location, address, similarProperties, amountOfPeople, dateCompleted}

        await api.post("/scheduling/", data).then((res) => {
            
            toast.success("Agendamento criado com sucesso!");
            window.location.reload(false);

        }).catch((error) => {
            console.log(error)
        })
    }
    async function newContact({
        idProperty, idCompany, idClient, name, email, phone, whatsapp, type, link
    }) {
        const data = {idProperty, idCompany, idClient, name, email, phone, whatsapp, type}

        await api.post("/contact/", data).then((res) => {

            if(type === "Ligação") {
                window.open(`tel:+55${phone}`, "_self");
            } else {
                window.open(`https://wa.me/55${whatsapp}?text=Olá. Gostaria de saber mais detalhes sobre o imóvel:%20 ${link}`)
            }

        }).catch((error) => {
            console.log(error)
        })
    }


  // Deslogandop após tempo de inatividade
   function inactivityTime() {
       let time;
       // reset timer
       window.onload = resetTimer;
       document.onmousemove = resetTimer;
       document.onkeydown = resetTimer;
       document.onclick = resetTimer;
       document.onchange = resetTimer;
       function doSomething() {
        const DataUser = localStorage.getItem("foursome");
        const user = JSON.parse(DataUser);

            if(user !== null || user !== undefined || user !== "") {
              //  toast.error("Finalizando a sessão")
                logout(user.id)
            }
        }
        function resetTimer() {
        clearTimeout(time);
      time = setTimeout(doSomething, 900000)
      //time = setTimeout(doSomething, 1000)
    }
}







    return(
        <AuthContext.Provider value={{
            updateAccount,
            loginSession,
            createAccount,
            createAccountCompany,
            loading,
            logout,
            deleteActualMessage,
            newVisit,
            comentsPosts,
            setComentsPosts,
            deleteAccount,
            recuperationUserForEmail,
            gerateCodeRecuperation,
            validadeCodeRecuperation,
            recoverPasswordNew,
            inactivityTime,
            createPayment,
            deleteConversation,
            newScheduling,
            newContact
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}