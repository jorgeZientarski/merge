const { forEach } = require('lodash');
let src = require('./src.json');
let target = require('./target.json');
const fs = require('fs');

console.log(mergeJobPackages(src, target));

fs.writeFile('./output.json', JSON.stringify((mergeJobPackages(src, target))), err => {
    if (err) {
        console.error(err);
    }
});

function mergeJobPackages(src, target) {
    let result = {};
    const mergeOptions = {
        nullHandling: 'REPLACE',
        arrayHandling: 'MERGE'
    };
    let mergedObject = {};


    try {
        mergedObject = {
            ...src,
            ...target
        }
        //mergedObject = merge(src, target, mergeOptions);
        result = mergeJobPackagesCollections(src, target, mergedObject);
        //result = mergeJobPackagesCollections(mergedObject, mergedObject, mergedObject);
    }
    catch (error) {
        return error;
    }

    return result;
}

function mergeJobPackagesCollections(src, target, mergedObject) {
    let merged = mergedObject;

    if (src.JobActivityList != null && target.JobActivityList != null) {
        let activities = mergeCollections(src.JobActivityList, target.JobActivityList, 'JobActivity');
        merged.JobActivityList = activities;
        merged.JobActivityList.forEach(element => {
            if(!element.hasOwnProperty('WorkSeqNum')){
                throw 'One or more keys from JobActivity were not found.';
            }
        });
    }

    if ((src.Job != null && target.Job != null) && (src.Job.JobDynamicFieldList != null && target.Job.JobDynamicFieldList != null)) {
        let srcDynamicFields = src.Job.JobDynamicFieldList;
        let targetDynamicFields = target.Job.JobDynamicFieldList;
        let dynFields = mergeCollections(srcDynamicFields, targetDynamicFields, 'DynamicField');
        merged.Job.JobDynamicFieldList = dynFields;
        merged,job.JobDynamicFieldList.forEach(element => {
            if(!element.hasOwnProperty('DisplaySector') || !element.hasOwnProperty('Label')){
                throw 'One or more keys from JobDynamicFieldList were not found.';
            }
        });

        }

    if (src.Job != null && target.Job != null && src.Job.BREDynamicFieldList != null && target.Job.BREDynamicFieldList != null) {
        let srcBreFields = src.Job.BREDynamicFieldList;
        let targetBreFields = target.Job.BREDynamicFieldList;
        let breFields = mergeCollections(srcBreFields, targetBreFields, 'DynamicField');
        merged.Job.BREDynamicFieldList = breFields;
        merged.Job.BREDynamicFieldList.forEach(element => {
            if(!element.hasOwnProperty('DisplaySector') || !element.hasOwnProperty('Label')){
                throw 'One or more keys from BREDynamicFieldList were not found.';
            }
        });
    }

    if (src.JobLocation != null && target.JobLocation != null & src.JobLocation.LocationDynamicFieldList != null && target.JobLocation.LocationDynamicFieldList != null) {
        let srcLocFields = src.JobLocation.LocationDynamicFieldList;
        let targetLocFields = target.JobLocation.LocationDynamicFieldList;
        let locFields = mergeCollections(srcLocFields, targetLocFields, 'LocationDynamicField');
        merged.JobLocation.LocationDynamicFieldList = locFields;
        merged.JobLocation.LocationDynamicFieldList.forEach(element => {
            if(!element.hasOwnProperty('DisplaySector') || !element.hasOwnProperty('Label') || !element.hasOwnProperty('Value') ){
                throw 'One or more keys from LocationDynamicField were not found.';
            }
        });
    }

    if (src.JobProductList != null && target.JobProductList != null) {
        let srcProductList = src.JobProductList;
        let targetProductList = target.JobProductList;
        let products = mergeCollections(srcProductList, targetProductList, 'JobProduct');
        merged.JobProductList.Products = products;
        merged.jobProductList.Products.forEach(element => {
            if(!element.hasOwnProperty('ParentId')){
                throw 'One or more keys from JobProductList were not found.';
            }
        });
    }

    if (src.Job != null && src.Job.JobNoteList != null && target.Job != null && target.Job.JobNoteList != null) {
        let srcNoteList = src.Job.JobNoteList;
        let tartgetNoteList = target.Job.JobNoteList;
        let notes = mergeCollections(srcNoteList, tartgetNoteList, 'JobNote');
        merged.Job.JobNoteList = notes;
        merged.Job.JobNoteList.forEach(element => {
            if(!element.hasOwnProperty('CommentType')){
                throw 'One or more keys from JobNoteList were not found.';
            }
        });
    }

    if (src.Job != null && src.Job.JobCommentList != null && target.Job != null && target.Job.JobCommentList != null) {
        let srcCommentList = src.Job.JobCommentList;
        let targetCommentList = targetPkg.Job.JobCommentList;
        let comments = mergeCollections(srcCommentList, targetCommentList, 'JobComment');
        merged.Job.JobCommentList = comments;
        merged.Job.JobCommentList.forEach(element => {
            if(!element.hasOwnProperty('CommentType') || !element.hasOwnProperty('SeqNumber')){
                throw 'One or more keys from JobCommentList were not found.';
            }
        });
    }

    if (src.JobEquipmentList != null && target.JobEquipmentList != null) {
        let equipments = mergeCollections(src.JobEquipmentList, target.JobEquipmentList, 'JobEquipment');
        merged.JobEquipmentList = equipments;
        merged.JobEquipmentList.forEach(element => {
            if(!element.hasOwnProperty('Outlet')){
                throw 'One or more keys from JobEquipmentList were not found.';
            }
        });
    }

    if (src.Job != null && src.Job.JobReasonCdList != null && target.Job != null && target.Job.JobReasonCdList != null) {
        let reasonCodes = mergeCollections(src.Job.JobReasonCdList, target.Job.JobReasonCdList, 'JobReasonCd');
        merged.Job.JobReasonCdList = reasonCodes;
        merged.Job.JobReasonCdList.forEach(element => {
            if(!element.hasOwnProperty('InternalSequence')){
                throw 'One or more keys from JobReasonCdList were not found.';
            }
        }); 
        
    }

    if (src.RelatedEntityList != null && target.RelatedEntityList != null) {
        let relatedEntities = mergeCollections(src.RelatedEntityList, target.RelatedEntityList, 'RelatedEntity');
        merged.RelatedEntityList = relatedEntities;
        merged.RelatedEntityList.forEach(element => {
            if(!element.hasOwnProperty('Id')){
                throw 'One or more keys from RelatedEntityList were not found.';
            }
        }); 
    }

    if (src.SkillMemberList != null && target.SkillMemberList != null) {
        let skillMembers = mergeCollections(src.SkillMemberList, target.SkillMemberList, 'SkillMember');
        merged.SkillMemberList = skillMembers;
        merged.SkillMemberList.forEach(element => {
            if(!element.hasOwnProperty('SkillMember')){
                throw 'One or more keys from SkillMemberList were not found.';
            }
        }); 
    }

    if (src.RelatedPartyList != null && target.RelatedPartyList != null) {
        let relatedParties = mergeCollections(src.RelatedPartyList, target.RelatedPartyList, 'RelatedParty');
        merged.RelatedPartyList = relatedParties;
        merged.RelatedPartyList.forEach(element => {
            if(!element.hasOwnProperty('Role') || !element.hasOwnProperty('Id')){
                throw 'One or more keys from RelatedPartyList were not found.';
            }
        });

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
            if (arrayHandling === 'CONCATENATE') {
                target[key] = [...sourceValue, ...targetValue];
            } else if (arrayHandling === 'MERGE') {
                let difference = targetValue.filter(x => !sourceValue.includes(x));
                target[key] = [...sourceValue, ...difference];
            } else if (arrayHandling === 'REPLACE') {
                target[key] = sourceValu
            } else if (sourceValeIsObject) {
                target[key] = merge(sourceValue, targetValue, options);
            }
        }
        return target;
    }
}

function mergeCollections(src = [], target = [], objectType = '') {
    const _ = require('lodash');
    src = _.uniqWith(src, _.isEqual);
    target = _.uniqWith(target, _.isEqual);

    const options = {
        nullHandling: 'REPLACE',
        arrayHandling: 'IGNORE'
    };

    target.forEach(element => {
        const find = searchIndexByObjectType(src, element, objectType);
        if (find != -1) {
            src[find] = merge(src[find], element, options);
        } else {
            src.push(element);
        }
    });
    return src;
}

function searchIndexByObjectType(list, element, objectType) {
    if (objectType === 'JobActivity') {
        return list.findIndex(x => x.WorkSeqNum === element.WorkSeqNum);
    } else if (objectType === 'DynamicField') {
        return list.findIndex(x => (x.DisplaySector === element.DisplaySector) && (x.Label === element.Label));
    } else if (objectType === 'LocationDynamicField') {
        return list.findIndex(x => (x.DisplaySector === element.DisplaySector) && (x.Label === element.Label) && (x.Value === element.Value));        
    } else if (objectType === 'JobProduct') {
        return list.findIndex(x => x.ParentId === element.ParentId);
    } else if (objectType === 'JobNote') {
        return list.findIndex(x => x.CommentType === element.CommentType);
    } else if (objectType === 'JobComment') {
        return list.findIndex(x => (x.CommentType === element.CommentType) && (x.SeqNumber === element.SeqNumber));
    } else if (objectType === 'JobEquipment') {
        return list.findIndex(x => x.Outlet === element.Outlet);
    } else if (objectType === 'JobReasonCd') {
        return list.findIndex(x => x.InternalSequence === element.InternalSequence);
    } else if (objectType === 'RelatedEntity') {
        return list.findIndex(x => x.Id === element.Id);
    } else if (objectType === 'SkillMember') {
        return list.findIndex(x => x.SkillMember === element.SkillMember);
    } else if (objectType === 'RelatedParty') {
        return list.findIndex(x => (x.Role === element.Role) && (x.Id === element.Id));
    } else {
        throw 'ObjectType not defined';
    }
}