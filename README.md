# Configurator
## Requirements
* Ubuntu 20.04 or later
* Docker
* Docker Compose

## Use
### 1. Place config.json in root directory.
Example
```json
{
  "directories": {
    "traefik.acme": {
      "path": "./data/traefik/acme",
      "permissions": 755
    },
    "traefik.log": {
      "path": "./log",
      "permissions": 755
    }
  },
  "values": {
    "email": "my.email@gmail.com",
    "tls": true
  }
}
```

### 2. Run
```
wget -q https://raw.githubusercontent.com/kokkekpek/configurator/master/lib/index.js index.js | docker run -t --rm --name script -v "$PWD":/usr/src/app -w /usr/src/app node:15.7-alpine node . && rm index.js
```

## What configurator do
### 1. Create directories.
Config example
```json
{
  "directories": {
    "traefik.acme": {
      "path": "./data/traefik/acme",
      "permissions": 755
    },
    "traefik.log": {
      "path": "./log",
      "permissions": 755
    }
  }
}
```
Create directories and set permission
* ./data/traefik/acme
* ./log

### 2. Search \*.template.\* files.
Examples:
* one.template.json
* data/sizes.template.yml 

### 3. Copy template files.
Examples:
* one.template.json > one.json
* data/sizes.template.yml  > data/sizes.yml

### 4. Search placeholders.
Two types of placeholder
* Simple
* Comment started from "\#" or "//"

#### Simple placeholders
* {cfg.name}
* {cfg.user.email}

#### Comment placeholders
* \#{cfg.name}
* //{cfg.name}

All placeholder start with **cfg.**

### 5. Replace placeholders
Example of yaml config
```yaml
paths:
  log: {cfg.traefik.log}
name: Monitoring
email: {cfg.email}
#{cfg.production}production: xxx
#{!cfg.production}development: xxx
#{cfg.admin}admin:
#{cfg.admin}  name: root
#{cfg.admin}  password: 12345
```

config.json
```json
{
  "directories": {
    "traefik.log": {
      "path": "./log",
      "permissions": 755
    }
  },
  "values": {
    "email": "my.email@gmail.com",
    "production": true,
    "admin": false
  }
}
```

Result
```yaml
paths:
  log: ./log
name: Monitoring
email: my.email@gmail.com
production: xxx
#development: xxx
#admin:
#  name: root
#  password: 12345
```

Configurator get data for **Simple placeholders** from "values" and "directories" paths.
For **Comment placeholders** configurator search boolean in "values". Replace to empty string if value is true and place comment symbols if value is false.

## DEV
Install
```sh
yarn install
```

Build lib/index.js
```sh
yarn build
```

Tests
```sh
yarn test
```

Run example. Check example directory.
```sh
yarn example
```