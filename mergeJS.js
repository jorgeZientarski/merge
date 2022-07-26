function mergeJS(sourceObject, targetObject, mergeOptions) {

    function merge(source, target, options) {
        let nullHandling = options.nullHandling;
        let arrayHandling = options.arrayHandling;
        for (const [key, sourceValue] of Object.entries(source)) {
            let targetValue = target[key];
            let sourceValeIsObject = Object.prototype.toString.call(sourceValue) === '[object Object]'
            let bothValuesAreArrays = Array.isArray(sourceValue) && Array.isArray(targetValue);
            if (targetValue === undefined) {
                target[key] = sourceValue;
            } else if (nullHandling === 'REPLACE' && !targetValue) {
                target[key] = sourceValue;
            } else if (bothValuesAreArrays) {
                if (arrayHandling === 'CONCATENATE' && typeof source === "object") {
                    target[key] = [...sourceValue, ...targetValue];
                } else if (arrayHandling === 'MERGE' && typeof source === "object") {
                    let difference = targetValue.filter(x => !sourceValue.includes(x));
                    target[key] = [...sourceValue, ...difference];
                } else if (arrayHandling === 'REPLACE' && typeof source === "object") {
                    target[key] = sourceValue;
                }
            } else if (sourceValeIsObject) {
                target[key] = merge(sourceValue, targetValue, options);
            }
        }
        return target;
    }

    return merge(sourceObject, targetObject, mergeOptions); // modify

}
