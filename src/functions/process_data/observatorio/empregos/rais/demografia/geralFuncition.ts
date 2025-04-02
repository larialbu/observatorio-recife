export function geralAccFunction(dataArray: any, params: any) {
    return dataArray.reduce((acc: any, item: any) => {
        params.forEach((param: any) => {
            if (!acc[param]) acc[param] = {};
            const value = item[param];
            acc[param][value] = (acc[param][value] || 0) + 1;
        });
        return acc;
    }, {});
}
