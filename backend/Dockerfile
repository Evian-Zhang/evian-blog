FROM rust:alpine AS builder

WORKDIR /app

COPY . .
COPY ./config /usr/local/cargo/config
RUN apk add --no-cache -U musl-dev
RUN RUSTFLAGS="-C target-feature=-crt-static" cargo build --release

FROM alpine

WORKDIR /app

COPY --from=builder /app/target/release/backend backend

CMD ["./backend"]
