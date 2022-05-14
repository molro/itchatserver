const EVENTS = {
        connection: "connection",
        disconnection: "disconnection",
        CLIENT:{
            CONNECTED: 'CONNECTED',
            DISCONNECTED: 'DISCONNECTED',
            USER:'USER',
            CREATE_ROOM:'CREATE_ROOM',
            SEND_MSG:'SEND_ROOM_MSG',
            JOIN_ROOM:'JOIN_ROOM',
            LEFT_ROOM:'LEFT_ROOM'
        },
        SERVER:{
            CONNECTED: 'CONNECTED',
            USER:'USER',
            CREATED_ROOM:'CREATED_ROOM',
            ROOM_MSG: 'ROOM_MSG',
            JOINED_ROOM:'JOINED_ROOM',
            LEFT_ROOM:'LEFT_ROOM'
        }
    
    };

export default EVENTS