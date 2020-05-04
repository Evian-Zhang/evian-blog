FROM rust:alpine AS builder

WORKDIR /app

COPY . .

RUN apk add --no-cache -U openssl-dev
RUN RUSTFLAGS="-C target-feature=-crt-static" cargo build --release

FROM alpine

WORKDIR /app

COPY --from=builder /app/target/release/backend backend

RUN apk add --no-cache -U openssl-dev
RUN apk add --no-cache -U libgcc

CMD ["./backend"]
