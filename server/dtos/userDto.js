module.exports = class UserDto {
    email;
    id;
    role;
    fio;
    tel;
    photo;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.fio = model.fio;
        this.tel = model.tel;
        this.photo = model.photo;
    }
}