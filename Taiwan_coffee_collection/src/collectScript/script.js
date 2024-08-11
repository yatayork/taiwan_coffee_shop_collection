import axios from 'axios'
import fs from 'fs/promises'
import { countyData } from './county_data.js'

// const API_KEY =api_key
const MAX_REQUESTS = 100

async function searchCoffeeShops(countyName, boundaryCoordinates, searchCenters) {
  const coffee_shops = new Set() //array內的值不會重複
  let pagetoken = ''//查詢是否有下一頁的token可以搜尋(from maps api response)
  let requestCount = 0 //最多搜尋幾次

  for (const center of searchCenters) {
    //from data.searchCenters
    do {
      try {
        if (pagetoken) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }//當有pagetoken存在 等待一個新的promise (2秒)太快api可能會有錯誤

        requestCount++//對請求次數進行計數避免使用過頭(例如:你使用免費的額度 你不想付費 請計算你的免費金可以達到的最高用量去限制你的maxrequests 或者可以從gcs裡限制)
        if (requestCount > MAX_REQUESTS) break
        //超過就break

        console.log(`發送第 ${requestCount} 次 API 請求，搜索中心: ${center.name}`)//有token就會在同一個中心搜索下一次

        //get "nearbysearch鄰近搜索ˋapi" 並使其回傳json格式(含有許多資訊名字、電話、地址、網址(如果有)，以及如星數、評論等等(有需要再拿))
        // 參數 location 
        // 每組center----(每個鄉鎮市區的"簡易"的中心點(需精細的座標請於國家中心或相關的研究機構取得其gis資料作使用)) 
        // 這裡使用資料為Calude AI 於網路上搜索之簡易座標
        // radius 直徑 目前測試11000m(11km)為搜索最理想之範圍(或許會再做更改)
        // type與keyword :你搜尋的主要詞彙與導向，幫助你更加精準的定位你要搜尋的資料
        // key:你的"個人的" "maps api的" api-key(https://developers.google.com/maps/documentation/javascript/get-api-key?hl=zh-tw)
        // language:res的語言選擇
        // 有pagetoken 就會塞進去(一開始我們只將他作為空字串(第一頁))(往下繼續看)
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              location: `${center.lat},${center.lng}`,
              radius: 11000,
              type: 'cafe',
              keyword: '咖啡店|咖啡廳|咖啡豆|咖啡器具',
              key: API_KEY,
              language: 'zh-TW',
              pagetoken: pagetoken
            }
          }
        )

        const results = response.data.results
        //response唯一個包裹著我們要的東西的包裹
        // 我們要拆兩層 data 與 results 才能找到我們要的資料(.多少次取決於google那邊回傳的資料怎麼包裝)

        for (const place of results) {
          //透過results(response.data.results)我們其實可以知道他是[array裡面充滿了不同點位的{物件}]
          // 所以我們可以用for迴圈將其一次帶出來做限定範圍(邊界內)的處理
          // 所以我們將其帶入isInsidePolygon透過相關演算法來確定是否處於邊界當中(邊界點的數量與精細度會影響到正確性)
          // place.geometry.location ==>lat: ,lng:
          // 確定在範圍內後，會將 name address location加入到我們的json內
          if (isInsidePolygon(place.geometry.location, boundaryCoordinates)) {
            coffee_shops.add(
              JSON.stringify({
                name: place.name,
                address: place.vicinity,
                location: place.geometry.location
              })
            )
            // console.log(place.name)
            // 用來確認
          }
        }

        pagetoken = response.data.next_page_token
        // 這邊從response內取看看有沒有pagetoken 沒有的值同樣為:''
        // console.log(pagetoken)
        console.log(`本次搜索找到 ${results.length} 家店，目前總共 ${coffee_shops.size} 家`)//for testing
      } catch (error) {
        console.error('搜索失敗:', error)//錯誤觀察
        break
      }
    } while (pagetoken && requestCount < MAX_REQUESTS)
      //當小於最大請求數時 持續做 所以我們的pagetoken的值會被帶回到api請求那邊將值替代去做請求以完成下一次20個項目的篩選

    if (requestCount >= MAX_REQUESTS) break
  }

  console.log(`${countyName} 總共發送了 ${requestCount} 次 API 請求`)
  return Array.from(coffee_shops).map((shop) => JSON.parse(shop))
}

function isInsidePolygon(point, polygon) {
  let inside = false
  for (
    let polygon_Start = 0, polygon_End = polygon.length - 1;
    polygon_Start < polygon.length;
    polygon_End = polygon_Start++
  ) {
    const x_Start = polygon[polygon_Start].lng,
      y_Start = polygon[polygon_Start].lat
    const x_End = polygon[polygon_End].lng,
      y_End = polygon[polygon_End].lat

    const intersect =
      y_Start > point.lat != y_End > point.lat &&
      point.lng < ((x_End - x_Start) * (point.lat - y_Start)) / (y_End - y_Start) + x_Start
    if (intersect) inside = !inside
  }

  return inside
}

async function processCounty(countyName, data) {
  console.time(`${countyName} 執行時間`)
  //將收進來的資料放入searchCoffeeShops函式進行處理
  const coffee_shops = await searchCoffeeShops(
    countyName,
    data.boundaryCoordinates,
    data.searchCenters
  )
  //上面三個值分別為 縣市名(每次只會有一個縣市做處理),data內有邊界與中心點
  const jsonResult = JSON.stringify(coffee_shops, null, 2)
  //coffee_shops會await 整個函數整理完後的值回來後在進行下個動作也就是將值透過Json.stringify format後放入jsonResult
  //format資料(可依照https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify 文件自行處理)
  
  await fs.writeFile(`${countyName}_coffee_shops.json`, jsonResult)//將result寫入對應的縣市咖啡店.json (有則覆蓋 無則新增)
  console.log(`在 ${countyName} 找到 ${coffee_shops.length} 家咖啡店`)
  console.log(`結果已保存到 ${countyName}_coffee_shops.json`)
  console.timeEnd(`${countyName} 執行時間`)
}

async function main() {
  try {
    //將countyData內的[county(每個縣市),data(各county的邊界座標物件跟鄉鎮區中心點物件)] 以靜態方法傳回
    for (const [countyName, data] of Object.entries(countyData)) {
      await processCounty(countyName, data)//將傳回processCounty做處理
    }
    console.log('所有縣市處理完成')
  } catch (error) {
    console.error('執行失敗:', error)
  }
}

main()
