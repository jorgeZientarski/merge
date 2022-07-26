function mergeJS(sourceObject, targetObject, mergeOptions) {

    let result = null;

    function mergeJobPackages(source, target){

        try{
            let resNode  = merge(sourceObject, targetObject, mergeOptions);
            result = mergeJobPackagesCollections(source, target, resNode); //TODO implement mergeJobPackagesCollections.    
        } 
        catch (error) {
            return false; //returns false to trigger error. It needs to be implemented in graph
        }
        
        return result;
    }

    function mergeJobPackagesCollections(sourceObject, targetObject, mergedObject){
        let src = sourceObject;
        let target = targetObject;
        let merged = mergedObject;

        if(src.jobActivityList != null && target.jobActivityList != null){
            let activities = mergedCollections(src, target);
            merged.jobActivityList = activities;   // Doesn't contain data type
        }

    }


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