# vestaland-backend

**Zusammenfassung**
REST API für vestaland


## Installation
```
$ npm install
```

Umgebungsvariablen, insbesondere Token-Secretes ([Weitere Infos zu JWT](https://jwt.io/)) anpassen.

```
# Server
PORT=8080
HOST=http://localhost
ALLOWED_ORIGINS=https://app.vestaland.de

# Database
DB_SERVER=localhost
DB_CONNECTION_STRING=mongodb://localhost:27017/vestaland
DB_SERVER_PORT=27017

# Token
AUTH_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AUTH_TOKEN_EXPIRES='15 minutes'
REFRESH_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REFRESH_TOKEN_EXPIRES='1 days'

# Cookies
REFRESH_TOKEN_COOKIE_NAME=REFRESH_TOKEN_COOKIE
REFRESH_TOKEN_COOKIE_DOMAIN=api.vestaland.de
REFRESH_TOKEN_COOKIE_MAX_AGE=86_400_000

# Mailer
SMTP_HOST=smtp.my-domain.de
SMTP_PORT=465
SMTP_USER=mail@my-domain.de
SMTP_PASS=s3cr3t-pAssw0rd

```


```
$ npm run build
$ npm run start
```

## Dokumentation
Um mit [TypeDoc](https://typedoc.org/) eine Dokumentation zu erstellen, folgenden npm Befehl verwenden.

```
$ npm run doc
```

## API - Routes
[Status Codes](https://restfulapi.net/http-status-codes/)
@todo: OpenAPI Documentation

## Contributors
Alexander Groß (tyr0mancer)
