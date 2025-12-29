# Contributing

## Requirements

- Node - version specified in `.nvmrc`
- PNPM - version specified in `package.json`'s `packageManager`

## Development

Want to contribute or run locally? Here's how:

```bash
# Install dependencies
pnpm install

# Start development server with live preview
pnpm lune dev plugins/disable-f1

# Build for production
pnpm lune ci
```

Next, you just need to enable `Lune Dev Mode` in `Shelter` settings.
