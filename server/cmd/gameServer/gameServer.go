package gameserver

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

type GameServer struct {
	Server  *http.Server
	peerMap map[net.Addr]Client
}

type WSHandler struct{}

func checkOrigin(r *http.Request) bool {
	if websocket.IsWebSocketUpgrade(r) {
		log.Printf("%s connected successfully\n", r.RemoteAddr)
		return true
	}
	return false
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err, " - handler err")
		return
	}

	ReadConn(conn)
}

func ReadConn(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Print(err, " - Conn Read error")
			continue
		}
		log.Printf("(%s) - %s\n", conn.RemoteAddr(), p)

		resp := []byte("HELLO FROM SERVER")
		if err := conn.WriteMessage(messageType, resp); err != nil {
			log.Println(err, " - Conn Write error")
			continue
		}
	}
}

func (wsh WSHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	handler(w, r)
}

func NewGameServer(port int) *GameServer {
	wsHandler := WSHandler{}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      wsHandler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return &GameServer{
		Server: server,
	}
}

func (gs *GameServer) Start() {
	fmt.Printf("Server started on port %s\n", gs.Server.Addr)
	log.Fatal(gs.Server.ListenAndServe())
}
