import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class DocumentValidator implements Validator {

    static cpfLength = 11;
    static cnpjLength = 14;

    /**
     * Calcula o dígito verificador do CPF ou CNPJ.
     */
    static buildDigit(arr: number[]): number {

        const isCpf = arr.length < DocumentValidator.cpfLength;
        const digit = arr
                .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
                .reduce((total, current) => total + current) % DocumentValidator.cpfLength;

        if ((digit < 2 && isCpf) || digit < 2) {
          return 0;
        }

        return DocumentValidator.cpfLength - digit;
    }

    /**
     * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
     */
    static validate(c: AbstractControl): ValidationErrors | null {

        const cpfCnpj = c.value.replace(/\D/g, '');

        // Verifica o tamanho da string.
        if ([DocumentValidator.cpfLength, DocumentValidator.cnpjLength].indexOf(cpfCnpj.length) < 0) {
            return { length: true };
        }

        // Verifica se todos os dígitos são iguais.
        if (/^([0-9])\1*$/.test(cpfCnpj)) {
            return { equalDigits: true };
        }

        // A seguir é realizado o cálculo verificador.
        const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

        cpfCnpjArr.unshift(DocumentValidator.buildDigit(cpfCnpjArr));
        cpfCnpjArr.unshift(DocumentValidator.buildDigit(cpfCnpjArr));

        if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
            // Dígito verificador não é válido, resultando em falha.
            return { digit: true };
        }

        return null;
    }

    /**
     * Implementa a interface de um validator.
     */
    validate(c: AbstractControl): ValidationErrors | null {
        return DocumentValidator.validate(c);
    }
}
