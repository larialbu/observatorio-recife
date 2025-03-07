self.onmessage = function (e) {
    const { data, filters } = e.data;

    const filteredData = data.filter((item) => {
        if (filters.additionalFilters) {
            for (const f of filters.additionalFilters) {
                if (!f.selected || f.selected.length === 0) continue;
                const val = item[f.label];
                if (f.fixed?.includes(val)) return true;
                if (!f.selected.includes(val)) {
                    return false;
                }
            }
        }
        return true;
    });

    const additionalFiltersOptions = filters.additionalFilters?.map((f) => {
        const uniqueValues = Array.from(new Set(data.map((item) => item[f.label])))
            .filter((v) => v != null)
            .filter((op) => !(f.fixed && f.fixed.includes(op)));

        return { ...f, options: uniqueValues };
    }) || [];

    self.postMessage({ filteredData, additionalFiltersOptions });
};
