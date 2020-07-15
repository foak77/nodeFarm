const fs = require("fs")
const http = require("http")
const url = require("url")

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

const server = http.createServer((req, res) => {
    console.log(req.url)

    const pathName = req.url
    if (pathName === "/" || pathName === "/overview") {
        res.end("hello from overview")
    } else if (pathName === "/product") {
        res.end("hello from product")
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


