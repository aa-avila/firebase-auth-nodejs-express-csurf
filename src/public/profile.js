window.addEventListener("DOMContentLoaded", () => {
    console.log('hola en profile');
    /** El sgte código no funcionó del todo pero puede servir su estructura para futura revisión y uso*/
    // const fetchPostCSRF = async (route, formData) => {
    //     const response = await fetch(route, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             "CSRF-Token": Cookies.get("CSRF-TOKEN")
    //         },
    //         body: JSON.stringify({
    //             formData
    //         })
    //     });
    //     return response;
    // }
    // const editProfileForm = document.querySelector("#editProfile-form");

    // editProfileForm.addEventListener("submit", async e => {
    //     e.preventDefault();

    //     const name = document.querySelector("#editProfile-name").value;
    //     const lastname = document.querySelector("#editProfile-lastname").value;

    //     const formData = {
    //         name: name,
    //         lastname: lastname
    //     }

    //     const response = await fetchPostCSRF("/profileEdit", formData);

    //     console.log(response);
    // });
});

