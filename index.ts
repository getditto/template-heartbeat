import { init, Ditto, IdentityOnlinePlayground, Document } from '@dittolive/ditto'

let ditto:Ditto

async function main () {
  await init()

  const identity: IdentityOnlinePlayground = { 
    type: 'onlinePlayground', 
    appID: 'REPLACE_WITH_YOUR_APP_ID',
    token: 'REPLACE_WITH_YOUR_PLAYGROUND_TOKEN',
  }
  ditto = new Ditto(identity)
  ditto.disableSyncWithV3()
  ditto.startSync()

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
      ditto.store.execute(`
        INSERT INTO pong
        DOCUMENTS (:p)
        ON ID CONFLICT DO UPDATE`,
        { p } 
      )
    }
	)
} 

main()
