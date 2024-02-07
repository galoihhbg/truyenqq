class Validator {
    isRequired(field) {
        return field.ref.current.value ? undefined : 'Bắt buộc nhập trường này.'
    }

    minLength(field) {
        return field.ref.current.value.length >= field.requires.minLength ? undefined : `Phải nhập ít nhất ${field.requires.minLength} ký tự.`
    }

    isConfirmed(field) {
        return field.ref.current.value === field.requires.confirmRef.current.value ? undefined : 'Thông tin nhập vào chưa chính xác.'
    }

    isEmail(field) {
        // eslint-disable-next-line
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(field.ref.current.value) ? undefined : 'Trường này phải là Email.';
    }
}
// eslint-disable-next-line
export default new Validator()