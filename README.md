# Surreal Sveltekit: A Starter Kit with SurrealDB and SvelteKit, featuring Authentication and CRUD Operations + Realtime

this project was cloned from the awesome [surreal-sveltekit](https://github.com/oskar-gmerek/surreal-sveltekit.git) starter from [oskar-gmerek](https://github.com/oskar-gmerek)
for support please contact original [author](https://github.com/oskar-gmerek)

## Issues and Contributions

- If you encounter any issues (as I rushed a bit to meet the hacktoberfest deadline), please feel free to [open an issue](https://github.com/oskar-gmerek/surreal-sveltekit/issues).
- I am open to any contributions as I aspire to make this starter a top choice for initiating projects that utilize the best modern technologies.

## TLDR

```shell
$ pnpm i

$ sudo chown 65532:65532 db/ -R
$ pnpm dev:stack
```

## Features

- Auth
- Username Validation
- CRUD & Realtime

## Requirements

- [Docker](https://www.docker.com/products/docker-desktop)
- Ensure that ports `5173` and `8000` are available for use.

## Modern Stack

- `SurrealDB` - The ultimate multi-model database
- `surrealdb.js` for interacting with awesome [SurrealDB](https://surrealdb.com)
- `sveltekit-superforms` + `zod` to enable super powers in working with forms - [Superforms](https://superforms.rocks/) | [Zod](https://zod.dev/)
- `dayjs` to enable high level of DX in working with time and dates - [Day.js](https://day.js.org/)

## Setup Process

1. Clone the repository to your local machine.
2. Install dependencies. For example:

```shell
$ bun install
```

If you don't have [bun](https://bun.sh) installed, you can utilize pnpm or any other Node.js package manager. For instance:

```shell
$ pnpm install
```

1. Execute the provided npm script. For example:

```shell
$ bun dev:stack
```

If you don't have [bun](https://bun.sh) installed, you can utilize pnpm or any other Node.js package manager. For instance:

```shell
$ pnpm dev:stack
```

This command will initiate SurrealDB within a Docker container and launch SvelteKit in your local development environment.

1. Access [http://localhost:5173](http://localhost:5173) using your preferred web browser.
2. Test various functionalities such as creating a new account, logging in, generating new posts, editing posts, and deleting them.