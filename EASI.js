function mainTablePrint(mainTable) {
    let results = [];
    [...mainTable.rows].forEach((row, index) => {
        const detection = row.cells[2].querySelector("input").value;
        const location = row.cells[3].querySelector("select").value;
        const mean = row.cells[4].querySelector("input").value;
        const deviation = row.cells[5].querySelector("input").value;

        results.push(`Row ${index + 1} || Detection: ${detection}, Location: ${location}, Mean: ${mean}, Deviation: ${deviation}`);
    });

    return results;
}

function averageColumn(mainTable, colIndex)
{
    const nums = [...mainTable.rows]
    .map(row => parseFloat(row.cells[colIndex].querySelector('input, select')?.value))
    .filter(v => Number.isFinite(v));

    if (!nums.length) return 0;
    return nums.reduce((a,b) => a + b, 0) / nums.length;
}

function smallTablePrint(smallTable) {
    let results = [];
    [...smallTable.rows].forEach((row, index) => {
        const guardComms = row.cells [1].querySelector("input").value;
        const responseMean = row.cells [3].querySelector("input").value;
        const forceTime = row.cells [4].querySelector("input").value;

        results.push(`Guard Comms: ${guardComms}, Response Mean: ${responseMean}, Force Time: ${forceTime}`);
    });

    return results;
}