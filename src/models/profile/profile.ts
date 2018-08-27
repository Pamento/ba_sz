export class Profile {
    name: string;
    font: string[];

    constructor(data?) {
        if (data) {
            this.update(data)
        }
    }

    update(data) {
        for (let key in data) {
            console.log('updating profile', key, data)
            switch (key) {
                default:
                    this[key] = data[key]
            }
        }
    }


}