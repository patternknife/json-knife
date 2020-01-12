import Service from './service';
import ValidationError from './error-handler';

/**
 * @brief
 * Mass Update certain key-values recursively in huge, complex JSON string trees
 * @author Andrew Kang
 * @param original string required (must be JSON string)
 * @param key string required
 * @param value string or boolean or number required
 * @return string
 */
function sculptJson(original, key, value){

    if (!(original && typeof original === 'string')) {
        throw new ValidationError('the variable "original" must be a string type and not be null.');
    }else if (!(key && typeof key === 'string')) {
        throw new ValidationError('the variable "key" must be a string type and not be null.');
    }else if (/"/.test(key)) {
        throw new ValidationError('the variable "key" must not contain double quotes, but this can be allowed in the next version.');
    }else if (! ((value && (typeof value === 'string' || typeof value === 'number'|| typeof value === 'boolean'))  || (typeof value == 'object' && value == null))) {
        throw new ValidationError('the variable "value" must be a string or number or boolean or null.');
    }

    if(value && typeof value === 'string') {
        value = value.replace(/([^\u005C])"/g, '$1\\"');
    }
    original = original.trim();

    return Service.sculpt(original, Service.getMaterials(original, key, value));
}

export default {

    sculptJson

};