export default async function BinaryCall(url, matrixA, matrixB) {

    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            A: matrixA,
            B: matrixB
        })
    }).then(r => r.json())

    return result
}