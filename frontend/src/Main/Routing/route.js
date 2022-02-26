

const route = () => {
    return (
        <Switch>
            <Route path="/login" component={AttemptAuth} />
            <ProtectedRoute path="/Dashboard" exact component={Dashboard} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/contact/:id" component={Contact} />
            <Route path="/InputPasienBaru" component={InputPasienBaru} />
            <Route path="/Menu" component={_MainMenu} />
            <ProtectedRoute path="/DataUser" component={DataUser} />
            <Route path="*" component={() => c404()} />
        </Switch>
    )
}