/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserSignatureController } from './../controllers/UserSignatureController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StudentController } from './../controllers/StudentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleMapApprovalController } from './../controllers/RoleMapApprovalController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controllers/RoleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestTypeController } from './../controllers/RequestTypeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestHeaderController } from './../controllers/RequestHeaderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestHeaderActivityLogController } from './../controllers/RequestHeaderActivityLogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestDownloadLogController } from './../controllers/RequestDownloadLogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestDownloadApprovalLogController } from './../controllers/RequestDownloadApprovalLogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestDetailController } from './../controllers/RequestDetailController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestDetailAddressController } from './../controllers/RequestDetailAddressController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RequestAttachedDocumentController } from './../controllers/RequestAttachedDocumentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MasterValueController } from './../controllers/MasterValueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Irst05Controller } from './../controllers/Irst05Controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ActivityLogsController } from './../controllers/ActivityLogsController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserSignatureResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "userId": {"dataType":"double"},
            "signatureUrl": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "fileSize": {"dataType":"double"},
            "sequence": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveUserSignatureRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "userId": {"dataType":"double"},
            "signatureUrl": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "fileSize": {"dataType":"double"},
            "sequence": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "username": {"dataType":"string"},
            "passwordHashed": {"dataType":"string"},
            "roleCode": {"dataType":"string"},
            "campusCode": {"dataType":"string"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "departmentCode": {"dataType":"string"},
            "advisorCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveUserRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "username": {"dataType":"string","required":true},
            "passwordEncrypted": {"dataType":"string","required":true},
            "roleCode": {"dataType":"string","required":true},
            "campusCode": {"dataType":"string","required":true},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "departmentCode": {"dataType":"string"},
            "advisorCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StudentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "studentCode": {"dataType":"string"},
            "campusCode": {"dataType":"string"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "departmentCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
            "section": {"dataType":"string"},
            "advisorCode": {"dataType":"string"},
            "studentStatusId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveStudentRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "studentCode": {"dataType":"string"},
            "campusCode": {"dataType":"string"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "departmentCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
            "section": {"dataType":"string"},
            "advisorCode": {"dataType":"string"},
            "studentStatusId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StudentAddressResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "studentId": {"dataType":"double"},
            "houseNo": {"dataType":"string"},
            "moo": {"dataType":"string"},
            "building": {"dataType":"string"},
            "floor": {"dataType":"string"},
            "soi": {"dataType":"string"},
            "street": {"dataType":"string"},
            "district": {"dataType":"string"},
            "subDistrict": {"dataType":"string"},
            "province": {"dataType":"string"},
            "country": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveStudentAddressRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "studentId": {"dataType":"double"},
            "houseNo": {"dataType":"string"},
            "moo": {"dataType":"string"},
            "building": {"dataType":"string"},
            "floor": {"dataType":"string"},
            "soi": {"dataType":"string"},
            "street": {"dataType":"string"},
            "district": {"dataType":"string"},
            "subDistrict": {"dataType":"string"},
            "province": {"dataType":"string"},
            "country": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleMapApprovalHeaderResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestTypeCode": {"dataType":"string"},
            "campusCode": {"dataType":"string"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "section": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRoleMapApprovalHeaderRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestTypeCode": {"dataType":"string"},
            "campusCode": {"dataType":"string"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "section": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleMapApprovalDetailResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "roleCode": {"dataType":"string"},
            "sequence": {"dataType":"double"},
            "approveStep": {"dataType":"double"},
            "nextStep": {"dataType":"double"},
            "roleMapApprovalHeaderId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRoleMapApprovalDetailRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "roleCode": {"dataType":"string"},
            "sequence": {"dataType":"double"},
            "approveStep": {"dataType":"double"},
            "nextStep": {"dataType":"double"},
            "roleMapApprovalHeaderId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestTypeResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "code": {"dataType":"string"},
            "nameTh": {"dataType":"string"},
            "nameEn": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestTypeRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "code": {"dataType":"string"},
            "nameTh": {"dataType":"string"},
            "nameEn": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "code": {"dataType":"string"},
            "nameTh": {"dataType":"string"},
            "nameEn": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRoleRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "code": {"dataType":"string","required":true},
            "nameTh": {"dataType":"string"},
            "nameEn": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestHeaderResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestTypeCode": {"dataType":"string"},
            "requestId": {"dataType":"double"},
            "studentId": {"dataType":"double"},
            "approvedBy": {"dataType":"string"},
            "rejectedBy": {"dataType":"string"},
            "nextStep": {"dataType":"double"},
            "documentStatus": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestHeaderRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestTypeCode": {"dataType":"string","required":true},
            "requestId": {"dataType":"double","required":true},
            "studentId": {"dataType":"double"},
            "approvedBy": {"dataType":"string"},
            "rejectedBy": {"dataType":"string"},
            "nextStep": {"dataType":"double"},
            "documentStatus": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestHeaderActivityLogResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestHeaderId": {"dataType":"double"},
            "actionDescription": {"dataType":"string"},
            "actionUser": {"dataType":"string"},
            "oldDocumentStatus": {"dataType":"string"},
            "newDocumentStatus": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestHeaderActivityLogRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestHeaderId": {"dataType":"double","required":true},
            "actionDescription": {"dataType":"string","required":true},
            "actionUser": {"dataType":"string"},
            "oldDocumentStatus": {"dataType":"string","required":true},
            "newDocumentStatus": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestDownloadLogResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestId": {"dataType":"double"},
            "requestTypeCode": {"dataType":"string"},
            "downloadedBy": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestDownloadLogRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestId": {"dataType":"double"},
            "requestTypeCode": {"dataType":"string"},
            "downloadedBy": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestDownloadApprovalLogResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestDownloadLogId": {"dataType":"double"},
            "approver": {"dataType":"string"},
            "approveStep": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestDownloadApprovalLogRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestDownloadLogId": {"dataType":"double"},
            "approver": {"dataType":"string"},
            "approveStep": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestDetailResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestHeaderId": {"dataType":"double"},
            "studentName": {"dataType":"string"},
            "studentYear": {"dataType":"double"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
            "academicYear": {"dataType":"double"},
            "semesterCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestDetailRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestHeaderId": {"dataType":"double"},
            "studentName": {"dataType":"string"},
            "studentYear": {"dataType":"double"},
            "facultyCode": {"dataType":"string"},
            "majorCode": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
            "academicYear": {"dataType":"double"},
            "semesterCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestDetailAddressResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestHeaderId": {"dataType":"double"},
            "houseNo": {"dataType":"string"},
            "moo": {"dataType":"string"},
            "building": {"dataType":"string"},
            "floor": {"dataType":"string"},
            "soi": {"dataType":"string"},
            "street": {"dataType":"string"},
            "district": {"dataType":"string"},
            "subDistrict": {"dataType":"string"},
            "province": {"dataType":"string"},
            "country": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestDetailAddressRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestHeaderId": {"dataType":"double"},
            "houseNo": {"dataType":"string"},
            "moo": {"dataType":"string"},
            "building": {"dataType":"string"},
            "floor": {"dataType":"string"},
            "soi": {"dataType":"string"},
            "street": {"dataType":"string"},
            "district": {"dataType":"string"},
            "subDistrict": {"dataType":"string"},
            "province": {"dataType":"string"},
            "country": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestAttachedDocumentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "requestHeaderId": {"dataType":"double"},
            "documentName": {"dataType":"string"},
            "documentUrl": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "fileSize": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveRequestAttachedDocumentRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "requestHeaderId": {"dataType":"double"},
            "documentName": {"dataType":"string"},
            "documentUrl": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "fileSize": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MasterValueHeaderResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "masterValueCode": {"dataType":"string"},
            "masterValueName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveMasterValueHeaderRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "masterValueCode": {"dataType":"string"},
            "masterValueName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MasterValueDetailResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "masterValueDetailCode": {"dataType":"string"},
            "descriptionTh": {"dataType":"string"},
            "descriptionEn": {"dataType":"string"},
            "sequence": {"dataType":"double"},
            "masterValueHeaderId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveMasterValueDetailRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "masterValueDetailCode": {"dataType":"string"},
            "descriptionTh": {"dataType":"string"},
            "descriptionEn": {"dataType":"string"},
            "sequence": {"dataType":"double"},
            "masterValueHeaderId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GeneralRequestRequest": {
        "dataType": "refObject",
        "properties": {
            "studentCode": {"dataType":"string"},
            "topic": {"dataType":"string"},
            "cause": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ActivityLogResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "uuid": {"dataType":"string"},
            "action": {"dataType":"string"},
            "description1": {"dataType":"string"},
            "description2": {"dataType":"string"},
            "programCode": {"dataType":"string"},
            "username": {"dataType":"string"},
            "studentCode": {"dataType":"string"},
            "userAgent": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveActivityLogRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "action": {"dataType":"string","required":true},
            "description1": {"dataType":"string"},
            "description2": {"dataType":"string"},
            "programCode": {"dataType":"string"},
            "username": {"dataType":"string"},
            "studentCode": {"dataType":"string"},
            "userAgent": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserSignatureController_saveUserSignaturePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveUserSignatureRequest"},
        };
        app.post('/api/iram07/save-user-signature-post',
            ...(fetchMiddlewares<RequestHandler>(UserSignatureController)),
            ...(fetchMiddlewares<RequestHandler>(UserSignatureController.prototype.saveUserSignaturePost)),

            async function UserSignatureController_saveUserSignaturePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserSignatureController_saveUserSignaturePost, request, response });

                const controller = new UserSignatureController();

              await templateService.apiHandler({
                methodName: 'saveUserSignaturePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_saveUserPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveUserRequest"},
        };
        app.post('/api/iram07/save-user-post',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.saveUserPost)),

            async function UserController_saveUserPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_saveUserPost, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'saveUserPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_findUserByUsernameGet: Record<string, TsoaRoute.ParameterSchema> = {
                username: {"in":"query","name":"username","required":true,"dataType":"string"},
        };
        app.get('/api/iram07/find-user-by-username-get',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.findUserByUsernameGet)),

            async function UserController_findUserByUsernameGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_findUserByUsernameGet, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'findUserByUsernameGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStudentController_saveStudentPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveStudentRequest"},
        };
        app.post('/api/iram07/save-student-post',
            ...(fetchMiddlewares<RequestHandler>(StudentController)),
            ...(fetchMiddlewares<RequestHandler>(StudentController.prototype.saveStudentPost)),

            async function StudentController_saveStudentPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStudentController_saveStudentPost, request, response });

                const controller = new StudentController();

              await templateService.apiHandler({
                methodName: 'saveStudentPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStudentController_findStudentByCodeGet: Record<string, TsoaRoute.ParameterSchema> = {
                studentCode: {"in":"query","name":"student-code","required":true,"dataType":"string"},
        };
        app.get('/api/iram07/find-student-by-code-get',
            ...(fetchMiddlewares<RequestHandler>(StudentController)),
            ...(fetchMiddlewares<RequestHandler>(StudentController.prototype.findStudentByCodeGet)),

            async function StudentController_findStudentByCodeGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStudentController_findStudentByCodeGet, request, response });

                const controller = new StudentController();

              await templateService.apiHandler({
                methodName: 'findStudentByCodeGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStudentController_saveStudentAddressPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveStudentAddressRequest"},
        };
        app.post('/api/iram07/save-student-address-post',
            ...(fetchMiddlewares<RequestHandler>(StudentController)),
            ...(fetchMiddlewares<RequestHandler>(StudentController.prototype.saveStudentAddressPost)),

            async function StudentController_saveStudentAddressPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStudentController_saveStudentAddressPost, request, response });

                const controller = new StudentController();

              await templateService.apiHandler({
                methodName: 'saveStudentAddressPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStudentController_findStudentAddressesByStudentIdGet: Record<string, TsoaRoute.ParameterSchema> = {
                studentId: {"in":"query","name":"student-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-student-addresses-by-student-id-get',
            ...(fetchMiddlewares<RequestHandler>(StudentController)),
            ...(fetchMiddlewares<RequestHandler>(StudentController.prototype.findStudentAddressesByStudentIdGet)),

            async function StudentController_findStudentAddressesByStudentIdGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStudentController_findStudentAddressesByStudentIdGet, request, response });

                const controller = new StudentController();

              await templateService.apiHandler({
                methodName: 'findStudentAddressesByStudentIdGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStudentController_findStudentAddressByIdGet: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-student-address-by-id-get',
            ...(fetchMiddlewares<RequestHandler>(StudentController)),
            ...(fetchMiddlewares<RequestHandler>(StudentController.prototype.findStudentAddressByIdGet)),

            async function StudentController_findStudentAddressByIdGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStudentController_findStudentAddressByIdGet, request, response });

                const controller = new StudentController();

              await templateService.apiHandler({
                methodName: 'findStudentAddressByIdGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_saveRoleMapApprovalHeaderPost: Record<string, TsoaRoute.ParameterSchema> = {
                header: {"in":"body","name":"header","required":true,"ref":"SaveRoleMapApprovalHeaderRequest"},
        };
        app.post('/api/iram07/save-role-map-approval-header-post',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.saveRoleMapApprovalHeaderPost)),

            async function RoleMapApprovalController_saveRoleMapApprovalHeaderPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_saveRoleMapApprovalHeaderPost, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'saveRoleMapApprovalHeaderPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_saveRoleMapApprovalDetailPost: Record<string, TsoaRoute.ParameterSchema> = {
                detail: {"in":"body","name":"detail","required":true,"ref":"SaveRoleMapApprovalDetailRequest"},
        };
        app.post('/api/iram07/save-role-map-approval-detail-post',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.saveRoleMapApprovalDetailPost)),

            async function RoleMapApprovalController_saveRoleMapApprovalDetailPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_saveRoleMapApprovalDetailPost, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'saveRoleMapApprovalDetailPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_saveRequestTypePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestTypeRequest"},
        };
        app.post('/api/iram07/save-request-type-post',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.saveRequestTypePost)),

            async function RoleMapApprovalController_saveRequestTypePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_saveRequestTypePost, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'saveRequestTypePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_findRoleMapApprovalHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestTypeCode: {"in":"query","name":"request-type-code","required":true,"dataType":"string"},
                campusCode: {"in":"query","name":"campus-code","dataType":"string"},
                facultyCode: {"in":"query","name":"faculty-code","dataType":"string"},
                majorCode: {"in":"query","name":"major-code","dataType":"string"},
                section: {"in":"query","name":"section","dataType":"string"},
        };
        app.get('/api/iram07/find-role-map-approval-header-get',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.findRoleMapApprovalHeaderGet)),

            async function RoleMapApprovalController_findRoleMapApprovalHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_findRoleMapApprovalHeaderGet, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'findRoleMapApprovalHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_findRoleMapApprovalDetailGet: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-role-map-approval-detail-get',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.findRoleMapApprovalDetailGet)),

            async function RoleMapApprovalController_findRoleMapApprovalDetailGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_findRoleMapApprovalDetailGet, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'findRoleMapApprovalDetailGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_findRoleMapApprovalDetailsByHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                headerId: {"in":"query","name":"header-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-role-map-approval-details-by-header-get',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.findRoleMapApprovalDetailsByHeaderGet)),

            async function RoleMapApprovalController_findRoleMapApprovalDetailsByHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_findRoleMapApprovalDetailsByHeaderGet, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'findRoleMapApprovalDetailsByHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleMapApprovalController_findRequestTypeByCodeGet: Record<string, TsoaRoute.ParameterSchema> = {
                code: {"in":"query","name":"code","required":true,"dataType":"string"},
        };
        app.get('/api/iram07/find-request-type-by-code-get',
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController)),
            ...(fetchMiddlewares<RequestHandler>(RoleMapApprovalController.prototype.findRequestTypeByCodeGet)),

            async function RoleMapApprovalController_findRequestTypeByCodeGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleMapApprovalController_findRequestTypeByCodeGet, request, response });

                const controller = new RoleMapApprovalController();

              await templateService.apiHandler({
                methodName: 'findRequestTypeByCodeGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_saveRolePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRoleRequest"},
        };
        app.post('/api/iram07/save-role-post',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.saveRolePost)),

            async function RoleController_saveRolePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_saveRolePost, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'saveRolePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_findRoleByCodeGet: Record<string, TsoaRoute.ParameterSchema> = {
                code: {"in":"query","name":"code","required":true,"dataType":"string"},
        };
        app.get('/api/iram07/find-role-by-code-get',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.findRoleByCodeGet)),

            async function RoleController_findRoleByCodeGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_findRoleByCodeGet, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'findRoleByCodeGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestTypeController_saveRequestTypePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestTypeRequest"},
        };
        app.post('/api/iram04/save-request-type-post',
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController)),
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController.prototype.saveRequestTypePost)),

            async function RequestTypeController_saveRequestTypePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestTypeController_saveRequestTypePost, request, response });

                const controller = new RequestTypeController();

              await templateService.apiHandler({
                methodName: 'saveRequestTypePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestTypeController_findRequestTypeByCodeGet: Record<string, TsoaRoute.ParameterSchema> = {
                code: {"in":"query","name":"code","required":true,"dataType":"string"},
        };
        app.get('/api/iram04/find-request-type-by-code-get',
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController)),
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController.prototype.findRequestTypeByCodeGet)),

            async function RequestTypeController_findRequestTypeByCodeGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestTypeController_findRequestTypeByCodeGet, request, response });

                const controller = new RequestTypeController();

              await templateService.apiHandler({
                methodName: 'findRequestTypeByCodeGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestTypeController_findAllRequestTypesGet: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/iram04/find-all-request-types-get',
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController)),
            ...(fetchMiddlewares<RequestHandler>(RequestTypeController.prototype.findAllRequestTypesGet)),

            async function RequestTypeController_findAllRequestTypesGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestTypeController_findAllRequestTypesGet, request, response });

                const controller = new RequestTypeController();

              await templateService.apiHandler({
                methodName: 'findAllRequestTypesGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestHeaderController_saveRequestHeaderPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestHeaderRequest"},
        };
        app.post('/api/iram07/save-request-header-post',
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderController)),
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderController.prototype.saveRequestHeaderPost)),

            async function RequestHeaderController_saveRequestHeaderPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestHeaderController_saveRequestHeaderPost, request, response });

                const controller = new RequestHeaderController();

              await templateService.apiHandler({
                methodName: 'saveRequestHeaderPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestHeaderController_findRequestHeaderByIdGet: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-header-by-id-get',
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderController)),
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderController.prototype.findRequestHeaderByIdGet)),

            async function RequestHeaderController_findRequestHeaderByIdGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestHeaderController_findRequestHeaderByIdGet, request, response });

                const controller = new RequestHeaderController();

              await templateService.apiHandler({
                methodName: 'findRequestHeaderByIdGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestHeaderActivityLogController_saveRequestHeaderActivityLogPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestHeaderActivityLogRequest"},
        };
        app.post('/api/iram07/save-request-header-activity-log-post',
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderActivityLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestHeaderActivityLogController.prototype.saveRequestHeaderActivityLogPost)),

            async function RequestHeaderActivityLogController_saveRequestHeaderActivityLogPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestHeaderActivityLogController_saveRequestHeaderActivityLogPost, request, response });

                const controller = new RequestHeaderActivityLogController();

              await templateService.apiHandler({
                methodName: 'saveRequestHeaderActivityLogPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadLogController_saveRequestDownloadLogPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestDownloadLogRequest"},
        };
        app.post('/api/iram07/save-request-download-log-post',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController.prototype.saveRequestDownloadLogPost)),

            async function RequestDownloadLogController_saveRequestDownloadLogPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadLogController_saveRequestDownloadLogPost, request, response });

                const controller = new RequestDownloadLogController();

              await templateService.apiHandler({
                methodName: 'saveRequestDownloadLogPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadLogController_findRequestDownloadLogByIdGet: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-download-log-by-id-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController.prototype.findRequestDownloadLogByIdGet)),

            async function RequestDownloadLogController_findRequestDownloadLogByIdGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadLogController_findRequestDownloadLogByIdGet, request, response });

                const controller = new RequestDownloadLogController();

              await templateService.apiHandler({
                methodName: 'findRequestDownloadLogByIdGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadLogController_findRequestDownloadLogsByRequestGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestId: {"in":"query","name":"request-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-download-logs-by-request-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadLogController.prototype.findRequestDownloadLogsByRequestGet)),

            async function RequestDownloadLogController_findRequestDownloadLogsByRequestGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadLogController_findRequestDownloadLogsByRequestGet, request, response });

                const controller = new RequestDownloadLogController();

              await templateService.apiHandler({
                methodName: 'findRequestDownloadLogsByRequestGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadApprovalLogController_saveRequestDownloadApprovalLogPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestDownloadApprovalLogRequest"},
        };
        app.post('/api/iram07/save-request-download-approval-log-post',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController.prototype.saveRequestDownloadApprovalLogPost)),

            async function RequestDownloadApprovalLogController_saveRequestDownloadApprovalLogPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadApprovalLogController_saveRequestDownloadApprovalLogPost, request, response });

                const controller = new RequestDownloadApprovalLogController();

              await templateService.apiHandler({
                methodName: 'saveRequestDownloadApprovalLogPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadApprovalLogController_findRequestDownloadApprovalLogByIdGet: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-download-approval-log-by-id-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController.prototype.findRequestDownloadApprovalLogByIdGet)),

            async function RequestDownloadApprovalLogController_findRequestDownloadApprovalLogByIdGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadApprovalLogController_findRequestDownloadApprovalLogByIdGet, request, response });

                const controller = new RequestDownloadApprovalLogController();

              await templateService.apiHandler({
                methodName: 'findRequestDownloadApprovalLogByIdGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDownloadApprovalLogController_findRequestDownloadApprovalLogsByDownloadLogGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestDownloadLogId: {"in":"query","name":"request-download-log-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-download-approval-logs-by-download-log-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDownloadApprovalLogController.prototype.findRequestDownloadApprovalLogsByDownloadLogGet)),

            async function RequestDownloadApprovalLogController_findRequestDownloadApprovalLogsByDownloadLogGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDownloadApprovalLogController_findRequestDownloadApprovalLogsByDownloadLogGet, request, response });

                const controller = new RequestDownloadApprovalLogController();

              await templateService.apiHandler({
                methodName: 'findRequestDownloadApprovalLogsByDownloadLogGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDetailController_saveRequestDetailPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestDetailRequest"},
        };
        app.post('/api/iram07/save-request-detail-post',
            ...(fetchMiddlewares<RequestHandler>(RequestDetailController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDetailController.prototype.saveRequestDetailPost)),

            async function RequestDetailController_saveRequestDetailPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDetailController_saveRequestDetailPost, request, response });

                const controller = new RequestDetailController();

              await templateService.apiHandler({
                methodName: 'saveRequestDetailPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDetailController_findRequestDetailByHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestHeaderId: {"in":"query","name":"request-header-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-detail-by-header-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDetailController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDetailController.prototype.findRequestDetailByHeaderGet)),

            async function RequestDetailController_findRequestDetailByHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDetailController_findRequestDetailByHeaderGet, request, response });

                const controller = new RequestDetailController();

              await templateService.apiHandler({
                methodName: 'findRequestDetailByHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDetailAddressController_saveRequestDetailAddressPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestDetailAddressRequest"},
        };
        app.post('/api/iram07/save-request-detail-address-post',
            ...(fetchMiddlewares<RequestHandler>(RequestDetailAddressController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDetailAddressController.prototype.saveRequestDetailAddressPost)),

            async function RequestDetailAddressController_saveRequestDetailAddressPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDetailAddressController_saveRequestDetailAddressPost, request, response });

                const controller = new RequestDetailAddressController();

              await templateService.apiHandler({
                methodName: 'saveRequestDetailAddressPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestDetailAddressController_findRequestDetailAddressByHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestHeaderId: {"in":"query","name":"request-header-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-detail-address-by-header-get',
            ...(fetchMiddlewares<RequestHandler>(RequestDetailAddressController)),
            ...(fetchMiddlewares<RequestHandler>(RequestDetailAddressController.prototype.findRequestDetailAddressByHeaderGet)),

            async function RequestDetailAddressController_findRequestDetailAddressByHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestDetailAddressController_findRequestDetailAddressByHeaderGet, request, response });

                const controller = new RequestDetailAddressController();

              await templateService.apiHandler({
                methodName: 'findRequestDetailAddressByHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestAttachedDocumentController_saveRequestAttachedDocumentPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveRequestAttachedDocumentRequest"},
        };
        app.post('/api/iram07/save-request-attached-document-post',
            ...(fetchMiddlewares<RequestHandler>(RequestAttachedDocumentController)),
            ...(fetchMiddlewares<RequestHandler>(RequestAttachedDocumentController.prototype.saveRequestAttachedDocumentPost)),

            async function RequestAttachedDocumentController_saveRequestAttachedDocumentPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestAttachedDocumentController_saveRequestAttachedDocumentPost, request, response });

                const controller = new RequestAttachedDocumentController();

              await templateService.apiHandler({
                methodName: 'saveRequestAttachedDocumentPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRequestAttachedDocumentController_findRequestAttachedDocumentsByHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                requestHeaderId: {"in":"query","name":"request-header-id","required":true,"dataType":"double"},
        };
        app.get('/api/iram07/find-request-attached-documents-by-header-get',
            ...(fetchMiddlewares<RequestHandler>(RequestAttachedDocumentController)),
            ...(fetchMiddlewares<RequestHandler>(RequestAttachedDocumentController.prototype.findRequestAttachedDocumentsByHeaderGet)),

            async function RequestAttachedDocumentController_findRequestAttachedDocumentsByHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRequestAttachedDocumentController_findRequestAttachedDocumentsByHeaderGet, request, response });

                const controller = new RequestAttachedDocumentController();

              await templateService.apiHandler({
                methodName: 'findRequestAttachedDocumentsByHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMasterValueController_saveMasterValueHeaderPost: Record<string, TsoaRoute.ParameterSchema> = {
                header: {"in":"body","name":"header","required":true,"ref":"SaveMasterValueHeaderRequest"},
        };
        app.post('/api/iram06/save-master-value-header-post',
            ...(fetchMiddlewares<RequestHandler>(MasterValueController)),
            ...(fetchMiddlewares<RequestHandler>(MasterValueController.prototype.saveMasterValueHeaderPost)),

            async function MasterValueController_saveMasterValueHeaderPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMasterValueController_saveMasterValueHeaderPost, request, response });

                const controller = new MasterValueController();

              await templateService.apiHandler({
                methodName: 'saveMasterValueHeaderPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMasterValueController_saveMasterValueDetailPost: Record<string, TsoaRoute.ParameterSchema> = {
                detail: {"in":"body","name":"detail","required":true,"ref":"SaveMasterValueDetailRequest"},
        };
        app.post('/api/iram06/save-master-value-detail-post',
            ...(fetchMiddlewares<RequestHandler>(MasterValueController)),
            ...(fetchMiddlewares<RequestHandler>(MasterValueController.prototype.saveMasterValueDetailPost)),

            async function MasterValueController_saveMasterValueDetailPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMasterValueController_saveMasterValueDetailPost, request, response });

                const controller = new MasterValueController();

              await templateService.apiHandler({
                methodName: 'saveMasterValueDetailPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMasterValueController_findMasterValueHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                masterValueHeaderCode: {"in":"query","name":"master-value-header-code","required":true,"dataType":"string"},
        };
        app.get('/api/iram06/find-master-value-header-get',
            ...(fetchMiddlewares<RequestHandler>(MasterValueController)),
            ...(fetchMiddlewares<RequestHandler>(MasterValueController.prototype.findMasterValueHeaderGet)),

            async function MasterValueController_findMasterValueHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMasterValueController_findMasterValueHeaderGet, request, response });

                const controller = new MasterValueController();

              await templateService.apiHandler({
                methodName: 'findMasterValueHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMasterValueController_findMasterValueDetailGet: Record<string, TsoaRoute.ParameterSchema> = {
                masterValueDetailCode: {"in":"query","name":"master-value-detail-code","required":true,"dataType":"string"},
        };
        app.get('/api/iram06/find-master-value-detail-get',
            ...(fetchMiddlewares<RequestHandler>(MasterValueController)),
            ...(fetchMiddlewares<RequestHandler>(MasterValueController.prototype.findMasterValueDetailGet)),

            async function MasterValueController_findMasterValueDetailGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMasterValueController_findMasterValueDetailGet, request, response });

                const controller = new MasterValueController();

              await templateService.apiHandler({
                methodName: 'findMasterValueDetailGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMasterValueController_findMasterValueDetailsByHeaderGet: Record<string, TsoaRoute.ParameterSchema> = {
                headerCode: {"in":"query","name":"header-code","required":true,"dataType":"string"},
        };
        app.get('/api/iram06/find-master-value-details-by-header-get',
            ...(fetchMiddlewares<RequestHandler>(MasterValueController)),
            ...(fetchMiddlewares<RequestHandler>(MasterValueController.prototype.findMasterValueDetailsByHeaderGet)),

            async function MasterValueController_findMasterValueDetailsByHeaderGet(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMasterValueController_findMasterValueDetailsByHeaderGet, request, response });

                const controller = new MasterValueController();

              await templateService.apiHandler({
                methodName: 'findMasterValueDetailsByHeaderGet',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIrst05Controller_createRequestPost: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"GeneralRequestRequest"},
        };
        app.post('/api/irst05/create-request-post',
            ...(fetchMiddlewares<RequestHandler>(Irst05Controller)),
            ...(fetchMiddlewares<RequestHandler>(Irst05Controller.prototype.createRequestPost)),

            async function Irst05Controller_createRequestPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIrst05Controller_createRequestPost, request, response });

                const controller = new Irst05Controller();

              await templateService.apiHandler({
                methodName: 'createRequestPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsActivityLogsController_saveActivityLogPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"SaveActivityLogRequest"},
        };
        app.post('/api/iram07/save-activity-log-post',
            ...(fetchMiddlewares<RequestHandler>(ActivityLogsController)),
            ...(fetchMiddlewares<RequestHandler>(ActivityLogsController.prototype.saveActivityLogPost)),

            async function ActivityLogsController_saveActivityLogPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsActivityLogsController_saveActivityLogPost, request, response });

                const controller = new ActivityLogsController();

              await templateService.apiHandler({
                methodName: 'saveActivityLogPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
