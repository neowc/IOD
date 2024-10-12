const getAllKeysFromObj = Object.keys(phone);

console.log(getAllKeysFromObj);
for (let i = 0; i < getAllKeysFromObj.length; i++) {
    const key = getAllKeysFromObj[i];
    console.log(key, phone[key]);
}

const obj = {
    age: 31,
    name: "Aaron",
    address: {
        road: "11th street",
        zip: "12345",
    },
};

const jsonString = JSON.stringify(obj, null, 2);
const deepCopyObj = JSON.parse(jsonString);

deepCopyObj.address.road = "23rd jump street";

console.log(obj, deepCopyObj);