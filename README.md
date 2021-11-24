# Woodpecker

Library to create and verify data certifications using the Ubirch Certification Platform.

It is a light sdk for creating certificates and make verifications of them. It offers:

- `ping`: Simple ping to the certification server. 
- `issue`: It allows a location-id based support for hash-based COSE/CWT certificates.
- `verify`: It allows a verification of the certificates.

## Examples 

See [here](examples)

## Docs

See [here](docs/index.html)

## Building from code

Follow the following steps in order to have a working project from code.

- `git clone git@github.com:Carlos-Augusto/woodpecker.git`
- `cd woodpecker` 
- `npm install -g typescript` 
- `npm install -g eslint`
- `npm install`
- `npm run build`
- `npm run test:mocha`
- `npm run docs`





