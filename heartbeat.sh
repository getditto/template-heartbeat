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
    curl --location --request POST 'https://f0862187-a16f-42c3-848e-48e1bb2d216a.cloud.ditto.live/api/v4/store/execute' \
        --header 'Authorization: Bearer tfslDnWddgtlf9zS1wh8ttGBRtuoyPNWMIYxOfmlZCseRLk1jeFnmx2TDsva' \
        --header 'Content-Type: application/json' \
        --data-raw "$data"
    sleep 10
done

#                "statement": 
#                "method": "upsert",
#                "collection": "heartbeat",
#                "id": "heartbeat",
#                "value": {
#                    "time": "%s"
#                }

    # curl --location --request POST 'https://{APP_ID}.cloud.ditto.live/api/v4/store/write' \
    #    --header 'Authorization: Bearer {YOUR_API_KEY}' \
