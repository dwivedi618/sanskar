export const HELPER = {
    isObject(obj) {
        return obj != null && obj.constructor.name === "Object"
    },
    isArray(obj) {
        return obj != null && obj.constructor.name === "Array"
    }
}