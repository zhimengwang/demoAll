require( ["./app.js", "./app1.js", "./m/app2.js"],
    function(a, b, c) {
        console.log(a, b, c)
    }
);