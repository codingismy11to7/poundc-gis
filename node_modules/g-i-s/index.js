const axios = require("axios")

const jsdom = require("jsdom")
const { JSDOM } = jsdom

const baseURL = "http://images.google.com/search"
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"

const imageFileExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"]
const filterDomains = ["gstatic.com"]

const imageURLRegex = /\["(http.+?)",(\d+),(\d+)\]/g

async function gis(query) {

    let url = baseURL + `?tbm=isch&q=${query}`
    url += filterDomains.map(domain => { return ` -site:${domain}` }).join(" ")

    const res = await axios({
        method: "get",
        url: url,
        headers: {
            "User-Agent": userAgent
        }
    })

    if (res.status != 200) {
        throw new Error("Status code " + res.status)
    }

    const dom = new JSDOM(res.data)
    const scripts = Array.from(dom.window.document.querySelectorAll("script"))
    const containsExtentions = scripts.flatMap(script => {
        const containsExtension = imageFileExtensions.some(ext => {
            return script.innerHTML.includes(ext)
        })

        return containsExtension ? [script.innerHTML] : []
    })

    const images = containsExtentions.flatMap(script => {
        var images = []
        var result
        while ((result = imageURLRegex.exec(script)) !== null) {
            if (result.length <= 3) { continue }

            const width = parseInt(result[3])
            const height = parseInt(result[2])
            if (isNaN(width) || isNaN(height)) { continue }

            images.push({
                url: result[1],
                width: width,
                height: height
            })
        }
        return images
    })
    return images
}


module.exports = gis
