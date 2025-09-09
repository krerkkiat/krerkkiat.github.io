const textOps = () => ({
    activeTab: "replace",

    text: "",
    pattern: "",
    replacement: "",

    pastEntries: [],
    futureEntries: [],

    predefinedOption: "none",

    init() {
        let queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get("tab")) {
            this.activeTab = queryParams.get("tab");
        }
    },

    changeTab(name) {
        this.activeTab = name;

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("tab", this.activeTab);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    },

    replace() {
        this.pastEntries.push({ text: this.text, pattern: this.pattern, replacement: this.replacement });
        if (this.pattern.startsWith("/")) {
            const regExPattern = new RegExp(this.pattern.replaceAll("/", ""), "g");
            this.text = this.text.replaceAll(regExPattern, this.replacement);
        } else {
            this.text = this.text.replaceAll(this.pattern, this.replacement);
        }
    },

    undo() {
        if (this.pastEntries.length === 0) {
            return;
        }

        // Put the current data as future entry.
        this.futureEntries.push({ text: this.text, pattern: this.pattern, replacement: this.replacement });

        // Obtain the entry from the past.
        var entry = this.pastEntries.pop();

        // Set it to the state.
        this.text = entry.text;
        this.pattern = entry.pattern;
        this.replacement = entry.replacement;
    },

    onPredefinedOptionChange(e) {
        if (this.predefinedOption === "compose-escape") {
            this.pattern = "$";
            // There are four $ because we are using JS's regex for replacing, so we need to escape $ with $$.
            // Two $ then become four.
            this.replacement = "$$$$";
        } else if (this.predefinedOption === "csv-comma-to-latex-tabular-ampersand") {
            this.pattern = ",";
            this.replacement = "&";
        } else if (this.predefinedOption === "latex-tabular-ampersand-to-csv-comma") {
            this.pattern = "&";
            this.replacement = ",";
        }
    },

    toLowerCase(e) {
        this.pastEntries.push({ text: this.text, pattern: this.pattern, replacement: this.replacement });
        this.text = this.text.toLowerCase();
    },

    toUpperCase(e) {
        this.pastEntries.push({ text: this.text, pattern: this.pattern, replacement: this.replacement });
        this.text = this.text.toUpperCase();
    },

    toStartCase(e) {
        this.pastEntries.push({ text: this.text, pattern: this.pattern, replacement: this.replacement });
        const tokens = this.text.split(" ");
        var newTokens = [];
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].length > 0) {
                var firstChar = tokens[i][0].toUpperCase();
                newTokens.push(firstChar + tokens[i].substring(1).toLowerCase());
            } else {
                newTokens.push(tokens[i]);
            }
        }
        this.text = newTokens.join(" ");
    }

});

if (typeof window !== 'undefined') {
    window.textOps = textOps;
    document.addEventListener("alpine:init", () => {
      Alpine.data("textOps", textOps);
    });
} else if (typeof module === 'object' && module.exports) {
    module.exports = textOps;
}
