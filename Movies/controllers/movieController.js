const movieController = (function () {
    const createGet = function (context) {
        helper.addHeaderInfo(context);
        helper
            .loadPartials(context)
            .then(function () {
                this.partial('../views/movies/create.hbs');
            });
    };

    const createPost = function (context) {
        const payload = {
            title: context.params.title,
            imageUrl: context.params.imageUrl,
            description: context.params.description,
            genres: context.params.genres,
            tickets: +context.params.tickets,
        };

        requester
            .post('movies', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            })
            .catch(err => console.warn(err));
    };

    const loadMyMovies = async function (context) {
        helper.addHeaderInfo(context);
        const userId = sessionStorage.getItem('userId');
        const endpoint = `movies?query={"_acl.creator":"${userId}"}`;

        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myMovies) => {
                context.movies = myMovies;
                helper
                    .loadPartials(context, {
                        myMovie: '../views/movies/myMovie.hbs',
                    })
                    .then(function () {
                        this.partial('../views/movies/myMovies.hbs');
                    });
            })
            .catch(err => console.warn(err));

    };

    const loadCinema = function (context) {
        helper.addHeaderInfo(context);
        const sortCriteria = JSON.stringify({
            tickets: -1
        });

        const endpoint = `movies?query={}&sort=${sortCriteria}`;

        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {
                console.log(movies);
                context.movies = movies;
                helper
                    .loadPartials(context, {
                        singleMovie: '../views/movies/singleMovie.hbs',
                    })
                    .then(function () {
                        this.partial('../views/movies/cinema.hbs');
                    });
            })
            .catch(err => console.warn(err));
    };

    const getEdit = function (context) {
        helper.addHeaderInfo(context);
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;

        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movie) => {
                context.movie = movie;

                helper
                    .loadPartials(context)
                    .then(function () {
                        this.partial('../views/movies/edit.hbs');
                    });
            })
            .catch(err => console.log(err));
    };

    const postEdit = function (context) {
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;
        const payload = {
            title: context.params.title,
            imageUrl: context.params.imageUrl,
            description: context.params.description,
            genres: context.params.genres,
            tickets: +context.params.tickets,
        };

        requester
            .put(endpoint, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movies/user');
            })
            .catch(err => console.warn(err));
    };

    const getDelete = function (context) {
        helper.addHeaderInfo(context);
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;
        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movie) => {
                context.movie = movie;
                helper
                    .loadPartials(context)
                    .then(function () {
                        this.partial('../views/movies/delete.hbs');
                    });
            });
    };

    const postDelete = function (context) {
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;

        requester
            .del(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            })
            .catch(err => console.warn(err));
    };

    const getDetails = function (context) {
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;

        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movie) => {
                helper.addHeaderInfo(context);
                context.movie = movie;

                helper
                    .loadPartials(context)
                    .then(function () {
                        this.partial('../views/movies/details.hbs');
                    });
            })
            .catch(err => console.warn(err));
    };

    const buyTicket = function (context) {
        const movieId = context.params.id;
        const endpoint = `movies/${movieId}`;

        requester
            .get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movie) => {
                if (movie.tickets > 0) {
                    movie.tickets -= 1;
                }

                requester
                    .put(endpoint, 'appdata', 'Kinvey', movie)
                    .then(helper.handler)
                    .then(() => {
                        context.redirect('#/cinema');
                    })
                    .catch(err => console.warn(err));

                if (movie.tickets === 0) {
                    requester
                        .del(endpoint, 'appdata', 'Kinvey')
                        .then(helper.handler)
                        .then(() => {
                            context.redirect('#/cinema');
                        })
                        .catch(err => console.warn(err));
                }
            })
            .catch(err => console.warn(err));
    };

    return {
        createGet,
        createPost,
        loadMyMovies,
        loadCinema,
        getEdit,
        postEdit,
        getDelete,
        postDelete,
        getDetails,
        buyTicket,
    };
})();