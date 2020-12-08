let testMsg = '1 seconde après le start'

console.log('Avant le start')
start()
console.log('Après le start')

function getMsg() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testMsg)
        }, 1000)
    })
}

async function start() {
    console.log(await getMsg())
}