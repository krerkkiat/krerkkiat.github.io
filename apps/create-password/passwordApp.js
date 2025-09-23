import bcrypt from "bcryptjs";

export function passwordApp() {
    return {
        activeTab: "generate",

        data: "",
        style: "ios",

        length: 24,
        showComplexStyleConfig: false,

        groups: 3,
        perGroups: 6,
        showIosStyleConfig: false,

        // -- hash
        plaintextPassword: "",
        hashedPassword: "",

        init() {
            let queryParams = new URLSearchParams(window.location.search);
            if (queryParams.get("style")) {
                this.style = queryParams.get("style");
            }
            if (queryParams.get("tab")) {
                this.activeTab = queryParams.get("tab");
            }

            if (this.style === "ios") {
                this.showIosStyleConfig = true;
                this.showComplexStyleConfig = false;
            } else if (this.style === "complex") {
                this.showIosStyleConfig = false;
                this.showComplexStyleConfig = true;
            }

            this.generate();
        },

        changeTab(name) {
            this.activeTab = name;

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("tab", this.activeTab);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState(null, '', newUrl);
        },

        getRandomInt(max) {
            // [0, max)
            return Math.floor(Math.random() * max);
        },

        getRandomDigits(n) {
            const digits = "0123456789";
            let result = "";
            for (let i = 0; i < n; i++) {
                result = result + digits[this.getRandomInt(digits.length)];
            }
            return result;
        },

        getRandomAlphanumericCharacters(n) {
            const alphanumericCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let result = "";
            for (let i = 0; i < n; i++) {
                result = result + alphanumericCharacters[this.getRandomInt(alphanumericCharacters.length)];
            }
            return result;
        },

        getRandomCharacters(n) {
            const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
            let result = "";
            for (let i = 0; i < n; i++) {
                result = result + characters[this.getRandomInt(characters.length)];
            }
            return result;
        },

        generateIosStylePassword(groups, perGroups, separator) {
            let result = [];
            for (let i = 0; i < groups; i++) {
                result.push(this.getRandomAlphanumericCharacters(perGroups));
            }
            return result.join(separator);
        },

        generateSimpleStylePassword(digits, dashes) {
            var dashPositions = [];
            for (let i = 0; i < dashes; i++) {
                var number = 1 + this.getRandomInt(digits + dashes - 2);
                var tries = 0;
                while (dashPositions.includes(number) || dashPositions.includes(number - 1) || dashPositions.includes(number + 1)) {
                    if (tries >= 100) {
                        // Give up if we loop for too long.
                        // E.g. the function is called with (digits=6, dashes=6).
                        break;
                    }
                    number = 1 + this.getRandomInt(digits + dashes - 2);
                    tries = tries + 1;
                }
                dashPositions.push(number);
            }

            let result = "";
            for (let i = 0; i < (digits + dashes); i++) {
                if (dashPositions.includes(i)) {
                    result = result + "-";
                } else {
                    result = result + this.getRandomInt(10);
                }
            }
            return result;
        },

        generate() {
            if (this.style === "ios") {
                this.data = this.generateIosStylePassword(this.groups, this.perGroups, "-");
            } else if (this.style === "simple") {
                this.data = this.generateSimpleStylePassword(6, 2);
            } else if (this.style === "complex") {
                this.data = this.getRandomCharacters(this.length);
            }
        },

        onStyleChange(e) {
            if (this.style === "complex") {
                this.showIosStyleConfig = false;
                this.showComplexStyleConfig = true;
            } else if (this.style === "ios") {
                this.showIosStyleConfig = true;
                this.showComplexStyleConfig = false;
            } else {
                this.showIosStyleConfig = false;
                this.showComplexStyleConfig = false;
            }
        },

        copyToClipboard(type) {
            var payload = "";
            if (type === "generated-password") {
                payload = this.data;
            } else if (type === "hashed-password") {
                payload = this.hashedPassword;
            }
            navigator.clipboard.writeText(payload).then(function () {

            }, function (err) {
                console.error('Could not copy text: ', err);
            })
        },

        hash() {
            if (this.plaintextPassword === "") {
                this.hashedPassword = "";
                return;
            }
            let salt = bcrypt.genSaltSync(10);
            this.hashedPassword = bcrypt.hashSync(this.plaintextPassword, salt);
        }
    };
};
