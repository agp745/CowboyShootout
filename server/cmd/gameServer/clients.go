package gameserver

import "net"

// Describes what data a client should have
type Client struct {
	username string
	addr     net.Addr
}
