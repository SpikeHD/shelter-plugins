# Contributing

## Requirements

- Node - version specified in `.nvmrc`
- PNPM - version specified in `package.json`

## Development

To develop a plugin locally:

```sh
# Install dependencies
pnpm install

# Start development server with live preview
pnpm lune dev plugins/<plugin-folder>
```

Then, enable `Lune Dev Mode` in `Shelter` settings.

## Building

To build, just run:

```sh
pnpm lune ci
```
