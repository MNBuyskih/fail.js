Usage

```js
fs.readDir('/tmp', fail(function (error) {
    console.log(error);
}, function (files) {
    console.log(files);
}));
```

Predefined error handling

```js
function myFail(done) {
    return fail(function (error) {
        throw error;
    }, done);
}
fs.readDir('/tmp', myFail(function (files) {
    console.log(files);
}));
```

Use with express.js

```js
app = require('express').app();
app.use(fail.express(
    400, // optional status code (defaul 400). Used only in default behavior (view bellow)
    function (response) {  // optional error handler
        return function (error) {
            console.error(error);
            response.status(400).end(error.toString()); // default behavior
        };
    }
));
```

then in controllers

```js
app.get('/my/controller', function(request, response) {
    MyModel.find({}, fail(function(modelItems){
        response.end(JSON.stringify(modelItems));
    }));
});
```

But, if MyModel.find() returns an `error`, in client will be sended 400-code end `error.toString()` as message.