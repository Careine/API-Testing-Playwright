import { faker } from '@faker-js/faker';
function generateFormData() {
    return {
        lastname: faker.person.lastName(),
        job: faker.person.jobTitle(),
        email : faker.internet.email(),
        password : faker.internet.password()
    }
}

export default generateFormData;
