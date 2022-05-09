export function requestError(err, response) {
    console.error(err)
    response.sendStatus(500)
}