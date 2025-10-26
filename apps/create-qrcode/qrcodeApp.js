import { QRCodeCanvas } from "@cheprasov/qrcode";

// TODO: Implement the rest of content https://github.com/zxing/zxing/wiki/Barcode-Contents
// For WiFi, https://qifi.org/
export function qrcodeApp() {
    return {
        activeInputTab: "text",
        activeOptionTab: "options",

        qrCodeImageURI: "",

        // Options.
        size: 128,
        sizeOption: "128px",
        showCustomSize: false,

        errorCorrectionOption: "M",
        
        // Input data.
        text: "",
        emailAddress: "",
        emailSubject: "",
        emailMessage: "",

        init() {
            let queryParams = new URLSearchParams(window.location.search);
            if (queryParams.get("input-tab")) {
                this.activeInputTab = queryParams.get("input-tab");
            }
            if (queryParams.get("option-tab")) {
                this.activeOptionTab = queryParams.get("option-tab");
            }
        },

        changeInputTab(newTabName) {
            this.activeInputTab = newTabName;

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("input-tab", this.activeInputTab);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState(null, '', newUrl);
        },

        changeOptionTab(newTabName) {
            this.activeOptionTab = newTabName;

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("option-tab", this.activeOptionTab);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState(null, '', newUrl);
        },

        onSizeOptionChange(e) {
            if (this.sizeOption === "64px") {
                this.size = 64;
                this.showCustomSize = false;
            } else if (this.sizeOption === "128px") {
                this.size = 128;
                this.showCustomSize = false;
            } else if (this.sizeOption === "512px") {
                this.size = 512;
                this.showCustomSize = false;
            } else if (this.sizeOption === "1024px") {
                this.size = 1024;
                this.showCustomSize = false;
            } else if (this.sizeOption === "custom") {
                this.size = 64;
                this.showCustomSize = true;
            }
        },

        async generate() {
            let payload;
            if (this.activeInputTab === "text") {
                payload = this.text;
            } else if (this.activeInputTab === "email") {
                payload = `mailto:${this.emailAddress}`;

                let firstField = true;
                const fields = [{ name: "subject", value: this.emailSubject }, { name: "body", value: this.emailMessage }];
                fields.forEach(element => {
                    if (element["value"] !== "") {
                        if (firstField) {
                            payload += "?";
                            firstField = false;
                        } else {
                            payload += "&";
                        }
                        payload += `${element['name']}=${encodeURIComponent(element['value'])}`
                    }
                });
            } else {
                return;
            }
            console.log(payload);
            const qrCanvas = new QRCodeCanvas(payload, {
                level: this.errorCorrectionOption,
                size: this.size,
            });
            this.qrCodeImageURI = await qrCanvas.toDataUrl();
        },
    };
};