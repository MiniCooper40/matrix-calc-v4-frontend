export default async function UnaryCall(url, matrix) {

    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(matrix)
    })

    return result.json()
}