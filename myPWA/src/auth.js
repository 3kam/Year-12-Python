// Path: src/auth.js
// In real app you'd use bcrypt. This is just a placeholder.
export function validatePassword(input, stored) {
    return input === stored; // replace with bcrypt.compare in real project
}
