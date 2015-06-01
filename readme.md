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