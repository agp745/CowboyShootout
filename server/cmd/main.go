package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

type GameServer struct {
	Server *http.Server
}

type WSHandler struct{}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// CheckOrigin:
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	ReadConn(conn)
}

func ReadConn(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Print(err)
			continue
		}

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
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

func main() {
	s := NewGameServer(8080)
	s.Start()
}
