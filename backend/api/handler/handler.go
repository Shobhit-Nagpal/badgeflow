package handler

import (
	"io"
	"net/http"
)


func Health(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-9")
	io.WriteString(w, "OK")
	w.WriteHeader(http.StatusOK)
}
