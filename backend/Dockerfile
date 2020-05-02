FROM rust:alpine AS builder

WORKDIR /app

COPY . .
RUN cargo build --release

FROM alpine

WORKDIR /app

COPY --from=builder /app/target/release/backend backend

CMD ["./backend"]
