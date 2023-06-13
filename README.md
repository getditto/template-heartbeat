# Heartbeat 

Monitor the status of Ditto on the cloud and locally.

HTTP -> Big Peer -> Small Peer -> Big Peer -> CDC

## Installation

```
> npm install
```

## Setup

1. Replace APP_ID and TOKEN in `index.ts` with your values.
1. Replace APP_ID in `heartbeat.sh` with your values.
1. Build index.js

```
> npm run build
```

### Terminal 1

Run the heartbeat. This script will send an HTTP request to the Big Peer every 10 seconds.

```
./heartbeat.sh
```


### Terminal 2

Run a small peer node that subscribes to the document updated via the HTTP API. It then updates the timestamp on that document to acknowledge receipt.

```
node index.js
```

### Terminal 3

Use with [Change Data Capture](https://docs.ditto.live/http/common/guides/kafka/intro) to listen to all changes from the server-side.
