"use strict";

function fail(errorCb, successCb, context) {
    if (arguments.length === 1) {
        successCb = errorCb;
        errorCb = function (error) {
            console.error(error);
        };
    }

    return function () {
        var args = Array.prototype.slice.call(arguments),
            isError = !!args[0];

        ((isError ? errorCb : successCb) || fail.noop).apply(context || null, isError ? args : args.splice(1));
    };
}

fail.noop = function () {
    return arguments;
};

fail.success = function (successCb) {
    return fail(fail.noop, successCb);
};

module.exports = fail;