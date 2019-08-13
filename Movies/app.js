window.onload = () => {
    Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        // home
        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        //user 
        this.get('#/register', userController.getRegister);
        this.get('#/login', userController.getLogin);
        this.get('#/logout', userController.logout);
        this.post('#/register', userController.postRegister);
        this.post('#/login', userController.postLogin);

        // movies
        this.get('#/movies/create', movieController.createGet);
        this.post('#/movies/create', movieController.createPost);
        this.get('#/movies/user', movieController.loadMyMovies);
        this.get('#/cinema', movieController.loadCinema);
        this.get('#/movies/edit/:id', movieController.getEdit);
        this.post('#/movies/edit/:id', movieController.postEdit);
        this.get('#/movies/delete/:id', movieController.getDelete);
        this.post('#/movies/delete/:id', movieController.postDelete);
        this.get('#/movies/details/:id', movieController.getDetails);
        this.get('#/movies/buy/:id', movieController.buyTicket);

    }).run('#/home');
};