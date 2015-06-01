function fail(errorCb, successCb, context) {
    return function () {
        var args = Array.prototype.slice.call(arguments),
            isError = !!args[0];

        ((isError ? errorCb : successCb) || function () {
            return arguments;
        }).apply(context || null, isError ? args : args.splice(1));
    };
}