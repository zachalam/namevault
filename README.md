![Namevault.co logo](https://raw.githubusercontent.com/zachalam/namevault.co/master/nv-react/src/images/logo.png)
___
## What is namevault?
name**vault**.co is the *fastest* account creator for the EOS blockchain. 

- No existing EOS account or wallet required.
- Generate *quality* names with the `Random Name` feature.
- Search any name and buy within 60 seconds!

<a href="http://namevault.co"><img src="https://media.giphy.com/media/dgfOysCTqd6JKn8f8l/giphy.gif" alt="namevault demo" /></a>

## What is an EOS account?

> An account is a human-readable name that is stored on the blockchain. It can be owned by an individual or group of individuals depending on permissions configuration. An account is required to transfer or otherwise push a transaction to the blockchain.

Continue Reading Here: https://developers.eos.io/eosio-nodeos/docs/accounts-and-permissions


## Project Hierarchy
The namevault.co repo is broken into separate projects (each running independently and in a separate environment)
- `nv-serverless`: Serverless framework functions that interacts with the EOS blockchain (running on AWS Lambda)
- `nv-react` React webapp that interacts with the *nv-serverless* endpoints (running on Github Pages)

## Clone Repo
Before installation, please ensure that you have the latest version of `node`, `git`, and `serverless` on your local machine. You also need an `Amazon AWS` account.

Then the namevault.co repo
```
git clone https://github.com/zachalam/namevault.co.git
```

## Key Installation
To accept payments & automatically generate new accounts you'll need to install your own keys.

```
cp nv-serverless/config/keys_ex.js nv-serverless/config/keys.js
```

Once you've made a copy of the file replace the sample keys in `keys.js` with your own.
```
module.exports = {
    eos_pk: '5Jd2hhQiASBiDj23kqfsgopTozqNsYVfma2a2a6zhMNysafRClQ7E8KQ',
    coinbase_api: '235235asg-fas3-fasg-v3gs-agas3tasggj',
    coinbase_secret: '44c2f436-6713-4b37-8ab5-b41870d174a1'
};
```
- The `eos_pk` is your EOS private key with staked CPU & bandwidth, along with enough EOS to cover the transaction for a new account.
- The `coinbase_api` and `coinbase_secret` are available to you once you make a coinbase commerce account (for accepting payments). https://commerce.coinbase.com/

## Quick Setup
Switch into the `nv-serverless` directory and deploy the lambda functions.
```
cd namevault.co/nv-serverless
sls deploy
```

After serverless has run, you'll receive a deployed endpoint. **Save this URL.**
```
endpoints:
  ANY - https://per2fl18lo.execute-api.us-east-1.amazonaws.com/dev/
```

Switch into the `nv-react` directory and open the file `src/config/Master`
```
cd ../nv-react
code src/config/Master.js
```

Replace the existing `httpEndpoint` value with the serverless deployed endpoint you received earlier.
```
httpEndpoint: 'https://kfj0fl66oh.execute-api.us-east-1.amazonaws.com/dev'
```

You can either start the software (while inside the nv-react folder) locally on your machine by running `npm run start` or for deployment elsewhere by running `npm run build`.