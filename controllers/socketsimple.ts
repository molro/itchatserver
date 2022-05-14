import config from 'config';

import { Server} from "socket.io";

import EVENTS from '../config/events';
import { messagesUpd}from '../controllers/chat';
import {createRooms} from '../controllers/rooms';


const mongoURI = config.get<string>('MONGO_URI');
const mongoOpt = config.get<object>('mongoOpt');

let list = new Array()
const users : Array<{id: string, user:string}> = new Array();
const roomUsers : Array<{roomId: string, users: [{id: string, user: string}]}> = new Array();

function socket ({io}:{io: Server}) {
    io.on(EVENTS.connection, (socket) => {
      socket.on(EVENTS.disconnection,() => {})
    })

    io.sockets.on(EVENTS.connection, (socket) => {

      //Usuarios se conectan a socket  
      socket.on(EVENTS.CLIENT.CONNECTED, (user:string) => {
        try {
          let newUser = {id: socket.id,user: user}
          for (let i = 0; i < users.length; i++) {
            if (users[i].user === user) {
                io.to(users[i].id).emit('disconnectOldUser');
                users.splice(i, 1)
                }
          }
          users.push(newUser) 
          } catch (error) { console.log(error); }
      })
    
               
      //Usuario crea una sala
      socket.on(EVENTS.CLIENT.CREATE_ROOM, async (roomName:string) => {
        let rooms = await createRooms(roomName);
        io.emit(EVENTS.SERVER.CREATED_ROOM, rooms);
      });

      //Usuario se una a una sala
      socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId:string, user:string)=>{
        socket.join(roomId)            
        if(roomUsers.find( e => e.roomId === roomId)) {
          for (let i = 0; i < roomUsers.length; i++) {
            if(roomUsers[i].roomId === roomId) {
              let verify = roomUsers[i].users.find(e => e.user === user)
              if(verify) {
                return
              } roomUsers[i].users.push({id: socket.id, user: user})
            } 
          }
        }  else {
          roomUsers.push({roomId: roomId, users:[{id: socket.id, user:user}]})
        }
        
        let message = {id: socket.id, user: user, message: 'Ha entrado' }
        let usuarios = roomUsers.filter(e => e.roomId === roomId)     
        io.to(roomId).emit(EVENTS.SERVER.ROOM_MSG, message); // Avisa que usuario esta online
        io.to(roomId).emit(EVENTS.CLIENT.USER, usuarios)       
      });

      // Usuario sale de sala
      socket.on(EVENTS.CLIENT.LEFT_ROOM, (roomId: string, user:string) => { // Avisa que el usuario ha salido

        let message = {id: socket.id, user: user, message: `Se ha ido`}
        roomUsers.forEach( e => { 
          if (e.roomId === roomId) { 
            for (let i = 0; i < e.users.length; i++) {
              if(e.users[i].user === user) {
                e.users.splice(i,1)
              }
            }
          }
        })
        
   
        let usuarios = roomUsers.filter(e => e.roomId === roomId)     
        io.to(roomId).emit(EVENTS.SERVER.ROOM_MSG, message);
        io.to(roomId).emit(EVENTS.CLIENT.USER, usuarios)
        socket.leave(roomId)
      });

      //Envío de mensajes
      socket.on(EVENTS.CLIENT.SEND_MSG, async (roomId:string, nombre:string, mensaje:string) => { //Envia Mensaje a la sala
        let message = {user: nombre,message: mensaje}  
        await messagesUpd(roomId, message);
        io.to(roomId).emit(EVENTS.SERVER.ROOM_MSG, message);
      });


      socket.on(EVENTS.CLIENT.DISCONNECTED, (user:string) => {
        let message = {id: socket.id, user: user, message: `Se ha ido`}
        roomUsers.forEach( e => { 
          if (e.users === users) { 
            for (let i = 0; i < e.users.length; i++) {
              if(e.users[i].user === user) {
                e.users.splice(i,1)
              }              
            }
          }          
        })
        
        io.emit(EVENTS.SERVER.ROOM_MSG, message);        
      });
      
    });
}
export default socket;