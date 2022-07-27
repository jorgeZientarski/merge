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

        if (src.JobActivityList != null && target.JobActivityList != null){
            let activities = mergedCollections(src, target);
            merged.JobActivityList = activities;   // Doesn't contain data type
        }

        if (src.Job != null && target.Job != null && src.Job.JobDynamicFieldList != null && target.JobDynamicFieldList){
            let srcDynamicFields = src.Job.JobDynamicFieldList;
            let targetDynamicFields = target.Job.JobDynamicFieldList;
            let dynFields = mergeCollections(srcDynamicFields, targetDynamicFields);
            merged.Job.JobDynamicFieldList = dynFields;
        }

        if (src.Job != null && target.Job != null && src.Job.BREDynamicFieldList != null && target.Job.BREDynamicFieldList != null){
            let srcBreFields = src.Job.BREDynamicFieldList;
            let targetBreFields = target.Job.BREDynamicFieldList;
            let breFields = mergeCollections(srcBreFields, targetBreFields);
            merged.Job.BREDynamicFieldList = breFields;
        }

        if (src.JobLocation != null && target.JobLocation != null & src.JobLocation.LocationDynamicFieldList != null && target.JobLocation.LocationDynamicFieldList != null) {
            let srcLocFields = src.JobLocation.LocationDynamicFieldList;
            let targetLocFields = target.JobLocation.LocationDynamicFieldList;
            let locFields = mergeCollections(srcLocFields, targetLocFields);
            merged.JobLocation.LocationDynamicFieldList = locFields;
        }

        if (src.JobProductList != null && target.JobProductList != null) {
            let srcProductList = src.JobProductList;
            let targetProductList = target.JobProductList;
            let products = mergeCollections(srcProductList, targetProductList);
            merged.JobProductList.Products = products;
        }

        if (src.Job != null && src.Job.JobNoteList != null && target.Job != null && target.Job.JobNoteList != null) {
            let srcNoteList = src.Job.JobNoteList;
            let tartgetNoteList = target.Job.JobNoteList;
            let notes = mergeCollections(srcNoteList, tartgetNoteList);
            merged.Job.JobNoteList = notes;
        }

        if (srcPkg.Job != null && src.Job.JobCommentList != null && target.Job != null && target.Job.JobCommentList != null) {
            let srcCommentList = src.Job.JobCommentList;
            let targetCommentList = targetPkg.Job.JobCommentList;
            let comments = mergeCollections(srcCommentList, targetCommentList);
            mergedPkg.Job.JobCommentList = comments;
        }

        if (src.JobEquipmentList != null && target.JobEquipmentList != null) {
            let equipments = mergeCollections(src.JobEquipmentList, target.getJobEquipmentList);
            merged.JobEquipmentList = equipments;
        }

        if (src.Job != null && src.Job.JobReasonCdList != null && target.Job != null && target.Job.JobReasonCdList != null) {
            let reasonCodes = mergeCollections(src.Job.JobReasonCdList, target.Job.JobReasonCdList);
            merged.Job.JobReasonCdList = reasonCodes;
        }

        if (src.RelatedEntityList != null && target.RelatedEntityList != null) {
            let relatedEntities = mergeCollections(src.RelatedEntityList, target.RelatedEntityList);
            merged.RelatedEntityList = relatedEntities;
        }

        if (src.SkillMemberList != null && target.SkillMemberList != null) {
            let skillMembers = mergeCollections(src.SkillMemberList, target.SkillMemberList);
            merged.SkillMemberList = skillMembers;
        }

        if (src.RelatedPartyList != null && target.RelatedPartyList != null) {
            let relatedParties = mergeCollections(src.RelatedPartyList, target.RelatedPartyList);
            merged.RelatedPartyList = relatedParties;
        }

        return merged;

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