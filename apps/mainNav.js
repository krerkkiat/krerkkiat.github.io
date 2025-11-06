export function mainNav() {
    return {
        open: false,
        toggle() {
          this.open = !this.open
        }
    };
};