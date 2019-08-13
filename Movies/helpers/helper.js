const helper = (function () {
    const handler = function (res) {
        if (res.status >= 400) {
            throw new Error(`Something went wrong ${res.statusText}`);
        }

        if (res.status !== 204) {
            return res.json();
        }

        return res;
    };

    const passwordChecker = function (params) {
        return params.password === params.rePassword;
    };

    const addHeaderInfo = function (context) {
        const loggedIn = sessionStorage.getItem('authtoken');

        if (loggedIn) {
            context.loggedIn = loggedIn;
            context.username = sessionStorage.getItem('username');
        }
    };

    const loadPartials = function (context, externalPartials) {
        let defaultPartials = {
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        };

        if (externalPartials) {
            Object
                .keys(externalPartials)
                .forEach((key) => {
                    const element = externalPartials[key];
                    defaultPartials[key] = element;
                });
        }

        return context.loadPartials(defaultPartials);
    };

    return {
        handler,
        passwordChecker,
        addHeaderInfo,
        loadPartials,
    };
})();