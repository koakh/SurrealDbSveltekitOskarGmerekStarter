# NOTES

`package.json` and code, remove all `@master/css*` stuff
leave `src/lib/styles/*.mcss.ts`, this way we don't need to fix code

`.env` change to

```shell
DB_USER=root
DB_PASSWORD=root
```

```shell
$ pnpm i

$ sudo chown 65532:65532 db/ -R
$ pnpm dev:stack
```
