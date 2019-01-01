function endpoint(path) {
    if (process.env.NODE_ENV !== "production") {
        return `http://127.0.0.1:8080${path}`
    } else {
        return path
    }

}

export default endpoint;