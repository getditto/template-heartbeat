#!/bin/bash

endtime=$(date -u -v+1d +%s)

while [[ $(date -u +%s) -le $endtime ]]
do
    time=`date +%H:%M:%S`
    echo "Time Now: $time"
    data=`printf '{ 
      "statement": "INSERT INTO heartbeat DOCUMENTS (:doc1) ON ID CONFLICT DO UPDATE",
      "args": {
        "doc1": {
          "_id": "heartbeat",
          "time": "%s"
        }
      }
    }' $time`

    echo $data
    curl --location --request POST 'https://{REPLACE_WITH_YOUR_APP_ID}.cloud.ditto.live/api/v4/store/execute' \
        --header 'Authorization: Bearer {REPLACE_WITH_YOUR_API_KEY}' \
        --header 'Content-Type: application/json' \
        --data-raw "$data"
    sleep 10
done
