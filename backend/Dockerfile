FROM rust:alpine AS builder

WORKDIR /app

COPY . .
RUN RUSTFLAGS="-C target-feature=-crt-static" cargo build --release

FROM alpine

WORKDIR /app

COPY --from=builder /app/target/release/backend backend

CMD ["./backend"]
