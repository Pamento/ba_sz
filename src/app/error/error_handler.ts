import { ErrorHandler } from '@angular/core';
export class AppErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        console.log('handleError:' + err)
    }
}