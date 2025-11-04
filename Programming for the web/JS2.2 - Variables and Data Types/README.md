# JS Lesson 2.2 – Variables and Data Types

## Discussion: Short-term (Volatile) vs Long-term (Permanent) Memory

### Short-term (Volatile) Memory
Short-term or **volatile memory** refers to memory that deletes itself when the computer is switched off.  
- The most common type is **RAM (Random Access Memory)**.

### Long-term (Permanent) Memory
Long-term or **permanent memory** refers to memory that stores itself on some external device when the computer is switched off.  
- The most common types are **hard disks**, **SSDs**, or **USB drives**.

---

## Memory Types

- **Variables**: Temporary storage, like a letterbox in RAM.  
- **Constants**: Set once and never change again.  
- **Standard Variables**: Can be set and changed as many times as you like.  
- **Arrays**: Like a database table in memory.

---

## Variables Example

| Index | Value     |
|--------|------------|
| 1      | Person 1   |
| 2      | Person 2   |
| 3      | Person 3   |

**Example in JavaScript:**
```js
let ExampleArray = ["Person 1", "Person 2", "Person 3"];

console.log(ExampleArray[1]); // “Person 1”
console.log(ExampleArray[2]); // “Person 2”
console.log(ExampleArray[3]); // “Person 3”
