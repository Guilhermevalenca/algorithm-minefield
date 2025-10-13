FROM golang:tip-alpine3.22

ENV GIN_MODE=release

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN go build -o /bin/app

EXPOSE 8000

CMD ["/bin/app"]