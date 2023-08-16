# kbdsrv

This project is a tiny utility to forward your keypresses in a web browser to a
linux machine through a virtual keyboard using uinput. It can be used to e.g.
control an actual Linux TTY, etc.

Raw scancodes are forwarded to the server. It does _not_ bother with keyboard
layout or whatsoever. It is the responsibility of the machine running the server
to load a keyboard layout matching the one for the web browser.

## Running

Both the machine with a keyboard and the machine on which to emulate a keyboard
must have network access, and reach each other through HTTP and WebSocket.

On the machine on which to emulate a keyboard, simply run the binary. Then, on
another machine, access the following URL in a web browser:
`http://<ip>:8080/kbd`.

## License

MIT.
