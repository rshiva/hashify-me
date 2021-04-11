# Hashify

### Stack

- Ruby
- Rails API
- PostgreSQL
- Redis
- React
- TypeScript
- Tailwind CSS

### Pre-requisites

- Ruby 2.6.x
- Bundler
- PostgreSQL
- Redis
- Node 10.x

### Getting Started

Once you've cloned the repo and setup all the pre-requisites, run the following in your app directory -


```
$ bundle install
$ rails db:create db:migrate
```

Then start the server in two different terminal tabs -

```
$ rails s
$ yarn watch
```

Alternatively you can start your server using foreman. Do not add foreman to the Gemfile - 

```
$ gem install foreman
$ foreman start -f Procfile.dev
```

Foreman plays much nicer with environment vars across react and rails.

### List of APIs

| Method | Params |  Parameters | description
| ------ | ------ | ------ | ------ |
| POST | localhost:3000/v1/posts | {"body": "Mandatory", "salty_password": "optional", "expired_at": [2,12,24] pass index mandatory } | To Create a secret message
| GET | localhost:3000/v1/posts/:id/reveal?salty_password | id: post_id |  Need to pass the post id and secret salt to reveal the secret message
| GET | localhost:3000/v1/secret?token= | token= "5c07673c12146d7e2246" | Pass the url token to land on the above reveal page, this can be used to share the url

### ERD

![Alt models](./doc/models_complete.svg)

### Todos

- [ ] Write MORE Tests
- [ ] Start adding UI