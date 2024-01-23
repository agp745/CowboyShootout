package main

import (
	gameserver "github.com/agp745/shooter/server/cmd/gameServer"
)

func main() {
	s := gameserver.NewGameServer(8080)
	s.Start()
}
