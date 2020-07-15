const fs = require("fs")
const http = require("http")
const url = require("url")
const replaceTemplate = require("./modules/replaceTemplate")

//READ AND WRITE FILES
//blocking sychronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
// console.log(textIn)
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output", textOut)
// console.log(textOut)

//Asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//             console.log(data3)
//             fs.writeFile(".txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//                 console.log("your file has been written")
//             })
//         })
//     })
// })
// console.log("will read file")

//SERVER
const tempOverview = fs.readFileSync("./templates/template-overview.html", "utf-8")
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8")
const tempProduct = fs.readFileSync("./templates/template-product.html", "utf-8")

const data = fs.readFileSync("./dev-data/data.json", "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)
    const pathName = req.url

    //overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml)
        res.end(output)

        //product page
    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-type": "text/html" })
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

        //api
    } else if (pathname === "/api") {
        fs.readFile("./dev-data/data.json", "utf-8", (err, data) => {
            const productData = JSON.parse(data)
            console.log(productData)
            res.writeHead(200, { "Content-type": "application/json" })
            res.end(data)
        })
        //not found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello world"
        })
        res.end("<h1>page not found</h1>")
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("server port 8000 listening")
})


