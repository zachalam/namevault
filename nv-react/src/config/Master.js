// production vars.
let httpEndpoint = 'https://8p3f97b8si.execute-api.us-east-1.amazonaws.com/prod'

// use the dev endpoint (and vars) if "localhost" appears in hostname
if(window.location.hostname === "localhost") {
    httpEndpoint = 'https://kfj0fl66oh.execute-api.us-east-1.amazonaws.com/dev'
}

export default {
    httpEndpoint,
    requiredChars: 12
}
