export class ResponseObject {
    ResponseCode: ResponseCode;
    data: any;
    message: string;
}

export enum ResponseCode {
    Success = 1,
    Failed = -2,
    ApplicationError = -3,
    DataBaseError = -4,
    NotFound = -5,
    NotAllowed = -6,
    InUse = -7,
    AlreadyExists = -8,
    AlreadyCancelled = -9,
    EmailAlreadyExists = -10,
    PANAlreadyExists = -11,
    UserNameAlreadyExists = -12,
    InvalidUserNameOrPassword = -13,
}