const axios = require('axios')

const getWebsiteDataAPI = async () => {
  const url = 'https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json'
  try {
    const { data } = await axios.get(url)
    return data
  } catch {
    throw new Error('Failed to get Website Data')
  }
}

const getTotalStats = (data, startDate, endDate) => {
  const result = data.reduce((acc, { websiteId, date, chats, missedChats }) => {

    if (startDate && endDate) {
      const wDate = new Date(date)
      if (!(wDate >= startDate && wDate <= endDate)) {
        return acc
      }
    }

    acc[websiteId] = acc[websiteId] || { websiteId: '', tChats: 0, tMissedChats: 0 }
    acc[websiteId].websiteId = websiteId
    acc[websiteId].tChats += chats
    acc[websiteId].tMissedChats += missedChats
    return acc
  }, {})
  console.table(result)
  return result
}

const run = async () => {
  const websiteStatsData = await getWebsiteDataAPI()
  // console.log(websiteStatsData)
  return getTotalStats(websiteStatsData, new Date(2019, 2, 1), new Date(2019, 3, 3))
}

run()