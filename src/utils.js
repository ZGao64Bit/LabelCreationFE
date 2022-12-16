const domain = "https://labelcreation.ue.r.appspot.com" //"http://localhost:8080"; 

export const login = (credential) => {
    const loginUrl = `${domain}/authenticate/`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in");
        }

        return response.json();
    });
};

export const register = (credential) => {
    const registerUrl = `${domain}/register/`;
    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to register");
        }
    });
};


export const getLabelByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const listStaysUrl = `${domain}/labels/`;

    return fetch(listStaysUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get stay list");
        }

        return response.json();
    });
};


export const deleteLabel = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteStayUrl = `${domain}/labels/${stayId}`;

    return fetch(deleteStayUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to delete label");
        }
    });
};


export const uploadLabel = (data) => {
    const authToken = localStorage.getItem("authToken");
    const uploadStayUrl = `${domain}/labels`;
    return fetch(uploadStayUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: data,
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to add label");
        }
    });
};
