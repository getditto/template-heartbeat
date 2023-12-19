import { init, Ditto, IdentityOnlinePlayground, Document, Logger } from '@dittolive/ditto'

let ditto:Ditto
//let subscription
//let liveQuery

async function main () {
  await init()

  const identity: IdentityOnlinePlayground = { 
    type: 'onlinePlayground', 
    appID: 'f0862187-a16f-42c3-848e-48e1bb2d216a',
    token: '334e0eab-16b0-4f59-af80-4ff79ffb1aa8',
  }
  ditto = new Ditto(identity)
  ditto.disableSyncWithV3()
  ditto.startSync()

  //subscription = ditto.store.collection("heartbeat").findByID("heartbeat").subscribe()
	ditto.sync.registerSubscription(`
		SELECT *
		FROM heartbeat 
		WHERE _id = 'heartbeat'
	`)
	ditto.store.registerObserver(`
		SELECT *
		FROM heartbeat 
		WHERE _id = 'heartbeat'`,
		(result) => {
      console.log('result: ', result.items
				.map((doc) => {
          return doc.value
        })
      )
      const p = {
       _id: "pong"
      }
      //console.log('p: ', p)
      ditto.store.execute(`
        INSERT INTO pong
        DOCUMENTS (:p)
        ON ID CONFLICT DO UPDATE`,
        { p } 
      )
    }
	)

	/*
  liveQuery = ditto.store.collection("heartbeat").findByID("heartbeat").observeLocal((doc, event) => {
    console.log('heartbeat', doc)
    ditto.store.collection('pong').upsert({
      _id: "pong",
      timestamp: doc?.value['time']
    })
  })
	*/

} 

main()
