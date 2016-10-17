/**
 * Created by igor on 10/17/16.
 */

// namespace Interfaces {
//     export interface IValidator {
//         isValid(s: string): boolean;
//     }
// }
// namespace Interfaces {
//     export interface IValidator1 {
//         isValid(s: string): boolean;
//     }
// }
//
// import IValidator = Interfaces.IValidator;
//
// namespace Validation {
//
//
//     export class NameValidator implements IValidator {
//         public isValid(name: string): boolean {
//             return /^([aA-zZ\-]+|[аА-яЯ\-]+)$/.test(name);
//         }
//     }
//
//     export class PhoneValidator implements IValidator {
//         public isValid(phone: string): boolean {
//             return /^093\d{7}$/.test(phone);
//         }
//     }
// }
//
//
// let nameValidator = new Validation.NameValidator();
// let phoneValidator = new Validation.PhoneValidator();
//
// console.log(nameValidator.isValid('Igor-Nepipenko'));
// console.log(phoneValidator.isValid('09345454574'));

//declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
//declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

// class MathLib {
//     @logMethod
//     public areaOfCircle(r: number): number {
//         return Math.PI * r ** 2;
//     }
// }
//
// function logMethod(target: any, key: string, descriptor: any): any {
//     let originDesc = descriptor.value;
//     descriptor.value = (...args: any[]) => {
//         let b = args.map((a: any) => JSON.stringify(a)).join();
//         let result = originDesc(...args);
//         let r = JSON.stringify(result);
//         console.log(`Call: ${key}(${b}) => ${r}`);
//         return result;
//     }
//     return descriptor
// }
//
// let a = new MathLib();
// a.areaOfCircle(3);


// class Account {
//     @logProperty
//     public firstName: string;
//     public lastName: string;
//
//     public constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logProperty(target:any,key:string){
//     let _val = target[key]
//
//     let getter = ():typeof _val =>{
//         console.log(`Get ${key} => ${_val}`);
//     };
//
//     let setter = (newVal:string) =>{
//         console.log(`Set ${key} => ${newVal}`);
//         _val = newVal;
//     };
//
//     Object.defineProperty(target,key,{
//         get:getter,
//         set:setter,
//         enumerable:true,
//         configurable:true
//     })
// }
//
// let me = new Account('Igor','Nepipenko');
// let me_name=me.firstName;
// me.firstName='Evgenya';

// @logClass
// class Account {
//
//     public firstName: string;
//     public lastName: string;
//
//     public constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logClass(target:any):any{
//     return ()=>{
//         console.log(`New instance of ${target.name}`)
//         return target
//     }
// }
//
// let firstPersone = new Account('Vlad','Zotke');
// let secondPersone = new Account('Anton','Pavlov');

class Account {

    public firstName: string;
    public lastName: string;

    public constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @readMetaData
    public sayMessage(@addMetaData msg: string): string {
        return `${this.firstName} ${this.lastName} : ${msg}`
    }
}

function addMetaData(target: any, key: string, index: number): void {
    let metadataKey = `__log_${key}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
        return;
    }
    target[metadataKey] = [index];
}

function readMetaData(target:any,key:string,descriptor:any):any{
    let metadataKey = `__log_${key}_parameters`;
    let indices = target[metadataKey];
    let originalDesc = descriptor.value;
    descriptor.value = (...args:any[]):any=>{
        console.log(`${key} arg[${indices}]: ${args[indices]}`)
        return originalDesc(...args);
    }
    return descriptor;
}

let persone = new Account('Igor', 'Nepipenko');
persone.sayMessage('TypeScript is the best');
persone.sayMessage('Angular 2 => *ngFor');