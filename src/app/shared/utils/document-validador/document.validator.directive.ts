
import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';
import { DocumentValidator } from './document.validator';


@Directive({
    selector: '[appCpfCnpjValidate][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: DocumentValidatorDirective,
        multi: true
    }]
})
export class DocumentValidatorDirective extends DocumentValidator implements Validator {}
