export const userSchema = {
    $id: "/user",
    type: "object",
    properties: {
        name: {
            description: "User unique name",
            type: "string"
        },
        password: {
            description: "User secret",
            type: "string"
        },
    },
    additionalProperties: false,
    required: ["name", "password"]
}