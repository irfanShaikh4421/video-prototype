import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useState, useEffect } from 'react'
import IntervalTree from '@flatten-js/interval-tree'

const productTree = new IntervalTree()

function generateTimeline(arr){
  let res = []

  arr.forEach( (k,i,a) => res.push([k.to, i]) )

  let temp = []
  let a = res.sort( (a,b) => a < b).forEach( (k,i,a) => {
    temp.push(arr[k[1]])
  }) 
  return temp
}

function VideoPlayer(props){

  const [ player, setPlayer ] = useState(null)
  const [ playerNode, setNode ] = useState(null)
  const [ time, setTime ] = useState(0)
  const [ productData, setProductData ] = useState([ { product: { name: 'Xiaomi MI 10 Ultra' }, from: 135, to: 192 }, { product: { name: 'Samsung Galaxy Note 20 Ultra' }, from: 198, to: 218 }, { product: { name: 'Iphone 12 Pro' }, from: 290, to: 294 },{ product: { name: 'Iphone 12 Pro Max' }, from: 290, to: 294 }, { product: { name: 'ASUS ROG 3' }, from: 226, to: 240 }, { product: { name: 'IPHONE 12 Mini' }, from: 276, to: 312 }, { product: { name: 'Samsung Galaxy Z Flip ' }, from: 333, to: 380 },  { product: { name: 'Iphone 12 PRO MAX' }, from: 413, to: 468 }, { product: { name: 'Pixel 5' }, from: 475, to: 488 }, { product: { name: 'ASUS Zenfone 7 PRO' }, from: 488, to: 509 }  ])
  const [ currentData, setCurrentData ] = useState([])
  
  window.IntervalTree = IntervalTree
  useEffect( () => {
    productData.forEach( (k,i) => {
      productTree.insert([k.from,k.to], k.product)
    } )

    console.log(generateTimeline(productData))

    window.productTree = productTree

  } , [])

  useEffect( () => {

    setPlayer(videojs('playerId', props, () => {
      // player is ready

      console.log('player is ready')
    } ))

    if(player)
      player.on('timeupdate', function() {
        setTime(Math.floor(this.currentTime()))
      })

    return () => {
      // destroy player

      if(player)
        player.dispose()
    }
  } ,[ player ])

  useEffect( () => {

    let temp = productTree.search([time, time+1])

    if(temp) 
      setCurrentData(temp)
    
  }, [time])

  return (
    <div style={{ backgroundColor: '#f4f5f5', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', borderRadius: '1rem', textColor: 'white' }}>
      <video id='playerId' className="video-js"
        data-setup='{}'
        {...props}
      >
        <source src="test.mp4" type="video/mp4" ></source>
      </video>

      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', minHeight: '128px' }}>
          {  currentData.map( (k,i) => 
          <div className="productItem"> 
            <div className="productInner">
              <div className="productImg">
                <img src="placeholder.jpg">
                </img>
              </div>
              <div className="productDesc">
                {k.name}
              </div>
            </div>
          </div>)}
        </div>
        <input type="number" style={{ borderRadius: '1rem', padding: '1rem', background: '0px', border: '1px solid rgba(0,0,0,.05)' }} placeholder="Seek to" 
          onKeyDown={ (e) => {
            if(e.key == 'Enter'){
              player.currentTime(e.target.value)
            }
          } }
        />
      </div>
      

    </div>
   
  )
}

/*
function VideoPlayer(){
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}*/

export default VideoPlayer