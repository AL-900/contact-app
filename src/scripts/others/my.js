export function debounce(func, delay) {
    let timeout;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => func(), delay);
    };
}
export function test() {
    console.log('this is test !');
}
