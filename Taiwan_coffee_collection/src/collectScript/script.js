import axios from 'axios'
import fs from 'fs/promises'
import { countyData } from './county_data.js'

// const API_KEY =api_key
const MAX_REQUESTS = 100

async function searchCoffeeShops(countyName, boundaryCoordinates, searchCenters) {
  const coffee_shops = new Set()
  let pagetoken = ''
  let requestCount = 0

  for (const center of searchCenters) {
    do {
      try {
        if (pagetoken) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }

        requestCount++
        if (requestCount > MAX_REQUESTS) break

        console.log(`發送第 ${requestCount} 次 API 請求，搜索中心: ${center.name}`)

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

        for (const place of results) {
          if (isInsidePolygon(place.geometry.location, boundaryCoordinates)) {
            coffee_shops.add(
              JSON.stringify({
                name: place.name,
                address: place.vicinity,
                location: place.geometry.location
              })
            )
            console.log(place.name)
          }
        }

        pagetoken = response.data.next_page_token
        console.log(pagetoken)
        console.log(`本次搜索找到 ${results.length} 家店，目前總共 ${coffee_shops.size} 家`)
      } catch (error) {
        console.error('搜索失敗:', error)
        break
      }
    } while (pagetoken && requestCount < MAX_REQUESTS)

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
  const coffee_shops = await searchCoffeeShops(
    countyName,
    data.boundaryCoordinates,
    data.searchCenters
  )
  const jsonResult = JSON.stringify(coffee_shops, null, 2)

  await fs.writeFile(`${countyName}_coffee_shops.json`, jsonResult)
  console.log(`在 ${countyName} 找到 ${coffee_shops.length} 家咖啡店`)
  console.log(`結果已保存到 ${countyName}_coffee_shops.json`)
  console.timeEnd(`${countyName} 執行時間`)
}

async function main() {
  try {
    for (const [countyName, data] of Object.entries(countyData)) {
      await processCounty(countyName, data)
    }
    console.log('所有縣市處理完成')
  } catch (error) {
    console.error('執行失敗:', error)
  }
}

main()
