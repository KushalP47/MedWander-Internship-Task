
export async function getExcelApi() {
    const response = await fetch('http://localhost:3001/api/excel', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    return response.json();
}
